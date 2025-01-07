import {Component} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {UserService} from '../../Services/user.service';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';
import {Subscription} from 'rxjs';
import {CartItemModel} from '../../Models/cartItem.model';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-review-order',
  imports: [
    JsonPipe
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css'
})
export class ReviewOrderComponent {
  subscriptions: Subscription[] = [];
  cartItems: Map<number, CartItemModel>;
  cartTotal: number = 0;
  userData = {};

  constructor(public cartService: CartService, public userService: UserService, public subService: SubscriptionManagementService) {
    this.cartItems = this.cartService.cart;
    this.userData = this.userService.userFormData;

  }

  ngOnInit() {
    this.subscribeToOrderData();
  }

  ngOnDestroy() {
    this.subService.unSubscribe(this.subscriptions);
  }

  subscribeToOrderData(): void {
    this.subscriptions.push(
      this.cartService.totalCost.subscribe(cost => this.cartTotal = cost)
    )
  }

}
