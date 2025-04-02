import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { hashPassword } from '@app/shared/utils/helpers';

import { UsersEntity } from '../entities/users.entity';
import { AppDataSource } from '../data.source';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);

  async run() {
    try {
      AppDataSource.transaction(async (manager) => {
        await this.createSuperAdmin(manager);
      });

      this.logger.log('Seed data complate.');
    } catch (e) {
      this.logger.error(e);
    }
  }

  async createSuperAdmin(manager: EntityManager): Promise<void> {
    try {
      const admin = await manager.findOne(UsersEntity, {
        where: { username: 'superadmin' },
      });

      if (admin) {
        this.logger.verbose('SuperAdmin already exists');
        return;
      }

      await manager.save(UsersEntity, {
        fullName: 'Superbek',
        username: 'superadmin',
        email: 'admin@ms.uz',
        password: hashPassword('123456789'),
        role: 'admin',
        isAdmin: true,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
