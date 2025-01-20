import {Injectable} from '@angular/core';
import {environment as prod} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl;

  constructor() {
    this.baseUrl = prod.baseUrl;
  }
}
