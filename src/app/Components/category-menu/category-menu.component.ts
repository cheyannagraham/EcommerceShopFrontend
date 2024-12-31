import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProductCategoryModel} from '../../Models/productCategory.model';
import {ProductCategoryService} from '../../Services/product-category.service';
import {Subscription} from 'rxjs';
import {SubscriptionManagementService} from '../../Services/subscription-management.service';

@Component({
  selector: 'app-category-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent {

  categories: ProductCategoryModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private productCategoryService: ProductCategoryService, public subService: SubscriptionManagementService) {
  }

  ngOnInit() {
    this.getProductCategories();
  }

  ngOnDestroy() {
    this.subService.unSubscribe(this.subscriptions);
  }

  getProductCategories() {
    this.subscriptions.push(this.productCategoryService.getProductCategories()
      .subscribe(result => {
        this.categories = result;
      }));
  }
}
