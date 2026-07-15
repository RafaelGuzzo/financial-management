export interface Card {
  id: number;
  name: string;
  invoiceDueDate: number;
  invoiceClosingDate: number;
  personId: number;
  personName?: string;
}