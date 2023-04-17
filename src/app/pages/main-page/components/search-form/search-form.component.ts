import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  public isLoading: boolean | undefined;

  public searchForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
    })
  }

  public search(): void {

  }
}
