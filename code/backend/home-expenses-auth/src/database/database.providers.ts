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
        type: 'mssql',
        host: 'db-host-in-KeyVault>',
        username: 'db-username-in-KeyVault',
        password: 'db-password-in-KeyVault',
        database: 'db-name-in-KeyVault',
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
