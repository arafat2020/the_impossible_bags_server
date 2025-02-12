import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { $Enums } from '@prisma/client';

@Injectable()
export class AdminGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== $Enums.UserRole.ADMIN) {
      throw new ForbiddenException('Access Denied. Only sellers can perform this action.');
    }

    return true;
  }
}
