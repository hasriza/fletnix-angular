import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { UserService } from './services/user.service';
import { differenceInMinutes, parseISO, sub } from 'date-fns';
import { LocalStoreService } from './services/local-store.service';

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#1f8067',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzLayoutModule],
  providers: [{ provide: NZ_CONFIG, useValue: ngZorroConfig }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private userServ: UserService,
    private localStore: LocalStoreService
  ) {
    this.localStore.clearCacheAndHardReload();
  }

  refreshToken = this.localStore.getRefreshToken();

  ngOnInit(): void {
    if (this.refreshToken) {
      const refreshTokenExp: string =
        this.localStore.getRefreshTokenExpiration() as string;
      if (refreshTokenExp) {
        if (differenceInMinutes(parseISO(refreshTokenExp), new Date()) > 5) {
          this.userServ.refreshUser();
        } else {
          this.userServ.logUserOut();
        }
      }
    }
  }
}
