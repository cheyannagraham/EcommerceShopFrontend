import {Routes} from '@angular/router';
import {ProductListComponent} from './Components/product-list/product-list.component';
import {ProductDetailComponent} from './Components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: "products/search/:keyword",
    component: ProductListComponent,
    // pathMatch: 'full'
  },
  {
    path: 'products/:categoryId/:categoryName',
    component: ProductListComponent,
    // pathMatch: 'full'

  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    // pathMatch: 'full'
  },
  {
    path: '**',
    component: ProductListComponent,
    pathMatch: 'full'
  }
];
