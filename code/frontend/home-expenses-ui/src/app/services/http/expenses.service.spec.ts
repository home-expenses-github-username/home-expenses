import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [] });
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
