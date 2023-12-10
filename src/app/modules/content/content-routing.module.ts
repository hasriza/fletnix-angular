import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/listing/listing.component').then(
        (m) => m.ListingComponent
      ),
    title: 'Content',
  },
  {
    path: ':showId',
    loadComponent: () =>
      import('./components/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
