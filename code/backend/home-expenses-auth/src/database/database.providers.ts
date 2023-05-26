/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { DataSource } from 'typeorm';

import { DATA_SOURCE } from './database.constants';
import { User } from './user/entity/user';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: '__DB_TYPE__',
        host: '__DB_HOST__',
        username: '__DB_USERNAME__',
        password: '__DB_PASSWORD__',
        database: '__DB_NAME__',
        synchronize: false,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: []
      });

      return dataSource.initialize();
    }
  }
];
