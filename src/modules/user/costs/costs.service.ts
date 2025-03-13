import { Injectable } from '@nestjs/common';

@Injectable()
export class CostsService {
  getAll() {
    return { message: 'Get All Cost' };
  }

  getOne() {
    return { message: 'Get One Cost' };
  }

  create() {
    return { message: 'Create Cost' };
  }

  update() {
    return { message: 'Update Cost' };
  }

  delete() {
    return { message: 'Delete Cost' };
  }
}
