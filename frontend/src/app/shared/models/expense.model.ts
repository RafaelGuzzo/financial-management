export interface Expense {
  id: number;
  value: number;
  description: string;
  date: Date;
  installment?: number;
  currentInstallment?: number;
  isRecurring: boolean;
  dueDate?: Date;
  isToReceive?: boolean;
  paymentMethod: string;
  categoryId: number;
  categoryName?: string;
  personId: number;
  personName?: string;
  cardId?: number;
  cardName?: string;
}