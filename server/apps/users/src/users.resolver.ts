import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginResponse, RegisterResponse, User } from './user.entity';
import { ActivationDto, LoginDto, RegisterDto } from './dto/users.dto';
import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  register(
    @Args('registerInput', new ValidationPipe()) registerDto: RegisterDto,
  ) {
    return this.usersService.register(registerDto);
  }

  @Mutation(() => User)
  async activate(@Args('activateInput') activationDto: ActivationDto) {
    const user = await this.usersService.activate(activationDto);
    if (!user) {
      throw new BadRequestException('Invalid activation code');
    }
    return user;
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getMe(@Context() context: { req: Request }) {
    return await this.usersService.getMe(context.req);
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async logOut(@Context() context: { req: Request }) {
    return await this.usersService.logOut(context.req);
  }
}
