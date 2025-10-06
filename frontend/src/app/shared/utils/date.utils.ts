export class DateUtils {
  static getFirstDayOfMonth(year: number, month: number): Date {
    return new Date(year, month - 1, 1);
  }

  static getLastDayOfMonth(year: number, month: number): Date {
    return new Date(year, month, 0);
  }

  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}