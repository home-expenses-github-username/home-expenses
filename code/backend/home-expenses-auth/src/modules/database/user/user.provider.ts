/*
 * Author: Vladimir Vysokomornyi
 */

import { DataSource } from 'typeorm';
import { DATA_SOURCE, USER_REPOSITORY } from '../database.constants';
import { User } from './entity/user';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE]
  }
];
