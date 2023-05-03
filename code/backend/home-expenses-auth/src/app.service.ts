import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // eslint-disable-next-line no-console
    console.log('hello service');

    return 'Hello World!';
  }
}
