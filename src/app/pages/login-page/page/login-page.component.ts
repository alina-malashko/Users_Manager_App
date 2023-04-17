import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public isLoading: boolean | undefined;

  public authFailed: boolean | undefined;

  public signInForm: FormGroup | undefined;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.authFailed = false;
    this.initForm();
  }

  private initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public signIn(): void {
    this.isLoading = true;
    this.authService.signIn(this.signInForm?.value.email, this.signInForm?.value.password)
    .subscribe({
      next: () => this.isLoading = false,
      error: () => {
        this.isLoading = false;
        this.authFailed = true;
      }
    })
  }
}
