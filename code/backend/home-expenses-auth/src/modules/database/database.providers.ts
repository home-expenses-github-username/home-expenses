/*
 * Author: Vladimir Vysokomornyi
 */

import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './database.constants';
import { User } from './user/entity/user';
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../../config/db';
import { ExpenseV2 } from './expense/entity/expense';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [User, ExpenseV2],
        migrations: [],
        logging: false,
        subscribers: []
      });

      return dataSource.initialize();
    }
  }
];
