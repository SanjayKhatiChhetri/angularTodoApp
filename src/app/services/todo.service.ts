// src/app/services/todo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/todo`;

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTodo(
    title: string,
    description: string,
    status: string
  ): Observable<any> {
    return this.http.post(this.apiUrl, { title, description, status });
  }

  updateTodo(
    id: number,
    title: string,
    description: string,
    status: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      title,
      description,
      status,
    });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
