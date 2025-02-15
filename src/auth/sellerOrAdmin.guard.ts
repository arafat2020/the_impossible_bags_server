import { AuthGuard } from './auth.guard';
import { $Enums } from '@prisma/client';
import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminOrSellerGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== $Enums.UserRole.SELLER && user.role !== $Enums.UserRole.ADMIN) {
      throw new ForbiddenException('Access Denied. Only sellers or admin can perform this action.');
    }

    return true;
  }
}
