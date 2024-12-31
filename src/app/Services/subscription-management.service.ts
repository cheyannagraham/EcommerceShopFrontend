import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionManagementService {

  constructor() { }

  unSubscribe(subs:Subscription[]) {
    subs.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
