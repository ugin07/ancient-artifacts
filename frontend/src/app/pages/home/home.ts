import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, startWith } from 'rxjs';

import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

type CatalogItem = { key: string; title: string };
type CatalogObj = { title?: string; items?: CatalogItem[] };
type CatalogArr = Array<{ id?: string; title?: string; items?: CatalogItem[] }>;

type Vm =
  | { state: 'loading' }
  | { state: 'error' }
  | { state: 'ready'; title: string; items: CatalogItem[] };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  vm$: Observable<Vm>;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {
    this.vm$ = this.api.catalog().pipe(
      map((data: any) => {
        const catalog: CatalogObj | undefined =
          Array.isArray(data) ? (data as CatalogArr)[0] : (data as CatalogObj);

        const title = catalog?.title ?? 'Starożytność';
        const items = catalog?.items ?? [];

        return { state: 'ready', title, items } as Vm;
      }),
      startWith({ state: 'loading' } as Vm),
      catchError(() => of({ state: 'error' } as Vm))
    );
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
