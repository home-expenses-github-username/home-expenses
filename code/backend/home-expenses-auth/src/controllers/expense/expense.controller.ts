/*
 * Author: Vladimir Vysokomornyi
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AccessTokenGuard } from '../../modules/auth/guards/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ExpenseV2 } from '../../modules/database/expense/entity/expense';
import { ExpenseDbService } from '../../modules/database/expense/service/expense-db.service';
import { EXPENSE_NOT_FOUND_ERROR } from '../../modules/database/user/user.constants';
import { CreateExpenseDto } from './dto/create.expense.dto';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly service: ExpenseDbService) {}

  @ApiOperation({ summary: 'Find all expenses', description: 'Use access token as Bearer during getting expenses' })
  @ApiOkResponse({ description: 'All expenses are found' })
  @Get('findAll')
  async findAll(): Promise<ExpenseV2[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Create expenseV2', description: 'Use access token as Bearer during creating expenseV2' })
  @ApiCreatedResponse({ description: 'The expenseV2 has been successfully created' })
  @ApiBadRequestResponse({ description: 'The expenseV2 is already registered' })
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateExpenseDto): Promise<ExpenseV2> {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Delete expenseV2', description: 'Use access token as Bearer during expenseV2 removal' })
  @ApiCreatedResponse({ description: 'The expenseV2 has been successfully created' })
  @ApiBadRequestResponse({ description: 'The expenseV2 is already registered' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number): Promise<any> {
    const isExisted = await this.service.findById(id);
    if (!isExisted) {
      throw new NotFoundException(EXPENSE_NOT_FOUND_ERROR);
    }
    return this.service.delete(id);
  }
}
