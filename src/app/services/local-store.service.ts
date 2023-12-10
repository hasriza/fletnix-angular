import { Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { AppDefaults } from '../config/app-specs';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  localStorageRef: any;
  windowRef: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.localStorageRef = this.document.defaultView?.localStorage;

    if (isPlatformBrowser(this.platformId)) {
      this.windowRef = window;
    }
  }

  REFRESH_TOKEN_KEY: string = 'refreshToken';
  ACCESS_TOKEN_KEY: string = 'accessToken';
  ACCESS_TOKEN_KEY_EXPIRATION: string = 'accessTokenExpiration';
  REFRESH_TOKEN_KEY_EXPIRATION: string = 'refreshTokenExpiration';

  setLocalStorage = (name: string, value: any) => {
    if (this.localStorageRef) {
      try {
        this.localStorageRef.setItem(name, value);
      } catch (e: any) {
        console.log('Unable to set value in local storage: ', e);
      }
    }
  };

  getLocalStorage = (name: string) => {
    if (this.localStorageRef) {
      try {
        return this.localStorageRef.getItem(name);
      } catch (e: any) {
        console.log('Unable to get value from local storage: ', e);
        return null;
      }
    }
  };

  removeLocalStorage = (name: string) => {
    if (this.localStorageRef) {
      try {
        this.localStorageRef.removeItem(name);
      } catch (e: any) {
        console.log('Unable to remove value from local storage: ', e);
      }
    }
  };

  public clearCacheAndHardReload = () => {
    const verVal = this.getLocalStorage('lastVersion');
    if (!verVal || verVal !== AppDefaults.APP_VERSION + AppDefaults.APP_BUILD) {
      this.setLocalStorage(
        'lastVersion',
        AppDefaults.APP_VERSION + AppDefaults.APP_BUILD
      );
      if (this.windowRef) {
        const caches = window.caches;
        if (caches) {
          caches
            .keys()
            .then((names: any) =>
              names.forEach((name: any) => caches.delete(name))
            );
        }
        window.location.reload();
      }
    }
  };

  setAccessToken = (token: string) =>
    this.setLocalStorage(this.ACCESS_TOKEN_KEY, token);

  getAccessToken = () => this.getLocalStorage(this.ACCESS_TOKEN_KEY);

  setAccessTokenExpiration = (timestamp: string) =>
    this.setLocalStorage(this.ACCESS_TOKEN_KEY_EXPIRATION, timestamp);

  getAccessTokenExpiration = () =>
    this.getLocalStorage(this.ACCESS_TOKEN_KEY_EXPIRATION);

  setRefreshToken = (token: string) =>
    this.setLocalStorage(this.REFRESH_TOKEN_KEY, token);

  getRefreshToken = () => this.getLocalStorage(this.REFRESH_TOKEN_KEY);

  setRefreshTokenExpiration = (timestamp: string) =>
    this.setLocalStorage(this.REFRESH_TOKEN_KEY_EXPIRATION, timestamp);

  getRefreshTokenExpiration = () =>
    this.getLocalStorage(this.REFRESH_TOKEN_KEY_EXPIRATION);

  logoutClearLocal = () => {
    this.removeLocalStorage(this.REFRESH_TOKEN_KEY);
    this.removeLocalStorage(this.REFRESH_TOKEN_KEY_EXPIRATION);
    this.removeLocalStorage(this.ACCESS_TOKEN_KEY);
    this.removeLocalStorage(this.ACCESS_TOKEN_KEY_EXPIRATION);
  };
}
