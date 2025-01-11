import { Injectable } from '@angular/core';
import {Purchase} from '../Models/purchase';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient) { }

  completePurchase(purchase: Purchase){
    return this.http.post<{orderTrackingNumber:string}>("http://localhost:8080/checkout/purchase", purchase);
  }
}
