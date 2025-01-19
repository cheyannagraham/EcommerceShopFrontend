import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseURL = "https://bookshop-backend-3d608f85a00c.herokuapp.com/api";
}
