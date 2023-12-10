import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PrivateHeaderComponent } from '../../../../components/private-header/private-header.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [PrivateHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
})
export class ListingComponent {}
