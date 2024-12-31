import { Component } from '@angular/core';
import {CartItemModel} from '../../Models/cartItem.model';
import {CartService} from '../../Services/cart.service';
import {of, Subscription} from 'rxjs';
import {CurrencyPipe, KeyValuePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';

@Component({
  selector: 'app-cart-details',
  imports: [
    KeyValuePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
  cartItems: Map<number, CartItemModel>;
  cartQuantity: number = 0;
  cartTotalCost: number = 0;
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService, public subService: SubscriptionManagementService) {
    this.cartItems = this.cartService.cart;
    console.log(this.cartItems);
  }

  ngOnInit() {
    this.subscribeToCartItems();
  }

  ngOnDestroy() {
    this.subService.unSubscribe(this.subscriptions);
  }

  subscribeToCartItems(): void {
    this.subscriptions.push(this.cartService.totalItems.subscribe((totalItems) => {
      this.cartQuantity = totalItems;
    }));

    this.subscriptions.push(this.cartService.totalCost.subscribe((totalCost) => {
      this.cartTotalCost = totalCost;
    }));

    this.cartService.calculateCartTotals();
  }

  protected readonly of = of;
}
