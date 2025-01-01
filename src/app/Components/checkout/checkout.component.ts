import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../Services/form.service';
import {CountryModel} from '../../Models/country.model';
import {StateModel} from '../../Models/state.model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
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
  states : {"shippingAddress": StateModel[], "billingAddress": StateModel[]} = {};


  constructor(public formBuilder: FormBuilder, public formService: FormService) {
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
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        country: [''],
        streetAddress: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({
        country: [''],
        streetAddress: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        cardholderName: [''],
        cardNumber: [''],
        secCode: [''],
        expMonth: [''],
        expYear: [''],
      })
    })
  }

  submitForm() {
    console.log(this.checkoutForm.value);
  }

  setBillingSameAsShipping() {
    if(this.billingSameAsShipping.value){
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

}
