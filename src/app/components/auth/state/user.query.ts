import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserState, UserStore } from './user.store';

@Injectable({
    providedIn: 'root'
})
export class UserQuery extends Query<UserState> {
    isLoggedIn$ = this.select(state => !!state.$id);
    user$ = this.select(state => state);
 
    constructor(protected store: UserStore) {
      super(store);
    }

    isUserLoggedIn() {
      return !!this.getValue().name;
    }

    getUserName() {
      return this.getValue().name;
    }
 }