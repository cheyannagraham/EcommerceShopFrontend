import {Component, Input, SimpleChanges} from '@angular/core';
import {ProductModel} from '../../Models/product.model';
import {CurrencyPipe, Location} from '@angular/common';
import {ProductService} from '../../Services/product.service';
import {Subscription} from 'rxjs';
import {HistoryComponent} from '../history/history.component';
import {CartService} from '../../Services/cart.service';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, HistoryComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id: number = 0;
  product: ProductModel | null = null;
  subscriptions: Subscription[] = [];

  constructor(private productService: ProductService, private location: Location,
              public cartService: CartService, public subService: SubscriptionManagementService) {
  }

  ngOnInit() {
    this.getProduct();
  }

  ngOnDestroy() {
    this.subService.unSubscribe(this.subscriptions);
  }


  getProduct() {
    this.subscriptions.push(
      this.productService.getProduct(this.id)
        .subscribe(product => {
          this.product = product;
        })
    );
  }

  addProductToCart(product: ProductModel) {
    this.cartService.addToCart(product);
  }
}
