import {Component} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart-status',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {
  cartPrice = 0;
  cartQuantity = 0;

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
    this.subscribeToCart();
  }

  subscribeToCart() {
    this.cartService.totalItems.subscribe((totalItems) => {
      this.cartQuantity = totalItems;
    });

    this.cartService.totalCost.subscribe((totalCost) => {
      this.cartPrice = totalCost;
    })
  }


}
