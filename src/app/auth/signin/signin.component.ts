import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  private messages = {
    required: 'This field is required.',
    email: 'Please type a valid email.',
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signinForm)
    const {email, password} = this.signinForm.value;
    this.authService.signIn(email, password)
      .catch(error => {
        const { code, message } = error;
        this.signinForm.setErrors({ [code]: message });
      });
  }

  getFormControlError(formControlName: string) {
    const errors = this.signinForm.get(formControlName).errors;
    if (!errors) {
      return [];
    }

    const messages = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (this.messages[key]) {
          messages.push(this.messages[key]);
        } else {
          messages.push(errors[key]);
        }
      }
    }
    return messages;
  }

  getFormErrors() {
    const errors = this.signinForm.errors;
    if (!errors) {
      return [];
    }

    const messages = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (this.messages[key]) {
          messages.push(this.messages[key]);
        } else {
          messages.push(errors[key]);
        }
      }
    }
    return messages;
  }

}
