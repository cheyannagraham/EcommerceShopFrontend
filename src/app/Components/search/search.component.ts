import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CartStatusComponent} from '../cart-status/cart-status.component';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, FormsModule, CartStatusComponent, FaIconComponent],
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
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
}
