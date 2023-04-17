import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { EditUser } from 'src/app/store/actions';

@Component({
  selector: 'app-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  public isLoading: boolean | undefined;

  public editForm: FormGroup | undefined;

  public deletePopUpIsOpened: boolean | undefined;

  public userInfo: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.deletePopUpIsOpened = false;
    this.store.pipe(map((elem: any) => elem.users.userInfo)).subscribe((value) => this.userInfo = value);
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.formBuilder.group({
      title: [this.userInfo?.name.title, Validators.required],
      firstName: [this.userInfo?.name.first, Validators.required],
      lastName: [this.userInfo?.name.last, Validators.required],
      city: [this.userInfo?.location.city, Validators.required],
      country: [this.userInfo?.location.country, Validators.required],
      email: [this.userInfo?.email, [Validators.required, Validators.email]],
      birth: [this.userInfo?.birth, Validators.required],
      registered: [{value: this.userInfo?.registered, disabled: true}],
      phone: [this.userInfo?.phone, Validators.required],
      picture: [this.userInfo?.picture, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      nationality: [this.userInfo?.nationality, Validators.required]
    })
  }

  public saveUser(): void {
    if (this.userInfo) {
      const editedUser = {
        id: this.userInfo.id,
        name: {
          title: this.editForm?.controls['title'].value,
          first: this.editForm?.controls['firstName'].value,
          last: this.editForm?.controls['lastName'].value,
        },
        location: {
          city: this.editForm?.controls['city'].value,
          country: this.editForm?.controls['country'].value,
        },
        email: this.editForm?.controls['email'].value,
        birth: this.editForm?.controls['birth'].value,
        registered: this.editForm?.controls['registered'].value,
        phone: this.editForm?.controls['phone'].value,
        picture: this.editForm?.controls['picture'].value,
        nationality: this.editForm?.controls['nationality'].value,
      }
      this.store.dispatch(EditUser({data: editedUser}));
    }
  }

  public toggleDeletePopUp(): void {
    this.deletePopUpIsOpened = !this.deletePopUpIsOpened;
  }
}
