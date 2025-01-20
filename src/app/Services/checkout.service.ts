import { Injectable } from '@angular/core';
import {Purchase} from '../Models/purchase';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api-service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient,
              private apiService: ApiService) { }

  completePurchase(purchase: Purchase){
    return this.http.post<{orderTrackingNumber:string}>(this.apiService.baseUrl + "/checkout/purchase", purchase);
  }
}
