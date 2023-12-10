import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PrivateHeaderComponent } from '../private-header/private-header.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [PrivateHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {}
