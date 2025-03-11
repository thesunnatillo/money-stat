import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { GeneralEntity } from "../base.entity";
import { PaymentsEntity } from "./payments.entity";

@Entity({ name: 'payments_types'})
export class PaymentsTypeEntity extends GeneralEntity {

    @Column('varchar', { name: 'name' })
        name: string;

}