import { Injectable, WritableSignal, signal } from '@angular/core';
import { AUTH_APIS } from '../config/app-specs';
import { ApiService } from './api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private localStore: LocalStoreService
  ) {}

  isAuthenticated: WritableSignal<boolean> = signal(
    !!this.localStore.getAccessToken()
  );

  private authenticatedSubject = new BehaviorSubject<boolean>(
    !!this.localStore.getAccessToken()
  );
  authenticated = this.authenticatedSubject.asObservable();
  updateAuthenticatedValue(newValue: boolean) {
    this.authenticatedSubject.next(newValue);
    this.isAuthenticated.set(newValue);
  }

  private authLoadingSubject = new BehaviorSubject<boolean>(false);
  authLoading = this.authLoadingSubject.asObservable();
  updateAuthLoadingValue(newValue: boolean) {
    this.authLoadingSubject.next(newValue);
  }

  private userDetailsSubject = new BehaviorSubject<object>({});
  userDetails = this.userDetailsSubject.asObservable();
  updateuserDetails(newValue: object) {
    this.userDetailsSubject.next(newValue);
  }

  private setTokens(tokenObj: { access: object; refresh: object } | any) {
    this.localStore.setAccessToken(tokenObj?.access?.token);
    this.localStore.setAccessTokenExpiration(tokenObj?.access?.expires);
    this.localStore.setRefreshToken(tokenObj?.refresh?.token);
    this.localStore.setRefreshTokenExpiration(tokenObj?.refresh?.expires);
  }

  private successfulAuth(response: any) {
    this.setTokens(response.tokens);
    this.updateuserDetails(response.user);
    this.updateAuthenticatedValue(!!response.user);
  }

  registerUser(formValues: any) {
    this.updateAuthLoadingValue(true);

    const requestURL = AUTH_APIS + '/register';

    this.api.request(requestURL, formValues, false).subscribe(
      (response: any) => {
        this.successfulAuth(response);
      },
      (error: any) => {
        this.message.error(error?.error?.message || error?.message);
      }
    );

    this.updateAuthLoadingValue(false);
    return;
  }

  loginUser(formValues: any) {
    this.updateAuthLoadingValue(true);

    const requestURL = AUTH_APIS + '/login';

    this.api.request(requestURL, formValues, false).subscribe(
      (response: any) => {
        this.successfulAuth(response);
      },
      (error: any) => {
        this.message.error(error?.error?.message || error?.message);
      }
    );

    this.updateAuthLoadingValue(false);
    return;
  }

  refreshUser() {
    this.updateAuthLoadingValue(true);

    const requestURL = AUTH_APIS + '/refresh-tokens';

    this.api
      .request(requestURL, {
        refreshToken: this.localStore.getRefreshToken(),
      })
      .subscribe(
        (response: any) => {
          this.successfulAuth(response);
        },
        (error: any) => {
          this.message.error(error?.error?.message || error?.message);
        }
      );

    this.updateAuthLoadingValue(false);
    return;
  }

  logUserOut() {
    this.updateAuthLoadingValue(true);

    const requestURL = AUTH_APIS + '/logout';

    this.api
      .request(
        requestURL,
        {
          refreshToken: this.localStore.getRefreshToken(),
        },
        false
      )
      .subscribe(
        (response: any) => {
          this.updateAuthenticatedValue(false);
          this.updateuserDetails({});
          this.localStore.logoutClearLocal();
        },
        (error: any) => {
          this.message.error(error?.error?.message || error?.message);
        }
      );

    this.updateAuthLoadingValue(false);
    return;
  }
}
