import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategoryModel} from '../Models/productCategory.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {}

  getProductCategories(){
    return this.httpClient.get<ProductCategoryResponse>(`${this.baseUrl}/product-category`)
      .pipe(map(response => response._embedded["product-category"]))
  }
}

interface ProductCategoryResponse {
  _embedded: {
    "product-category": ProductCategoryModel[];
  }
}
