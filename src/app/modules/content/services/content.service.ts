import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { V1_APIS } from '../../../config/app-specs';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private api: ApiService, private message: NzMessageService) {}

  private contentLoadingSubject = new BehaviorSubject<boolean>(false);
  contentLoading = this.contentLoadingSubject.asObservable();
  updateContentLoadingValue(newValue: boolean) {
    this.contentLoadingSubject.next(newValue);
  }

  private showsList: Object[] = [];
  private contentListResponseSubject = new BehaviorSubject<object | any>({
    showsList: [],
    nextPage: 1,
    totalResults: 30,
  });
  contentListResponse = this.contentListResponseSubject.asObservable();
  updateContentListResponseValue(newValue: object | any) {
    this.contentListResponseSubject.next(newValue);
    this.showsList = newValue.showsList;
  }

  private contentDetailsSubject = new BehaviorSubject<object | any>({});
  contentDetails = this.contentDetailsSubject.asObservable();
  updateContentDetailsValue(newValue: object) {
    this.contentDetailsSubject.next(newValue);
  }

  getContents(payload: {
    searchVal?: string | any;
    type?: string;
    page: number;
    sortBy?: string;
    dateSort?: number;
    limit?: number;
  }) {
    this.updateContentLoadingValue(true);

    const requestURL = V1_APIS + '/content';

    this.api.request(requestURL, payload, true).subscribe(
      (response: any) => {
        this.updateContentListResponseValue({
          ...response,
          showsList:
            payload?.page === 1
              ? response?.showsList
              : [...this.showsList, ...response?.showsList],
          nextPage: payload.page + 1,
        });
      },
      (error: any) => {
        this.message.error(error?.error?.message || error?.message);
      }
    );

    this.updateContentLoadingValue(false);
    return;
  }

  getDetails(showId: string) {
    this.updateContentLoadingValue(true);

    const requestURL = V1_APIS + '/content/' + showId;

    this.api.request(requestURL, {}, true, 'get').subscribe(
      (response: any) => {
        this.updateContentDetailsValue(response.showDetails);
      },
      (error: any) => {
        this.message.error(error?.error?.message || error?.message);
      }
    );

    this.updateContentLoadingValue(false);
    return;
  }
}
