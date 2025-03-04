import { Column, Entity } from "typeorm";
import { GeneralEntity } from "./base.entity";

@Entity({ name: 'api_keys' })
export class ApiKeysEntity extends GeneralEntity {

    @Column('varchar', { name: 'key' })
        key: string;

    @Column('varchar', { name: 'key_type' })
        key_type: string;

}