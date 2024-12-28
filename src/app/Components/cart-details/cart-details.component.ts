import { Component } from '@angular/core';
import {CartItemModel} from '../../Models/cartItem.model';
import {CartService} from '../../Services/cart.service';
import {of} from 'rxjs';
import {CurrencyPipe, KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-cart-details',
  imports: [
    KeyValuePipe,
    CurrencyPipe
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
  cartItems: Map<number, CartItemModel>;
  cartQuantity: number = 0;
  cartTotalCost: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cart;
    console.log(this.cartItems);
  }

  ngOnInit() {
    this.subscribeToCartItems();
  }

  subscribeToCartItems(): void {
    this.cartService.totalItems.subscribe((totalItems) => {
      this.cartQuantity = totalItems;
    });

    this.cartService.totalCost.subscribe((totalCost) => {
      this.cartTotalCost = totalCost;
    });

    this.cartService.calculateCartTotals();
  }

  protected readonly of = of;
}
