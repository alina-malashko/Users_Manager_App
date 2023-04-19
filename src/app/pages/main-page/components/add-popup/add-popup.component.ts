import { URL_PATTERN } from './../../../../constants/pattern.constants';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from 'src/app/store/actions/users.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit {

  @Output() toggleAddPopUp = new EventEmitter<null>();

  public isLoading: boolean | undefined;

  public newUserForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.initForm();
  }

  private initForm(): void {
    this.newUserForm = this.formBuilder.group({
      name: this.formBuilder.group({
        title: ['', Validators.required],
        first: ['', Validators.required],
        last: ['', Validators.required],
      }),
      location: this.formBuilder.group({
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      birth: ['', Validators.required],
      registered: [{value: new Date(), disabled: true}],
      phone: ['', Validators.required],
      picture: ['', [Validators.required, Validators.pattern(URL_PATTERN)]],
      nationality: ['', Validators.required]
    })
  }

  public togglePopUp(): void {
    this.toggleAddPopUp.emit();
  }

  public saveUser(): void {
    this.isLoading = true;
    this.store.dispatch(AddUser({data: this.newUserForm?.getRawValue()}))
    this.isLoading = false;
    this.togglePopUp();
  }
}
