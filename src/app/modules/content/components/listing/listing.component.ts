import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PrivateHeaderComponent } from '../../../../components/private-header/private-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCalendar,
  heroArrowDown,
  heroArrowUp,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentService } from '../../services/content.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    PrivateHeaderComponent,
    NzButtonModule,
    NzInputModule,
    NzRadioModule,
    NzCardModule,
    NzLayoutModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzDividerModule,
    NzSpinModule,
    FormsModule,
    NgIconComponent,
    CommonModule,
    InfiniteScrollModule,
    NzGridModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
  providers: provideIcons({
    heroCalendar,
    heroArrowDown,
    heroArrowUp,
    heroMagnifyingGlass,
  }),
})
export class ListingComponent implements OnInit {
  @ViewChild('infxScroll') scrollDiv: ElementRef = new ElementRef(null);

  showType = 'all';
  dateSorter: number | undefined = undefined;
  searchValue: string = '';
  fetchLoading: boolean = false;

  shouldDebounce: boolean = false;

  containerHeight: number = window.innerHeight - 200;

  contentRes: object | any = {};

  constructor(private contentServ: ContentService, private router: Router) {
    this.contentServ.contentListResponse.subscribe(
      (res) => (this.contentRes = res)
    );

    this.contentServ.contentLoading.subscribe(
      (val) => (this.fetchLoading = val)
    );
  }

  ngOnInit(): void {
    this.fetchList();
  }

  scrollToTop() {
    const divElement: HTMLElement = this.scrollDiv.nativeElement;

    divElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  showItemDetails(item: any) {
    this.router.navigateByUrl('/content/' + item.id);
  }

  getDateSorterNextState() {
    switch (this.dateSorter) {
      case undefined:
        return 1;

      case 1:
        return -1;

      case -1:
        return undefined;

      default:
        return undefined;
    }
  }

  handleSearchChange(value: string) {
    this.searchValue = value.replace(/^\s/, '');

    if (!this.shouldDebounce && !this.fetchLoading) {
      this.shouldDebounce = true;

      setTimeout(() => {
        this.handleSearch();

        this.shouldDebounce = false;
      }, 1300);
    }
  }

  handleSearch() {
    this.fetchList({ searchVal: this.searchValue, page: 1 });
  }

  updateShowType(val: any) {
    this.scrollToTop();

    this.fetchList({ page: 1 });
  }

  fetchList({
    searchVal = this.searchValue,
    type = this.showType === 'all' ? undefined : this.showType,
    page = this.contentRes?.nextPage || 1,
    dateSort = undefined,
  }: {
    searchVal?: string | any;
    type?: string | any;
    page?: number;
    dateSort?: number | any;
  } = {}) {
    this.dateSorter = dateSort;
    this.contentServ.getContents({
      searchVal: searchVal || undefined,
      type,
      page,
      sortBy: '_id',
      dateSort,
      limit: 30,
    });
  }
}
