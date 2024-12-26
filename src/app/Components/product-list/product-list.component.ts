import {Component, Input, SimpleChanges} from '@angular/core';
import {ProductListPage, ProductService} from '../../Services/product.service';
import {ProductModel} from '../../Models/product.model'
import {CurrencyPipe, Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';
import {HistoryComponent} from '../history/history.component';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink, HistoryComponent, NgbPagination],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @Input() categoryId: number | undefined; //maybe make a signal?
  @Input() categoryName: string | undefined = undefined; //maybe make a signal
  @Input() keyword: string | undefined;

  products: ProductModel[] = [];
  productsPage: ProductListPage = {
    products: [],
    //defaults
    page: {
      size: 10,
      totalElements: 0,
      totalPages: 1,
      number: 0
    }
  }
  subscriptions: Subscription[] = [];
  initialized = false;

  constructor(private productService: ProductService, public location: Location) {
  }

  ngOnInit(): void {
    this.subscribeToProducts();
    this.initialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) this.determineProductsToShow(changes);
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  determineProductsToShow(changes: any | undefined = undefined): void {
    if (this.keyword) {
      // new/modifed keyword
      if (this.keyword && changes?.keyword) this.productsPage.page.number = 0;
      this.productService.searchProducts(this.keyword!, this.productsPage.page);

    } else if (this.categoryName) {
      //Change came from onChange event (user click category)
      if (this.categoryName && changes?.categoryName) this.productsPage.page.number = 0;
      this.productService.getProductsByCategory(this.categoryId, this.productsPage.page);

     // in all products view (not search, not category)
    } else this.productService.getProducts(this.productsPage.page);
  }

  subscribeToProducts() {
    this.subscriptions.push(
      this.productService.productsPage.subscribe({
        next: (productsPage: ProductListPage) => {
          this.productsPage =
            {
              products: productsPage.products,
              page: {
                size: productsPage.page.size,
                totalElements: productsPage.page.totalElements,
                totalPages: productsPage.page.totalPages,
                number: productsPage.page.number// + 1
              }
            };
        },
        error: (error: any) => {
          console.log("-----------------Error in Subscription-----------------");
          console.log(error.message);
        },
        complete: () => {
          console.log("------------------Subscription complete-------------------");
        }
      })
    );
    this.determineProductsToShow();
  }

  updatePage(newPageNumber: number) {
    newPageNumber--;
    if(newPageNumber != this.productsPage.page.number){
      this.productsPage.page.number = newPageNumber;
      this.determineProductsToShow();
    }
  }

  updatePageSize(pagesize: string) {
    this.productsPage.page.size = +pagesize;
    this.productsPage.page.number = 0;
    this.determineProductsToShow();
  }

  removeSubscriptions() {
    while (this.subscriptions.length > 0) {
      let sub = this.subscriptions.pop();
      sub?.unsubscribe();
    }
  }
}

