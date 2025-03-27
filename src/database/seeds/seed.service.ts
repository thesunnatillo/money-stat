import { Injectable, Logger } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { UsersEntity } from "../entities/users.entity";
import { hashPassword } from "@app/shared/utils/helpers";
import { AppDataSource } from "../data.source";

@Injectable()
export class SeedService {

    private logger = new Logger(SeedService.name);

    async run() {
        try {

            AppDataSource.transaction(async (manager) => {
                await this.createSuperAdmin(manager)
            })

            this.logger.log("Seed data complate.")
            
        } catch (e) {

            this.logger.error(e)

        }
    }

    async createSuperAdmin(manager: EntityManager): Promise<void> {

        try {

            const admin = await manager.findOne(UsersEntity, { where: { login: "superadmin" }})

            if (admin) {

                this.logger.verbose("SuperAdmin already exists");
                return;

            }

            await manager.save(UsersEntity, {
                fullName: "Superbek",
                login: "superadmin",
                password: hashPassword("12345"),
                role: "admin",
                isAdmin: true
            })

        } catch (e) {

            this.logger.error(e)

        }

    }
}