import { DATA_SOURCE, EXPENSE_REPOSITORY } from '../database.constants';
import { DataSource } from 'typeorm';

import { ExpenseV2 } from './entity/expense';

export const expenseProviders = [
  {
    provide: EXPENSE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExpenseV2),
    inject: [DATA_SOURCE]
  }
];
