import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private localStore: LocalStoreService
  ) {}

  private async handleHttpError(error: HttpErrorResponse): Promise<any> {
    const processedResponse = error.error;
    if (error.status === 401)
      if (processedResponse?.message?.includes('Please authenticate')) {
        this.message.error('Please login again!');
        setTimeout(() => {
          if (
            this.localStore.getAccessToken() ||
            this.localStore.getRefreshToken()
          ) {
            this.localStore.logoutClearLocal();
            window.location.reload();
          }
        }, 2000);
      }

    throw error;
  }

  private parseJson(response: any): any {
    if (response.status === 204 || response.status === 205) {
      return { status: 'OK' };
    }
    return response;
  }

  request(
    url: string,
    body: any,
    needsAuth: boolean = true,
    requestType: string = 'post',
    headers: any = {}
  ): Observable<any> | any {
    let requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers,
    });

    if (needsAuth) {
      requestHeaders = requestHeaders.set(
        'Authorization',
        `Bearer ${this.localStore.getAccessToken()}`
      );
    }

    return (this.http as any)
      [requestType](url, body, { headers: requestHeaders })
      .pipe(
        catchError((error) => this.handleHttpError(error as HttpErrorResponse)),
        this.parseJson
      );
  }
}
