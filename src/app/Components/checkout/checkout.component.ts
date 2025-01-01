import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../Services/form.service';
import {CountryModel} from '../../Models/country.model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: any;
  billingSameAsShipping: FormControl;
  ccMonths: number[];
  ccYears: number[];
  countries: CountryModel[] = [];


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
    this.billingSameAsShipping.value ?
      this.checkoutForm.patchValue({billingAddress: this.checkoutForm.value.shippingAddress}) :
      this.checkoutForm.get("billingAddress").reset();
  }

  handleMonthsAndYears() {
    let startMonth = 1;
    let selectedYear = this.checkoutForm.get("creditCard").value.expYear;
    if (selectedYear == new Date().getFullYear()) {
      startMonth = new Date().getMonth() + 1;
    }
      this.ccMonths = this.formService.getCreditCardMonths(startMonth);
  }

  getCountries(){
    this.formService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }

}
