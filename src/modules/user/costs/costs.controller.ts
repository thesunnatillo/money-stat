import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create.dto';
import { CreateCostReq } from './interface/costs.interface';
import { setResult } from '@app/shared/utils/helpers';
import { Response } from 'express';

@Controller()
@ApiTags('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @Get()
  getAll() {
    return this.costsService.getAll();
  }

  @Get(':id')
  getOne() {
    return this.costsService.getOne();
  }

  @Post()
  async create(@Body() body: CreateCostDto, @Res() res: Response) {

    const reqData: CreateCostReq = {
      amount: body.amount,
      desc: body.desc,
      paymentType: body.paymentType
    }

    const { data, errId } = await this.costsService.create(reqData);
    const response = setResult(errId, data);

    if (errId) {

      return res.status(HttpStatus.BAD_REQUEST).jsonp(response);

    }

    return res.status(HttpStatus.OK).jsonp(response);

  }

  @Put(':id')
  update() {
    return this.costsService.update();
  }

  @Delete(':id')
  delete() {
    return this.costsService.delete();
  }
}
