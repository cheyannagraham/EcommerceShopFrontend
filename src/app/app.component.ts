import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {CategoryMenuComponent} from './Components/category-menu/category-menu.component';
import {SearchComponent} from './Components/search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoryMenuComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
