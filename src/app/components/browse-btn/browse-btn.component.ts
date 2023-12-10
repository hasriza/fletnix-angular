import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-browse-btn',
  standalone: true,
  imports: [NzButtonModule, RouterLink],
  template:
    '<button nz-button nzType="primary" ><a routerLink="content">Browse</a></button>',
})
export class BrowseBtnComponent {}
