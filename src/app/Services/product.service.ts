import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductListPage, ProductListResponse, ProductModel} from '../Models/product.model';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SubscriptionManagementService} from './subscription-management.service';
import {ApiService} from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl;
  productsPage = new Subject<ProductListPage>();
  subscriptions: Subscription[] = [];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private subService: SubscriptionManagementService,
              private apiService: ApiService) {
    this.baseUrl = this.apiService.baseURL;
  }

  private setProducts(products: ProductListPage) {
    this.productsPage.next(products);
  }

  private productRequest(url: string) {
    this.subscriptions.push(
      this.httpClient.get<ProductListResponse>(url)
        .subscribe(response => {
          this.setProducts({
            products: response._embedded.products,
            page: response.page
          });
        })
    )
  }

  getProducts(page: any) {
    this.productRequest(`${this.baseUrl}/products?page=${page.number}&size=${page.size}`);
  }

  getProductsByCategory(categoryId: any, page: any) {
    this.productRequest(`${this.baseUrl}/products/search/findByCategoryId?categoryId=${categoryId}&page=${page.number}&size=${page.size}`);
  }

  searchProducts(keyword: string, page: any) {
    this.productRequest(`${this.baseUrl}/products/search/findProductsByNameContainingIgnoreCase?keyword=${keyword}&page=${page.number}&size=${page.size}`)
  }

  getProduct(id: number) {
    return this.httpClient.get<ProductModel>(`${this.baseUrl}/products/${id}`);
  }

  ngOnDestroy(): void {
    this.subService.unSubscribe(this.subscriptions);
  }
}


