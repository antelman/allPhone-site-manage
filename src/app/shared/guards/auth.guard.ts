import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { account } from '../../../lib/appwrite';
import { UserQuery } from '../../components/auth/state/user.query';
import { UserStore } from '../../components/auth/state/user.store';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private userQuery: UserQuery,
    private userStore: UserStore
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userQuery.isUserLoggedIn()) {
      return true;
    }

    const isActiveSession = account.get();
    isActiveSession.then(
      response => {
        this.userStore.login(response);
        return true;
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
