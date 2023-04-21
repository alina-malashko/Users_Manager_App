import { AppPath } from 'src/app/enums/routing-path-enum';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  public isLoading: boolean | undefined;

  public searchParam: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParam) => this.searchParam = queryParam['search']
    )
    this.isLoading = false;
  }

  public search(): void {
    this.isLoading = true;
    this.router.navigate(
      [AppPath.MainFullPath], { queryParams: { search: this.searchParam }}
    );
    this.isLoading = false;
  }

  public onKeyDownEvent(event: KeyboardEvent){
    if (event.key === 'Enter') this.search();
  }
}
