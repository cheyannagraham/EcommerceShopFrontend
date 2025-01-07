import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../Services/form.service';
import {CountryModel} from '../../Models/country.model';
import {StateModel} from '../../Models/state.model';
import {noWhitespace} from '../../Validators/FormValidator';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../Services/user.service';

// @ts-ignore
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  billingSameAsShipping: FormControl;
  ccMonths: number[];
  ccYears: number[];
  countries: CountryModel[] = [];
  // @ts-ignore
  states: { "shippingAddress": StateModel[], "billingAddress": StateModel[] } = {};


  constructor(public formBuilder: FormBuilder,
              public formService: FormService,
              public userService: UserService,
              public router: Router) {
    this.billingSameAsShipping = new FormControl("");
    this.ccMonths = this.formService.getCreditCardMonths();
    this.ccYears = this.formService.getCreditCardYears();
  }

  ngOnInit() {
    this.createForm();
    this.getCountries();
  }

  createForm() {
    this.checkoutForm = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      }),

      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        streetAddress: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()])
      }),

      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        streetAddress: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()])
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        cardholderName: new FormControl('', [Validators.required, Validators.minLength(2), noWhitespace()]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        secCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expMonth: new FormControl('', [Validators.required]),
        expYear: new FormControl('', [Validators.required]),
      })
    });
  }

  submitForm() {
    if (this.checkoutForm.invalid) this.checkoutForm.markAllAsTouched();
    else {
      console.log("FORM SUBMITTED: ", this.checkoutForm.value);
      this.userService.updateUserFormData(this.checkoutForm.value);
      this.router.navigateByUrl("/reviewOrder");
    }
  }

  setBillingSameAsShipping() {
    if (this.billingSameAsShipping.value) {
      this.states.billingAddress = this.states.shippingAddress;
      this.checkoutForm.patchValue({billingAddress: this.checkoutForm.value.shippingAddress});
    } else this.checkoutForm.get("billingAddress")!.reset();
  }

  handleMonthsAndYears() {
    let startMonth = 1;
    let selectedYear = this.checkoutForm.get("creditCard")!.value.expYear;
    if (selectedYear == new Date().getFullYear()) {
      startMonth = new Date().getMonth() + 1;
    }
    this.ccMonths = this.formService.getCreditCardMonths(startMonth);
  }

  getCountries() {
    this.formService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }

  getCountryStates(formGroup: string) {
    let country = this.checkoutForm.get(formGroup)!.value.country;
    this.formService.getStates(country).subscribe(states => {
      // @ts-ignore
      this.states[formGroup] = states;
    })
  }

  get firstName() {
    return this.checkoutForm.get("customer.firstName");
  }

  get lastName() {
    return this.checkoutForm.get("customer.lastName");
  }

  get email() {
    return this.checkoutForm.get("customer.email");
  }

  get shippingStreet() {
    return this.checkoutForm.get("shippingAddress.streetAddress");
  }

  get shippingCity() {
    return this.checkoutForm.get("shippingAddress.city");
  }

  get shippingState() {
    return this.checkoutForm.get("shippingAddress.state");
  }

  get shippingCountry() {
    return this.checkoutForm.get("shippingAddress.country");
  }

  get shippingZip() {
    return this.checkoutForm.get("shippingAddress.zipCode");
  }

  get billingStreet() {
    return this.checkoutForm.get("billingAddress.streetAddress");
  }

  get billingCity() {
    return this.checkoutForm.get("billingAddress.city");
  }

  get billingState() {
    return this.checkoutForm.get("billingAddress.state");
  }

  get billingCountry() {
    return this.checkoutForm.get("billingAddress.country");
  }

  get billingZip() {
    return this.checkoutForm.get("billingAddress.zipCode");
  }

  get cardType() {
    return this.checkoutForm.get("creditCard.cardType");
  }

  get cardNumber() {
    return this.checkoutForm.get("creditCard.cardNumber");
  }

  get cardholderName() {
    return this.checkoutForm.get("creditCard.cardholderName");
  }

  get secCode() {
    return this.checkoutForm.get("creditCard.secCode");
  }

  get expMonth() {
    return this.checkoutForm.get("creditCard.expMonth");
  }

  get expYear() {
    return this.checkoutForm.get("creditCard.expYear");
  }
}
