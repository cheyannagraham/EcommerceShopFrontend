export class Customer {
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor({firstName, lastName, email}: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

}
