/*
 * Author: Vladimir Vysokomornyi
 */

import { Inject, Injectable } from '@nestjs/common';
import { EXPENSE_REPOSITORY } from '../../database.constants';
import { Repository } from 'typeorm';
import { ExpenseV2 } from '../entity/expense';
import { CreateExpenseDto } from '../../../../controllers/expense/dto/create.expense.dto';

@Injectable()
export class ExpenseDbService {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private expenseRepository: Repository<ExpenseV2>
  ) {}

  async findAll(): Promise<ExpenseV2[]> {
    return this.expenseRepository.find();
  }

  async findById(id: number): Promise<ExpenseV2> {
    return this.expenseRepository.findOneBy({ id: id });
  }

  async create(dto: CreateExpenseDto): Promise<ExpenseV2> {
    const expenseV2 = new ExpenseV2();
    expenseV2.category = dto.category;
    expenseV2.cost = dto.cost;
    expenseV2.date = dto.date;
    expenseV2.comment = dto.comment;

    const newExpenseV2 = this.expenseRepository.create(expenseV2);
    return this.expenseRepository.save(newExpenseV2);
  }

  async delete(expenseId: number): Promise<any> {
    return this.expenseRepository.delete({ id: expenseId });
  }
}
