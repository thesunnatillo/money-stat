import { UsersEntity } from '@app/database/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {

  // constructor(@InjectRepository(UsersEntity) private readonly userRepo: Repository<UsersEntity>) {}
  async signup() {
    UsersEntity.create({ fullName: "Sunnatillo", login: "conve", password: "12345" })
    return "dbga qara"
  }
}
