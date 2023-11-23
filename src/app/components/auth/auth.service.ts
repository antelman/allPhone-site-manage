import { Injectable } from '@angular/core';
import { from, switchMap, tap } from 'rxjs';
import { account } from '../../../lib/appwrite';
import { UserStore } from './state/user.store';

@Injectable()
export class AuthService {
  constructor(private userStore: UserStore) {}

  login(email, password) {
    return from(account.createEmailSession(email, password)).pipe(
      switchMap(() => account.get()),
      tap(res => this.userStore.login(res))
    );
  }
}
