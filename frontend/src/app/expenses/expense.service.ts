import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Expense } from '../shared/models/expense.model';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) { }

  create(expense: any): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  update(id: number, expense: any): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }


  getByDateRange(startDate: Date, endDate: Date): Observable<Expense[]> {
    const params = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
    return this.http.get<Expense[]>(`${this.apiUrl}/date-range`, { params });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}