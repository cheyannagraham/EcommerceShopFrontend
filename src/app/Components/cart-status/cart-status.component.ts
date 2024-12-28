import {Component} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-cart-status',
  imports: [CurrencyPipe, FaIconComponent],
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


  protected readonly faShoppingCart = faShoppingCart;
}
