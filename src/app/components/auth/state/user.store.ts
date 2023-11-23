import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserState {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password: string;
  hash: string;
  hashOptions: object;
  registration: string;
  status: boolean;
  labels: string;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: {
    theme: string;
    timezone: string;
  };
  accessedAt: string;
}

export function createInitialState(): UserState {
  return {
    $id: null,
    $createdAt: null,
    $updatedAt: null,
    name: null,
    password: null,
    hash: null,
    hashOptions: null,
    registration: null,
    status: null,
    labels: null,
    passwordUpdate: null,
    email: null,
    phone: null,
    emailVerification: null,
    phoneVerification: null,
    prefs: {
      theme: null,
      timezone: null,
    },
    accessedAt: null,
  };
}
@StoreConfig({ name: 'user' })
@Injectable({ providedIn: 'root' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }

  login(user) {
    this.update(() => {
      return { ...user };
    });
  }
}
