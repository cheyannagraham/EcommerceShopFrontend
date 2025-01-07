import {Routes} from '@angular/router';
import {ProductListComponent} from './Components/product-list/product-list.component';
import {ProductDetailComponent} from './Components/product-detail/product-detail.component';
import {CartDetailsComponent} from './Components/cart-details/cart-details.component';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {ReviewOrderComponent} from './Components/review-order/review-order.component';

export const routes: Routes = [
  {
    path: "products/search/:keyword",
    component: ProductListComponent,
  },
  {
    path: 'products/:categoryId/:categoryName',
    component: ProductListComponent,

  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path : 'cart-details',
    component: CartDetailsComponent,
  },  {
    path : 'reviewOrder',
    component: ReviewOrderComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    component: ProductListComponent,
    pathMatch: 'full'
  }
];
