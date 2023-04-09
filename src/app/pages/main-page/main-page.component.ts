import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLoading = true;

  users: any = [];

  columns = ['Name', 'Location', 'Email', 'Date of birth', 'Phone', 'Photo', 'Nationality'];

  constructor(private authService: AuthService, private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe({next: data => {
      this.users = data.results;
      this.isLoading = false;
    }});
  }

  signOut() {
    this.authService.signOut();
  }
}
