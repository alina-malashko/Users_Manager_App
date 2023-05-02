import { Component, EventEmitter, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from 'src/app/store/actions/users.action';
import { Store } from '@ngrx/store';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPopupComponent implements OnInit {

  @Output() toggleAddPopUp = new EventEmitter<null>();

  public isLoading: boolean | undefined;

  public newUserForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store,
    private helpersService: HelpersService
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
      registered: [{value: this.helpersService.formateDate(new Date().toDateString()), disabled: true}],
      phone: ['', Validators.required],
      picture: ['', Validators.required],
      nationality: ['', Validators.required]
    })
  }

  public togglePopUp(): void {
    this.toggleAddPopUp.emit();
  }

  public onChangeFile(base64: string | ArrayBuffer | null) {
    this.newUserForm?.patchValue({
      picture: base64
    })
  }

  public saveUser(): void {
    this.isLoading = true;
    this.store.dispatch(AddUser({data: {
      ...this.newUserForm?.getRawValue()
    }}))
    this.isLoading = false;
    this.togglePopUp();
  }
}
