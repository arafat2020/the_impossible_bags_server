import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminOrSellerGuard } from 'src/auth/sellerOrAdmin.guard';
import { ConnectDesignerDto, CreateDesigner, UpdateDesignerTypeDto } from './designer.dto';
import { IdDto } from 'src/common/id.dto';

@Controller('designer')
export class DesignerController {
    constructor(private readonly designerService: DesignerService){}

    @Get()
    async getDesigners() {
        return await this.designerService.getDesigners();
    }

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    async createDesigner(@Body() data: CreateDesigner) {
        return await this.designerService.createDesigner(data);
    }

    @Delete('delete')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    async deleteDesigner(@Body() id: IdDto) {
        return await this.designerService.deleteDesigner(id);
    }

    @Put('update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    async updateDesigner(@Body() data: UpdateDesignerTypeDto) {
        return await this.designerService.updateDesigner(data);
    }

    @Patch()
    @ApiBearerAuth()
    @UseGuards(AuthGuard, AdminOrSellerGuard)
    async connectWithDesigner(@Body() data: ConnectDesignerDto) {
        return await this.designerService.connectWithDesigner(data);
    }

}
