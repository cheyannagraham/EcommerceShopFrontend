import {Component, Pipe, PipeTransform} from '@angular/core';
import {CartService} from '../../Services/cart.service';
import {UserService} from '../../Services/user.service';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';
import {Subscription} from 'rxjs';
import {CartItemModel} from '../../Models/cartItem.model';
import {CurrencyPipe, JsonPipe, KeyValuePipe} from '@angular/common';
import {CheckoutService} from '../../Services/checkout.service';
import {Purchase} from '../../Models/purchase';
import {OrderItem} from '../../Models/order-item';
import {Order} from '../../Models/order';
import {Customer} from '../../Models/customer';
import {Address} from '../../Models/address';

@Pipe({name: 'keyFormatPipe'})
export class KeyFormatPipe implements PipeTransform {
  transform(value: any, ...args: any): any {
    let words = [];
    let word = '';
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) <= 90 && value.charCodeAt(i) >= 65) {
        words.push(word[0].toUpperCase() + word.substring(1));
        word = value[i];
      } else word += value[i];
    }
    words.push(word[0].toUpperCase() + word.substring(1));
    return words.join(" ");
  }
}

@Component({
  selector: 'app-review-order',
  imports: [
    CurrencyPipe,
    KeyValuePipe,
    KeyFormatPipe
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css'
})
export class ReviewOrderComponent {
  subscriptions: Subscription[] = [];
  cartItems: Map<number, CartItemModel>;
  cartTotal: number = 0;
  cartQuantity: number = 0;
  reviewGroups = ["customer", "shippingAddress", "billingAddress", "creditCard"]; // listed for explicit ordering
  userData : {[key:string]:any} = {};


  constructor(public cartService: CartService,
              public userService: UserService,
              public subService: SubscriptionManagementService,
              public checkoutService: CheckoutService) {
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

    this.subscriptions.push(
      this.cartService.totalItems.subscribe(quantity => this.cartQuantity = quantity)
    )

    this.subscriptions.push(
      this.userService.userFormData.subscribe(user => this.userData = user)
    )
  }

  submitPurchase(){
    const order = new Order(this.cartQuantity, this.cartTotal);
    const customer = new Customer(this.userData.customer);
    const orderItems = [...this.cartItems.values()].map(item => new OrderItem(item));
    const shippingAddress = new Address(this.userData.shippingAddress);
    const billingAddress = new Address(this.userData.billingAddress);

    const purchase = new Purchase(customer, order, shippingAddress, billingAddress, orderItems);
    console.log(purchase);
  }

}


let data = {
  "customer": {"firstName": "last", "lastName": "time", "email": "i@am.com"},
  "shippingAddress": {"country": "5", "streetAddress": "typing", "city": "all", "state": "145", "zipCode": "of"},
  "billingAddress": {"country": "5", "streetAddress": "typing", "city": "all", "state": "145", "zipCode": "of"},
  "creditCard": {
    "cardType": "this",
    "cardholderName": "stuff",
    "cardNumber": 1234567890898765,
    "secCode": "123",
    "expMonth": "10",
    "expYear": "2026"
  }
}
