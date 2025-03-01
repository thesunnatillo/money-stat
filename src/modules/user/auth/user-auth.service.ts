import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {
  signup() {
    return { message: 'Salom User ' };
  }
}
