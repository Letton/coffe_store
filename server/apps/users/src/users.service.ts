import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/users.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { User } from './user.entity';

interface IUserData {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;
    const IsEmailExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (IsEmailExist) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      email,
      password: hashedPassword,
    };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;

    await this.emailService.sendMail({
      email,
      name: username,
      activationCode,
      subject: 'Activate your account',
      template: './activation-mail',
    });

    return { activationToken: activationToken.token };
  }

  async createActivationToken(user: IUserData) {
    const activationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const token = this.jwtService.sign(
      { user, activationCode },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async activate(activationDto: ActivationDto) {
    const { activationToken, activationCode } = activationDto;

    const tokenData = this.jwtService.verify(activationToken, {
      secret: this.configService.get<string>('ACTIVATION_SECRET'),
    }) as { user: IUserData; activationCode: string };

    if (tokenData.activationCode !== activationCode)
      throw new BadRequestException('Invalid activation code');

    const isUserExists = await this.prisma.user.findUnique({
      where: {
        email: tokenData.user.email,
      },
    });

    if (isUserExists) throw new BadRequestException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        username: tokenData.user.username,
        email: tokenData.user.email,
        password: tokenData.user.password,
      },
    });

    return user;
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  private generateAccessToken(user: User): string {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(user: User): string {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  generateToken(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { user, accessToken, refreshToken };
  }

  async getMe(req: any) {
    const user = req.user;
    const refreshToken = req.refreshToken;
    const accessToken = req.accessToken;

    return { user, refreshToken, accessToken };
  }

  async logOut(req: any) {
    req.accessToken = null;
    req.refreshToken = null;
    req.user = null;
    return { message: 'Logged out' };
  }
}
