export interface Card {
  id: number;
  name: string;
  invoiceDueDate: Date;
  invoiceClosingDate: Date;
  personId: number;
  personName?: string;
}