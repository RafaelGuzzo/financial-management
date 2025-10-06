import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Card } from '../shared/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  getByPerson(personId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/person/${personId}`);
  }

  getById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  create(card: Partial<Card>): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  update(id: number, card: Partial<Card>): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${id}`, card);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}