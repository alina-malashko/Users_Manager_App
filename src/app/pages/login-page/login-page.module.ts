import { LoginPageRoutingModule } from './login-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    LoginPageRoutingModule,
    FormsModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
