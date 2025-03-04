import { Column, Entity } from "typeorm";
import { GeneralEntity } from "../base.entity";

@Entity('payments')
export class PaymentsEntity extends GeneralEntity {

    @Column('numeric', { name: 'amount' })
        amount: number;

    @Column('varchar', { name: 'desc', length: 500 })
        desc: string;

    @Column('int', { name: 'user_id' })
        user_id: number;

    @Column('int', { name: 'payments_type_id ' })
        payments_type_id: number;

    @Column('int', { name: 'currency_type_id' })
        currency_type_id: number;
}