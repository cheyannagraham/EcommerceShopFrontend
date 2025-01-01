import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {CountryListResponse} from '../Models/country.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) {
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

  getCountries(){
    return this.httpClient.get<CountryListResponse>("http://localhost:8080/api/countries")
      .pipe(map(response => response._embedded.countries));
  }
}


