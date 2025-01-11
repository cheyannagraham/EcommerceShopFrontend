export class Address {

  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public country: string;

  constructor({streetAddress, city, state, zipCode, country}:any){
    this.street = streetAddress;
    this.city = city;
    this.state = state.name;
    this.zipCode = zipCode;
    this.country = country.name;

  }
}
