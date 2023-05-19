import { Controller, Get } from '@nestjs/common';
import { TestService } from '../../services/test/test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('hello')
  getHello(): string {
    return this.testService.getHello();
  }
}
