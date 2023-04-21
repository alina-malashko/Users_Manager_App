import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserPageComponent } from './page/edit-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditUserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserPageRoutingModule { }
