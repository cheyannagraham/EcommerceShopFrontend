import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  ngOnInit() {
  }

  getCreditCardMonths(startMonth: number = 1) {
    let months = [];
    for(let i = startMonth; i <= 12; i++){
      months.push(i);
    }
    return months;
  }

  getCreditCardYears() {
    let currYear = new Date().getFullYear();
    let years = [];
    for (let i = currYear; i < currYear + 10; i++) {
      years.push(i);
    }
    return years;
  }
}
