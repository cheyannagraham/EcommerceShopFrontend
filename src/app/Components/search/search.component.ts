import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchControl = new FormControl();
  constructor(private router:Router) {
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.searchProducts(this.searchControl.value);
  }

  searchProducts(keyword: string)  {
    this.router.navigateByUrl(`/products/search/${keyword}`);

  }
}
