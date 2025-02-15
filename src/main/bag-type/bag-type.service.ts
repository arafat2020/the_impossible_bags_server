import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ConnectBagTypeDto, CrateBagTypeDto, UpdateBagTypeDto } from './bag-type.dto';
import { IdDto } from 'src/common/id.dto';

@Injectable()
export class BagTypeService {
    constructor(private readonly db: DbService) { }

    public async createBagType({
        name
    }: CrateBagTypeDto) {
        const data = await this.db.type.create({ data: { name } });
        return {
            data,
            success: true,
            message: 'Type created successfully'
        }
    }

    public async getAllBagTypes() {
        const data = await this.db.type.findMany();
        return {
            data,
            success: true,
            message: 'All types fetched successfully'
        }
    }

    public async updateBagType({
        id,
        name
    }: UpdateBagTypeDto) {
        const updated = await this.db.type.update({
            where: { id },
            data: { name }
        });

        return {
            updated,
            success: true,
            message: 'Type updated successfully'
        }
    }

    public async deleteBagType({
        id
    }: IdDto) {
        const deleted = await this.db.type.delete({ where: { id } });

        return {
            deleted,
            success: true,
            message: 'Type deleted successfully'
        }
    }

    public async connectType({
        bagId,
        productId
    }: ConnectBagTypeDto) {
        const data = await this.db.type.update({
            where: { id: bagId },
            data: {
                products: {
                    connect: { id: productId }
                }
            }
        });

        return {
            data,
            success: true,
            message: 'Type connected successfully'
        }
    }
}
