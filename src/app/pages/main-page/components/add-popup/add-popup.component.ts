import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AddUser } from 'src/app/store/actions';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit {

  @Output() toggleAddPopUp = new EventEmitter<null>();

  public isLoading: boolean | undefined;

  public newUserForm: FormGroup | undefined;

  public newId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.store.pipe(map((elem: any) => elem.users.users)).subscribe((value) => this.newId = value.length + 1);
    this.initForm();
  }

  private initForm(): void {
    this.newUserForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birth: ['', Validators.required],
      registered: [{value: new Date(), disabled: true}],
      phone: ['', Validators.required],
      picture: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      nationality: ['', Validators.required]
    })
  }

  public togglePopUp(): void {
    this.toggleAddPopUp.emit();
  }

  public saveUser(): void {
    this.isLoading = true;
    if (this.newUserForm && this.newId) {
      const newUser = {
        id: this.newId,
        name: {
          title: this.newUserForm?.controls['title'].value,
          first: this.newUserForm?.controls['firstName'].value,
          last: this.newUserForm?.controls['lastName'].value,
        },
        location: {
          city: this.newUserForm?.controls['city'].value,
          country: this.newUserForm?.controls['country'].value,
        },
        email: this.newUserForm?.controls['email'].value,
        birth: this.newUserForm?.controls['birth'].value,
        registered: this.newUserForm?.controls['registered'].value,
        phone: this.newUserForm?.controls['phone'].value,
        picture: this.newUserForm?.controls['picture'].value,
        nationality: this.newUserForm?.controls['nationality'].value,
      }
      this.store.dispatch(AddUser({data: newUser}))
      this.isLoading = false;
      this.togglePopUp();
    }
  }
}
