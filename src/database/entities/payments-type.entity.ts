import { Column, Entity } from 'typeorm';
import { GeneralEntity } from '../../shared/utils/base.entity';

@Entity({ name: 'payments_types', schema: 'money_stat' })
export class PaymentsTypeEntity extends GeneralEntity {
  @Column('varchar', { name: 'name' })
  name: string;
}

// this table is not necessary, but I added it for practice!
