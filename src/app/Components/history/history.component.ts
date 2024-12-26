import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }

}
