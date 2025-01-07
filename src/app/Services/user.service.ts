import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFormData = new BehaviorSubject<{}>({});

  constructor() { }

  updateUserFormData(data:{}) {
    this.userFormData.next(data);
  }

}
