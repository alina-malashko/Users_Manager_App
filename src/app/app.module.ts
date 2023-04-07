import { AuthService } from './shared/services/auth.service';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { InputComponent } from './shared/components/input/input.component';
import { InputErrorComponent } from './shared/components/input-error/input-error.component';
import { FormControlPipe } from './shared/pipes/form-control.pipe';
import { ButtonComponent } from './shared/components/button/button.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    InputComponent,
    InputErrorComponent,
    FormControlPipe,
    ButtonComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
