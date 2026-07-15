import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportResponse } from '../../shared/models/report-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) { }

  getMonthlyReport(year: number, month: number): Observable<ReportResponse> {
    return this.http.get<ReportResponse>(`${this.apiUrl}/monthly?year=${year}&month=${month}`);
  }
}