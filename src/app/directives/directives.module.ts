import { ModalDirective } from './directives/modal.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ModalDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalDirective
  ]
})
export class DirectivesModule { }
