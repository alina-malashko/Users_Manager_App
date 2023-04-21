import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPath } from 'src/app/enums/routing-path-enum';
import { DeleteUser } from 'src/app/store/actions/users.action';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  @Input() id: string | null | undefined;

  @Output() toggleDeletePopUp = new EventEmitter<null>();

  public isLoading: boolean | undefined;

  constructor(
    private readonly store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  public togglePopUp(): void {
    this.toggleDeletePopUp.emit();
  }

  public deleteUser(): void {
    this.isLoading = true;
    if (this.id) this.store.dispatch(DeleteUser({data: Number(this.id)}));
    this.router.navigate([AppPath.MainFullPath]);
  }
}
