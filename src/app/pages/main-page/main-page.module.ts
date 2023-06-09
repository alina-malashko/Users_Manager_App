import { DirectivesModule } from './../../directives/directives.module';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ComponentsModule } from './../../components/components.module';
import { MainPageComponent } from './page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { TableComponent } from './components/table/table.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AddPopupComponent } from './components/add-popup/add-popup.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MainPageComponent,
    TableComponent,
    SearchFormComponent,
    AddButtonComponent,
    AddPopupComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    MainPageRoutingModule,
    DirectivesModule,
    InfiniteScrollModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
