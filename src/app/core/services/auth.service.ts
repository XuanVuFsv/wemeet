import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { ApiService } from '@data/api.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap, switchMap, map, finalize } from 'rxjs/operators';

export type Credential = {
  email: string;
  password: string;
};

export interface Auth {
  token: string;
}

export interface User extends Auth {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static TOKEN_KEY: string = 'token';

  // tslint:disable-next-line:variable-name
  private _currentUser = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser.asObservable();

  constructor(
    private ngxPermissionsService: NgxPermissionsService,
    private storageService: StorageService,
    private apiService: ApiService
  ) {}

  setCurrentUser(value: any): void {
    this._currentUser.next(value);
  }

  getCurrentUser(): any | null {
    return this._currentUser.getValue();
  }

  removeCurrentUser() {
    this.storageService.removeLocal(AuthService.TOKEN_KEY);
    this._currentUser.next(null);
  }

  get isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else if (this.storageService.getLocalValue(AuthService.TOKEN_KEY)) {
          return this.fetchAuthenticatedUser().pipe(map(user => !!user));
        }
        return of(false);
      })
    );
  }

  get accessToken(): string {
    return this.storageService.getLocalValue(AuthService.TOKEN_KEY);
  }

  logout(): Observable<any> {
    return this.apiService.get('/auth/logout').pipe(
      finalize(() => {
        this.removeCurrentUser();
      })
    );
  }

  login(cred: Credential) {
    return this.apiService.post('/auth/login', cred).pipe(
      // Storage new access token

      tap(resp => {
        this.storageService.setLocalValue(AuthService.TOKEN_KEY, resp.body?.data.token);
      }),
      switchMap(_ => this.fetchAuthenticatedUser())
    );
  }

  fetchAuthenticatedUser() {
    return this.apiService.get('/users/me').pipe(
      // Set authenticated user
      tap(resp => {
        this.setCurrentUser(resp.body);
        // Set permissions of user right here!
        const permissions: string[] = resp.body.roles || ['can read users'];
        this.ngxPermissionsService.addPermission([...permissions]);
      })
    );
  }
}
