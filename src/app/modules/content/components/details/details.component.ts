import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { PrivateHeaderComponent } from '../../../../components/private-header/private-header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PrivateHeaderComponent,
    NzLayoutModule,
    NzCardModule,
    NzSkeletonModule,
    NzGridModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private contentServ: ContentService
  ) {}

  details: object | any = {};
  detailsLoading: boolean = false;

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('showId');
    showId && this.fetchDetails(showId);

    this.contentServ.contentDetails.subscribe((detailItem) => {
      this.titleService.setTitle(detailItem?.title || 'FletNix');
      this.details = detailItem;
    });

    this.contentServ.contentLoading.subscribe(
      (loading) => (this.detailsLoading = loading)
    );
  }

  fetchDetails(showId: string) {
    this.contentServ.getDetails(showId);
  }
}
