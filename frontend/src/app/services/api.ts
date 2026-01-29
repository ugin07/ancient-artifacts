import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CatalogItem = { key: string; title: string };
export type CatalogCategory = { id: string; title: string; items: CatalogItem[] };
export type CatalogRoot = { id: string; title: string; categories: CatalogCategory[] };

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.base}/auth/login`, {
      username,
      password
    });
  }

  catalog(): Observable<CatalogRoot[]> {
    return this.http.get<CatalogRoot[]>(`${this.base}/catalog?ts=${Date.now()}`);
  }

  getNote(key: string): Observable<{ content: string }> {
    return this.http.get<{ content: string }>(`${this.base}/notes/${key}`);
  }

  saveNote(key: string, content: string): Observable<{ ok: true }> {
    return this.http.post<{ ok: true }>(`${this.base}/notes/${key}`, { content });
  }
}
