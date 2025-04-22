import { Injectable } from '@nestjs/common';
import { CreateCostReq, CreateCostRes } from './interface/costs.interface';
import { BaseResponse } from '@app/shared/interfaces/interfaces';
import { ServiceExceptions } from '@app/shared/exceptions/service.expection';

@Injectable()
export class CostsService {
  getAll() {
    return { message: 'Get All Cost' };
  }

  getOne() {
    return { message: 'Get One Cost' };
  }

  create(data: CreateCostReq): Promise<BaseResponse<CreateCostRes>> {
    
    try {

      return 
      

    } catch (e) {
      // return ServiceExceptions.handle(e, CostsService.name, "create");
    }

  }

  update() {
    return { message: 'Update Cost' };
  }

  delete() {
    return { message: 'Delete Cost' };
  }
}
