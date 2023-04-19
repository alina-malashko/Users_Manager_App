import { GetUsers, LoadingOffUsers } from '../../../store/actions/users.action';
import { Store } from '@ngrx/store';
import { User } from '../../../interfaces/user.interface';
import { UsersService } from '../../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { selectIsLoadingUsers, selectUsers } from 'src/app/store/selectors/users.selector';
import { ModalDirective } from 'src/app/directives/modal.directive';
import { AddPopupComponent } from '../components/add-popup/add-popup.component';

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

  constructor(
    private usersService: UsersService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    let users = localStorage.getItem('users');
    if (users) {
      this.store.select(selectUsers).subscribe((value) => this.users = value);
      this.store.select(selectIsLoadingUsers).subscribe((value) => this.isLoading = value)
    } else {
      this.usersService.getUsers().subscribe({
        next: data => {
          this.store.dispatch(GetUsers({data: data}));
          this.store.dispatch(LoadingOffUsers());
          this.store.select(selectUsers).subscribe((value) => this.users = value);
          this.store.select(selectIsLoadingUsers).subscribe((value) => this.isLoading = value)
        },
        error: () => {
          this.errorMessage = true;
          this.isLoading = false;
        }
    });
    }
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
