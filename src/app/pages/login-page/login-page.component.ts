import { Component } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  isLoading = false;

  authFailed = false;

  signInForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService) {}

  signIn() {
    this.isLoading = true;
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password)
    .catch(() => {
      this.authFailed = true;
    })
    .then(() => {
      this.isLoading = false;
    })
  }
}
