import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPath } from 'src/app/enums/routing-path-enum';
import { User } from 'src/app/interfaces/user.interface';
import { EditUser } from 'src/app/store/actions/users.action';
import { selectUsers } from 'src/app/store/selectors/users.selector';
import { DeletePopupComponent } from '../components/delete-popup/delete-popup.component';
import { ModalDirective } from 'src/app/directives/directives/modal.directive';

@Component({
  selector: 'app-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  @ViewChild(ModalDirective) modalHost!: ModalDirective;

  public id: string | null | undefined;

  public isLoading: boolean | undefined;

  public editForm: FormGroup | undefined;

  public deletePopUpIsOpened: boolean | undefined;

  public userInfo: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isLoading = false;
    this.deletePopUpIsOpened = false;
    this.store.select(selectUsers).subscribe((value) => this.userInfo = value.find(user => user.id == this.id));
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.formBuilder.group({
      name: this.formBuilder.group({
        title: [this.userInfo?.name.title, Validators.required],
        first: [this.userInfo?.name.first, Validators.required],
        last: [this.userInfo?.name.last, Validators.required],
      }),
      location: this.formBuilder.group({
        city: [this.userInfo?.location.city, Validators.required],
        country: [this.userInfo?.location.country, Validators.required],
      }),
      email: [this.userInfo?.email, [Validators.required, Validators.email]],
      birth: [this.userInfo?.birth, Validators.required],
      registered: [{value: this.userInfo?.registered, disabled: true}],
      phone: [this.userInfo?.phone, Validators.required],
      picture: [this.userInfo?.picture, [Validators.required]],
      nationality: [this.userInfo?.nationality, Validators.required]
    })
  }

  public saveUser(): void {
    this.isLoading = true;
    const editedUser = {
      id: this.userInfo?.id,
      ...this.editForm?.getRawValue()
    }
    this.store.dispatch(EditUser({data: editedUser}));
    this.isLoading = false;
    this.router.navigate([AppPath.MainFullPath]);
  }

  public toggleDeletePopUp(): void {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(DeletePopupComponent);
    componentRef.instance.id = this.id;
    componentRef.instance.toggleDeletePopUp.subscribe(() => {
      this.modalHost.viewContainerRef.clear();
    })
  }
}
