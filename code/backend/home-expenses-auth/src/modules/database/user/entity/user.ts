/*
 * Author: Vladimir Vysokomornyi
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsEmail({}, { message: 'Unknown email format' })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  preview: boolean;

  @Column({ nullable: true })
  verificationCodeHash: string;

  @Column({ nullable: true })
  refreshTokenHash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  pendingRecover: boolean;
}
