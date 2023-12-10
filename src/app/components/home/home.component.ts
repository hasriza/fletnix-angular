import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppDefaults } from '../../config/app-specs';
import { BrowseBtnComponent } from '../browse-btn/browse-btn.component';
import { PrivateHeaderComponent } from '../private-header/private-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzLayoutModule, BrowseBtnComponent, PrivateHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  header: string = AppDefaults.APP_NAME;

  constructor(private metaService: Meta) {
    this.metaService.addTag({
      name: 'description',
      content: 'Way better than Netflix',
    });
  }
}
