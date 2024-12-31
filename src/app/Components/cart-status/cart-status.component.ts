import {Component} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';


@Component({
  selector: 'app-cart-status',
  imports: [CurrencyPipe, FaIconComponent, RouterLink],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {
  cartPrice = 0;
  cartQuantity = 0;
  subscriptions: Subscription[] = [];

  constructor(public cartService: CartService, public subService: SubscriptionManagementService) {
  }

  ngOnInit() {
    this.subscribeToCart();
  }

  ngOnDestroy() {
    this.subService.unSubscribe(this.subscriptions);
  }

  subscribeToCart() {
    this.subscriptions.push(this.cartService.totalItems.subscribe((totalItems) => {
      this.cartQuantity = totalItems;
    }));

    this.subscriptions.push(this.cartService.totalCost.subscribe((totalCost) => {
      this.cartPrice = totalCost;
    }));
  }


  protected readonly faShoppingCart = faShoppingCart;
}
