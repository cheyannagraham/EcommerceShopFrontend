export class CountryModel {
  constructor(public id: number,
              public name: string,
              public code: string) {
  }
}

export interface CountryListResponse {
  _embedded: {
    countries: CountryModel[]
  }
}
