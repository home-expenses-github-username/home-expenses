export interface Expense {
  date: string;
  category: string;
  cost: number;
  comment: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  _links?: any;
}
