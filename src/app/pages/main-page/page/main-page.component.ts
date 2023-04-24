import { LoadingOnUsers } from './../../../store/actions/users.action';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { selectIsLoadingUsers, selectUsers, selectUsersError } from 'src/app/store/selectors/users.selector';
import { ModalDirective } from 'src/app/directives/directives/modal.directive';
import { AddPopupComponent } from '../components/add-popup/add-popup.component';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @ViewChild(ModalDirective) modalHost!: ModalDirective;

  public isLoading: boolean = true;

  public users: User[] | undefined;

  public errorMessage: boolean = false;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe((value) => this.users = value);
    this.store.select(selectIsLoadingUsers).subscribe((value) => this.isLoading = value);
    this.store.select(selectUsersError).subscribe((value) => this.errorMessage = value);
    const users = localStorage.getItem('users');
    if (!users || JSON.parse(users).users.length === 0) {
      this.store.dispatch(LoadingOnUsers());
    }
  }

  public onScroll(): void {
    this.store.dispatch(LoadingOnUsers());
  }

  public toggleAddPopUp(): void {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(AddPopupComponent);
    componentRef.instance.toggleAddPopUp.subscribe(() => {
      this.modalHost.viewContainerRef.clear();
    })
  }
}
