import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ required: false })
  comment: string;
}
