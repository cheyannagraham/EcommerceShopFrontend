import { Injectable } from '@angular/core';
import {Purchase} from '../Models/purchase';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient) { }

  completePurchase(purchase: Purchase){
    this.http.post<Purchase>("http://localhost:8080/checkout/purchase", purchase)
      .subscribe({
        next: response => console.log(response),
        error: error => console.log(error)
      })
  }
}
