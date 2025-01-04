import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../Services/form.service';
import {CountryModel} from '../../Models/country.model';
import {StateModel} from '../../Models/state.model';
import {noWhitespace} from '../../Validators/FormValidator';

// @ts-ignore
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
        firstName: new FormControl('',[Validators.required, Validators.minLength(2), noWhitespace()]),
        lastName: new FormControl('',[Validators.required, Validators.minLength(2), noWhitespace()]),
        email: new FormControl('',[Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      }),

      shippingAddress: this.formBuilder.group({
        country: new FormControl('',[]),
        streetAddress: new FormControl('',[]),
        city: new FormControl('',[]),
        state: new FormControl('',[]),
        zipCode: new FormControl('',[])
      }),

      billingAddress: this.formBuilder.group({
        country: new FormControl('',[]),
        streetAddress: new FormControl('',[]),
        city: new FormControl('',[]),
        state: new FormControl('',[]),
        zipCode: new FormControl('',[])
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[]),
        cardholderName: new FormControl('',[]),
        cardNumber: new FormControl('',[]),
        secCode: new FormControl('',[]),
        expMonth: new FormControl('',[]),
        expYear: new FormControl('',[]),
      })
    })
  }

  submitForm() {
    if(this.checkoutForm.invalid) this.checkoutForm.markAllAsTouched();
    else console.log("FORM SUBMITTED: ",this.checkoutForm.value);
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

  get firstName(){ return this.checkoutForm.get("customer.firstName");}
  get lastName(){ return this.checkoutForm.get("customer.lastName");}
  get email() { return this.checkoutForm.get("customer.email");}

}
