import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  private messages = {
    required: 'This field is required.',
    email: 'Please type a valid email.',
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signupForm)
    const {email, password} = this.signupForm.value;
    this.authService.signUp(email, password)
      .catch(error => {
        console.log(error);
        const { code, message } = error;
        if (code.indexOf('email') > 0) {
          this.signupForm.get('email').setErrors({ [code]: message });
        }
        if (code.indexOf('password') > 0) {
          this.signupForm.get('password').setErrors({ [code]: message });
        }
      });
  }

  getFormControlError(formControlName: string) {
    const errors = this.signupForm.get(formControlName).errors;
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
