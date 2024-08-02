import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/todo`;
  private todoCreatedSource = new Subject<void>();

  todoCreated$ = this.todoCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTodo(
    title: string,
    description: string,
    status: string
  ): Observable<any> {
    return this.http.post(this.apiUrl, { title, description, status }).pipe(
      tap(() => {
        this.todoCreatedSource.next();
      })
    );
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
