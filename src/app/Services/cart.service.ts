import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CartItemModel} from '../Models/cartItem.model'
import {ProductModel} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map<number, CartItemModel>();
  public cartSubject = new BehaviorSubject<Map<number, CartItemModel>>(null);
  public totalItems = new BehaviorSubject<number>(0);
  public totalCost = new BehaviorSubject<number>(0);
  public cartStorage: Storage = localStorage;

  constructor() {
    let cart = JSON.parse(this.cartStorage.getItem('cart'));
    console.log("Retrieved from storage", cart);
    for (let item in cart) {
      this.cart.set(Number(item), cart[item]);
    }
    this.cartSubject.next(this.cart);
    if(this.cart.size > 0) this.calculateCartTotals();

    //keep local storage up-to-date
    this.cartSubject.subscribe(cartItems => this.cartStorage.setItem('cart', JSON.stringify(Object.fromEntries(this.cart))));
  }

  addToCart(product: ProductModel) {
    let item = this.cart.get(product.id);
    if (item) item.quantity++;
    else {
      item = new CartItemModel(product);
      this.cart.set(product.id, item);
    }
    //update cart subject
    this.cartSubject.next(this.cart);

    this.calculateCartTotals();
  }

  increaseItemQuantity(itemId:number) {
    let item = this.cart.get(itemId);
    if (item) item.quantity++;

    this.cartSubject.next(this.cart);
    this.calculateCartTotals();
  }

  deleteItem(itemId:number) {
    this.cart.delete(itemId);

    this.cartSubject.next(this.cart);
    this.calculateCartTotals();
  }

  decreaseItemQuantity(itemId:number) {
    let item = this.cart.get(itemId);
    if (item) item.quantity--;
    if(item.quantity === 0) this.cart.delete(itemId);

    this.cartSubject.next(this.cart);
    this.calculateCartTotals();
  }

  calculateCartTotals() {
    let quantity = 0;
    let cost = 0;

    this.cart.forEach((cartItem: CartItemModel) => {
      quantity += cartItem.quantity;
      cost += (cartItem.quantity * cartItem.price);
    });

    this.totalCost.next(cost);
    this.totalItems.next(quantity);
    return cost;
  }

  resetCart() {
    this.cart.clear();
    this.cartSubject.next(this.cart);
    this.cartStorage.removeItem('cart');
    this.calculateCartTotals();

  }
}
