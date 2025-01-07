import {Component} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {UserService} from '../../Services/user.service';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';
import {Subscription} from 'rxjs';
import {CartItemModel} from '../../Models/cartItem.model';
import {CurrencyPipe, JsonPipe, KeyValuePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-review-order',
  imports: [
    JsonPipe,
    CurrencyPipe,
    KeyValuePipe,
    RouterLink
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css'
})
export class ReviewOrderComponent {
  subscriptions: Subscription[] = [];
  cartItems: Map<number, CartItemModel>;
  cartTotal: number = 0;
  userData = data;

  constructor(public cartService: CartService, public userService: UserService, public subService: SubscriptionManagementService) {
    this.cartItems = this.cartService.cart;

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

    // this.subscriptions.push(
    //   this.userService.userFormData.subscribe(user => this.userData = user)
    // )
  }

}
let data = { "customer": { "firstName": "last", "lastName": "time", "email": "i@am.com" }, "shippingAddress": { "country": "5", "streetAddress": "typing", "city": "all", "state": "145", "zipCode": "of" }, "billingAddress": { "country": "5", "streetAddress": "typing", "city": "all", "state": "145", "zipCode": "of" }, "creditCard": { "cardType": "this", "cardholderName": "stuff", "cardNumber": 1234567890898765, "secCode": "123", "expMonth": "10", "expYear": "2026" } }
