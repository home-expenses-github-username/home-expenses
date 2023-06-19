/*
 * Author: Vladimir Vysokomornyi
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseV2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  cost: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'bigint' })
  date: string;
}
