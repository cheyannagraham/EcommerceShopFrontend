import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProductCategoryModel} from '../../Models/productCategory.model';
import {ProductCategoryService} from '../../Services/product-category.service';

@Component({
  selector: 'app-category-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent {

  categories: ProductCategoryModel[] = [];

  constructor(private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
    this.getProductCategories();
  }

  getProductCategories() {
    this.productCategoryService.getProductCategories()
      .subscribe(result => {
        this.categories = result;
      });
  }
}
