import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/decorator/public.decorator';
import { MyError } from '@app/shared/utils/errors';
import { UserAuthService as AuthService } from '@app/modules/user/auth/user-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // check is public route
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    // get token from header
    const token = this.extractTokenFromHeader(req);

    // Validate token
    const { data, errId } = await this.authService.validateToken({ token });

    if (errId) {
      throw new UnauthorizedException(errId);
    }

    // Set token data to payload
    req.payload = data;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.get('authorization');
    const [type, token] = authorization?.split(' ') ?? [];

    if (!(type === 'Bearer' && token)) {
      throw new UnauthorizedException(MyError.INVALID_TOKEN.errId);
    }

    return token;
  }
}
