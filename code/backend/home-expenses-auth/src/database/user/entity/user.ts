/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
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

  @Column()
  verificationCode: string;
}
