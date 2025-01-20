import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategoryModel} from '../Models/productCategory.model';
import {map} from 'rxjs';
import {ApiService} from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl;

  constructor(private httpClient: HttpClient,
              private apiService: ApiService) {
    this.baseUrl = this.apiService.baseUrl;
  }

  getProductCategories() {
    return this.httpClient.get<ProductCategoryResponse>(this.baseUrl + "/product-category")
      .pipe(map(response => response._embedded["product-category"]))
  }
}

interface ProductCategoryResponse {
  _embedded: {
    "product-category": ProductCategoryModel[];
  }
}
