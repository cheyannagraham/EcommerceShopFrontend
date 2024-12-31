import {Component} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm: any;
  billingSameAsShipping: FormControl;

  constructor(public formBuilder: FormBuilder) {
    this.billingSameAsShipping = new FormControl("");
  }

  ngOnInit() {
    this.createForm();
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

}
