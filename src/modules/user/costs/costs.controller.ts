import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CostsService } from './costs.service';

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
  create() {
    return this.costsService.create();
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
