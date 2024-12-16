import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Not authorized');
    }

    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      req.user = decoded;
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return this.refreshAccessToken(req, refreshToken);
      } else {
        throw new UnauthorizedException('Invalid access token');
      }
    }
  }

  private refreshAccessToken(req: any, refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      const newAccessToken = this.jwtService.sign(
        { id: decoded.id, username: decoded.username, role: decoded.role },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      );

      req.headers.accesstoken = newAccessToken;
      req.user = decoded;

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
