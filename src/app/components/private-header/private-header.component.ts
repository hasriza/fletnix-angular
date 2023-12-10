import { Component, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppDefaults } from '../../config/app-specs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { heroArrowLeft, heroUserCircle } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [NgIconComponent, NzLayoutModule, CommonModule, RouterLink],
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.css',
  providers: provideIcons({ heroArrowLeft, heroUserCircle }),
})
export class PrivateHeaderComponent {
  constructor(private router: Router, private location: Location) {}

  @Input() headerTitle: string = AppDefaults.APP_NAME;

  goBack() {
    this.location.back();
  }

  isNotUserPage() {
    return this.router.url !== '/user-info';
  }
}
