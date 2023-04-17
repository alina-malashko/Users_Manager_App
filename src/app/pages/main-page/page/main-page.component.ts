import { map } from 'rxjs';
import { LoadUsers, LoadingOffUsers, LoadUserInfo } from './../../../store/actions';
import { Store } from '@ngrx/store';
import { User } from '../../../interfaces/user.interface';
import { UsersService } from '../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

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
      this.store.pipe(map((elem: any) => elem.users.users)).subscribe((value) => this.users = value);
      this.store.pipe(map((elem: any) => elem.users.isLoading)).subscribe((value) => this.isLoading = value);
    } else {
      this.usersService.getUsers().subscribe({
        next: data => {
          this.store.dispatch(LoadUsers({data: data}));
          this.store.dispatch(LoadUserInfo({data: null}));
          this.store.dispatch(LoadingOffUsers());
          this.store.pipe(map((elem: any) => elem.users.users)).subscribe((value) => this.users = value);
          this.store.pipe(map((elem: any) => elem.users.isLoading)).subscribe((value) => this.isLoading = value);
        },
        error: () => {
          this.errorMessage = true;
          this.isLoading = false;
        }
    });
    }
  }
}
