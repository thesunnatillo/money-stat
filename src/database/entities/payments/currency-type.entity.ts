import { Column, Entity } from "typeorm";
import { GeneralEntity } from "../base.entity";

@Entity({ name: 'currency_types' })
export class CurrencyEntity extends GeneralEntity {

    @Column('varchar', { name: 'name' })
        name: string;

}