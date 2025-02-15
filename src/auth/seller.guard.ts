import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { $Enums } from '@prisma/client';

@Injectable()
export class SellerGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user.role === $Enums.UserRole.SELLER);

    if (user.role === $Enums.UserRole.SELLER) return true;
    throw new ForbiddenException('Access Denied. Only sellers can perform this action.');

  }
}
