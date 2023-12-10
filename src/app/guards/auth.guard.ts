import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { LocalStoreService } from '../services/local-store.service';

export const AuthGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(UserService).isAuthenticated()
    ? true
    : inject(Router).navigateByUrl('/auth');
};

export const NotAuthGuard: CanActivateFn = (
  route,
  state
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(UserService).isAuthenticated()
    ? inject(Router).navigateByUrl('/content')
    : true;
};
