import { Column, Entity } from "typeorm";
import { GeneralEntity } from "./base.entity";

@Entity({ name: 'payments_types'})
export class PaymentsTypeEntity extends GeneralEntity {

    @Column('varchar', { name: 'name' })
        name: string;

}