import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GeneralEntity } from '../../shared/utils/base.entity';
import { UsersEntity } from './users.entity';
import { PaymentsTypeEntity } from './payments-type.entity';

@Entity({ name: 'costs', schema: 'money_stat' })
export class CostsEntity extends GeneralEntity {
  @Column('numeric', { name: 'amount' })
  amount: number;

  @Column('varchar', { name: 'desc', length: 500 })
  desc: string;

  @Column('varchar', { name: 'currency_name', default: 'UZS' })
  currencyName: string;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UsersEntity;

  @OneToOne(() => PaymentsTypeEntity, (payments_types) => payments_types.id)
  @JoinColumn({
    name: 'payments_type_id',
    referencedColumnName: 'id',
  })
  paymentType: PaymentsTypeEntity;
}
