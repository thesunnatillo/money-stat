import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { GeneralEntity } from "../base.entity";
import { UsersEntity } from "../users.entity";
import { PaymentsTypeEntity } from "./payments-type.entity";

@Entity('payments')
export class PaymentsEntity extends GeneralEntity {

    @Column('numeric', { name: 'amount' })
        amount: number;

    @Column('varchar', { name: 'desc', length: 500 })
        desc: string;

    @Column('varchar', { name: 'currency_name', default: 'UZS' })
        currencyName: string;

    @OneToOne(() => UsersEntity, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
        userId: UsersEntity;

    @OneToOne(() => PaymentsTypeEntity, (payments_types) => payments_types.id)
    @JoinColumn({
        name: 'payment_id',
        referencedColumnName: 'id'
    })
        paymentId: PaymentsTypeEntity;
}