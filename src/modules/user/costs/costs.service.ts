import { Injectable } from '@nestjs/common';
import { CreateCostReq } from './interface/costs.interface';
import { BaseResponse, SuccessRes } from '@app/shared/interfaces/interfaces';
import { ServiceExceptions } from '@app/shared/exceptions/service.expection';
import { CostsEntity } from '@app/database/entities/costs.entity';

@Injectable()
export class CostsService {
  getAll() {
    return { message: 'Get All Cost' };
  }

  getOne() {
    return { message: 'Get One Cost' };
  }

  async create(data: CreateCostReq): Promise<BaseResponse<SuccessRes>> {
    
    try {

      const cost = CostsEntity.create({
        user: { id: data.userId },
        amount: data.amount,
        desc: data.desc,
        paymentType: { id: data.paymentType }
      })

      await cost.save()
      
      return { data: { success: true } }

    } catch (e) {
      return ServiceExceptions.handle(e, CostsService.name, "create");
    }

  }

  update() {
    return { message: 'Update Cost' };
  }

  delete() {
    return { message: 'Delete Cost' };
  }
}
