import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../Models/product.model';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';
  productsPage = new Subject<ProductListPage>();
  subscriptions: Subscription[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {
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

  getProducts(page:any) {
    this.productRequest(`${this.baseUrl}/products?page=${page.number}&size=${page.size}`);
  }

  getProductsByCategory(categoryId:any, page:any) {
    this.productRequest(`${this.baseUrl}/products/search/findByCategoryId?categoryId=${categoryId}&page=${page.number}&size=${page.size}`);
  }

  searchProducts(keyword: string, page:any) {
    this.productRequest(`${this.baseUrl}/products/search/findProductsByNameContainingIgnoreCase?keyword=${keyword}&page=${page.number}&size=${page.size}`)
  }

  getProduct(id: number) {
    return this.httpClient.get<ProductModel>(`${this.baseUrl}/products/${id}`);
  }

  removeSubscriptions() {
    while (this.subscriptions.length > 0) {
      let sub = this.subscriptions.pop();
      sub?.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.removeSubscriptions()
  }
}

interface ProductListResponse {
  _embedded: {
    products: ProductModel[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface ProductListPage {
  products: ProductModel[],
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
