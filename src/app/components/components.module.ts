import { InputFileComponent } from './input-file/input-file.component';
import { LogoutComponent } from './logout/logout.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { LinkComponent } from './link/link.component';
import { LoaderComponent } from './loader/loader.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/components/input/input.component';

const components = [
  InputComponent,
  InputErrorComponent,
  ButtonComponent,
  LoaderComponent,
  LinkComponent,
  LogoutComponent,
  InputFileComponent
];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: components
})
export class ComponentsModule { }
