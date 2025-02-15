import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { BagTypeService } from './bag-type.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminOrSellerGuard } from 'src/auth/sellerOrAdmin.guard';
import { ConnectBagTypeDto, CrateBagTypeDto, UpdateBagTypeDto } from './bag-type.dto';

@Controller('bag-type')
export class BagTypeController {
    constructor(
        private readonly bagTypeService: BagTypeService
    ) { }

    @Get()
    async getAllBagTypes() {
        return this.bagTypeService.getAllBagTypes();
    }

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    public async createBagType(@Body() name: CrateBagTypeDto) {
        return this.bagTypeService.createBagType(name);
    }

    @Patch('update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    public async updateBagType(@Body() data: UpdateBagTypeDto) {
        return this.bagTypeService.updateBagType(data);
     }

     @Patch('connect')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    public async connectType(@Body() data: ConnectBagTypeDto) {
        return this.bagTypeService.connectType(data);
    }
}
