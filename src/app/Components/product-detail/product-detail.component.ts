import {Component, Input, SimpleChanges} from '@angular/core';
import {ProductModel} from '../../Models/product.model';
import {CurrencyPipe, Location} from '@angular/common';
import {ProductService} from '../../Services/product.service';
import {Subscription} from 'rxjs';
import {HistoryComponent} from '../history/history.component';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, HistoryComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id: number = 0;
  product: ProductModel | null = null;
  subscriptions: Subscription[] = [];

  constructor(private productService: ProductService, private location: Location) {
  }

  ngOnInit() {
    this.getProduct();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    while (this.subscriptions.length > 0) {
      let sub = this.subscriptions.pop();
      sub!.unsubscribe();
    }
  }

  getProduct() {
    this.subscriptions.push(
      this.productService.getProduct(this.id)
        .subscribe(product => {
          this.product = product;
        })
    )
  }

}
