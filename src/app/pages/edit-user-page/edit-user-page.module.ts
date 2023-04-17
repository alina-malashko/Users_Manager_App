import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserPageComponent } from './page/edit-user-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserPageRoutingModule } from './edit-user-page-routing.module';
import { LinkBackComponent } from './components/link-back/link-back.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';


@NgModule({
  declarations: [
    EditUserPageComponent,
    LinkBackComponent,
    DeleteButtonComponent,
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    EditUserPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    EditUserPageComponent
  ]
})
export class EditUserPageModule { }
