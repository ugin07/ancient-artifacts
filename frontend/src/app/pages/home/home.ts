import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, startWith, switchMap, BehaviorSubject } from 'rxjs';

import { ApiService, CatalogResponse, CatalogCategory, CatalogItem } from '../../services/api';
import { AuthService } from '../../services/auth';

type Vm =
  | { state: 'loading' }
  | { state: 'error' }
  | {
      state: 'ready';
      title: string;
      categories: CatalogCategory[];
      selectedKey: string | null;
      selectedTitle: string | null;
      note: string;
      noteLoading: boolean;
      noteError: boolean;
    };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  private selectedKey$ = new BehaviorSubject<string | null>(null);
  private selectedTitle$ = new BehaviorSubject<string | null>(null);

  private noteDraft$ = new BehaviorSubject<string>('');
  private noteBusy$ = new BehaviorSubject<boolean>(false);
  private noteErr$ = new BehaviorSubject<boolean>(false);

  vm$: Observable<Vm>;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {
    const catalog$ = this.api.catalog();

    const note$ = this.selectedKey$.pipe(
      switchMap((key) => {
        if (!key) {
          this.noteDraft$.next('');
          this.noteErr$.next(false);
          return of(null);
        }
        this.noteBusy$.next(true);
        this.noteErr$.next(false);
        return this.api.getNote(key).pipe(
          map((r) => r.content ?? ''),
          catchError(() => {
            this.noteErr$.next(true);
            return of('');
          }),
          map((content) => {
            this.noteDraft$.next(content);
            return content;
          }),
          map(() => null),
          startWith(null),
          map(() => null),
          catchError(() => of(null)),
          map(() => {
            this.noteBusy$.next(false);
            return null;
          })
        );
      })
    );

    this.vm$ = catalog$.pipe(
      switchMap((cat: CatalogResponse) => {
        return note$.pipe(
          startWith(null),
          map(() => {
            const selectedKey = this.selectedKey$.value;
            const selectedTitle = this.selectedTitle$.value;

            return {
              state: 'ready',
              title: cat.title ?? 'Starożytność',
              categories: cat.categories ?? [],
              selectedKey,
              selectedTitle,
              note: this.noteDraft$.value,
              noteLoading: this.noteBusy$.value,
              noteError: this.noteErr$.value
            } as Vm;
          })
        );
      }),
      startWith({ state: 'loading' } as Vm),
      catchError(() => of({ state: 'error' } as Vm))
    );
  }

  selectItem(item: CatalogItem): void {
    this.selectedTitle$.next(item.title);
    this.selectedKey$.next(item.key);
  }

  onNoteInput(v: string): void {
    this.noteDraft$.next(v);
  }

  save(): void {
    const key = this.selectedKey$.value;
    if (!key) return;

    this.noteBusy$.next(true);
    this.noteErr$.next(false);

    this.api.saveNote(key, this.noteDraft$.value).subscribe({
      next: () => this.noteBusy$.next(false),
      error: () => {
        this.noteBusy$.next(false);
        this.noteErr$.next(true);
      }
    });
  }

  remove(): void {
    const key = this.selectedKey$.value;
    if (!key) return;

    this.noteDraft$.next('');
    this.save();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  trackCat(_: number, c: CatalogCategory) {
    return c.id;
  }

  trackItem(_: number, it: CatalogItem) {
    return it.key;
  }
}
