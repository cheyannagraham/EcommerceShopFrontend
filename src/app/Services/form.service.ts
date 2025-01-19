import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {CountryListResponse} from '../Models/country.model';
import {StateListResponse} from '../Models/state.model';
import {ApiService} from './api-service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly baseUrl;

  constructor(private httpClient: HttpClient,
              private apiService: ApiService) {
    this.baseUrl = this.apiService.baseURL;
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
    return this.httpClient.get<CountryListResponse>(this.baseUrl + "/countries")
      .pipe(map(response => response._embedded.countries));
  }

  getStates(countryId:number) {
    return this.httpClient.get<StateListResponse>(this.baseUrl + `/states/search/findAllByCountryId?countryId=${countryId}`)
      .pipe(map(response => response._embedded.states));
  }


}


