import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ConnectDesignerDto, CreateDesigner, UpdateDesignerTypeDto } from './designer.dto';
import { IdDto } from 'src/common/id.dto';

@Injectable()
export class DesignerService {
    constructor(private db: DbService) { }

    public async getDesigners() {
        return await this.db.designer.findMany();
    }
    public async createDesigner(data: CreateDesigner) {
        return await this.db.designer.create({ data })
    }

    public async deleteDesigner(id:IdDto) {
        return await this.db.designer.delete({ where: id });
    }

    public async updateDesigner({
        id,
        name
    }:UpdateDesignerTypeDto) {
        return await this.db.designer.update({
            where: { id },
            data: { name },
        });
    }

    public async connectWithDesigner({
        designerId,
        productId
    }:ConnectDesignerDto){
        return await this.db.product.update({
            where: { id: productId },
            data: {
                Designer: {
                    connect: { id: designerId }
                }
            }
        });
    }
}
