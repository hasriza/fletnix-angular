import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PrivateHeaderComponent } from '../private-header/private-header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    PrivateHeaderComponent,
    NzLayoutModule,
    NzCardModule,
    NgIconComponent,
    NzButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
  providers: provideIcons({ heroUserCircle }),
})
export class UserInfoComponent {
  userData: any;

  constructor(private userServ: UserService) {
    this.userServ.userDetails.subscribe((val) => (this.userData = val));
  }

  submitLogout() {
    this.userServ.logUserOut();
  }
}
