import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItemModel} from '../Models/cartItem.model'
import {ProductModel} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Map<number, CartItemModel>();
  private totalItems = new Subject<number>();
  private totalCost = new Subject<number>();

  constructor() {
  }

  addToCart(product: ProductModel) {
    let item = this.cart.get(product.id);
    if (item) item.quantity++;
    else {
      let cartItem: CartItemModel = new CartItemModel(product);
      this.cart.set(product.id, cartItem);
    }
    console.log(this.cart);
  }
}
