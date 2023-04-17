import { LoadUserInfo } from './../../../../store/actions';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, SelectionChangedEvent, ValueFormatterParams } from 'ag-grid-community';
import { User } from 'src/app/interfaces/user.interface';
import { AppPath } from 'src/app/enums/routing-path-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() users: User[] | undefined

  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(
    private readonly store: Store,
    private router: Router
  ) {}

  private sortDates(valueA: string, valueB: string): number {
    const a = Number(valueA.split(' ').splice(2));
    const b = Number(valueB.split(' ').splice(2));
    return a - b;
  }

  public onSelectionChanged(event: SelectionChangedEvent) {
    const rowData = event.api.getSelectedNodes();
    this.store.dispatch(LoadUserInfo({data: rowData[0].data}));
    this.router.navigate([AppPath.EditPageFullPath]);
  }

  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      comparator: (valueA: string, valueB: string) => {
        let a = valueA.split(' ').splice(1).join(' ');
        let b = valueB.split(' ').splice(1).join(' ');
        return a.localeCompare(b) - b.localeCompare(a);
      },
      valueFormatter: (params: ValueFormatterParams) => {
        return Object.values(params.data.name).join(' ');
      }
    },
    {
      field: 'location',
      sortable: true,
      minWidth: 270,
      valueFormatter: (params: ValueFormatterParams) => {
        return Object.values(params.data.location).join(', ')
      }
    },
    {
      field: 'email',
      minWidth: 300,
      sortable: true,
    },
    {
      headerName: 'Date of birth',
      field: 'birth',
      maxWidth: 130,
      sortable: true,
      comparator: this.sortDates,
      valueFormatter: (params: ValueFormatterParams) => {
        return new Date(params.data.registered).toDateString().split(' ').splice(1).join(' ')
      }
    },
    {
      field: 'registered',
      maxWidth: 130,
      sortable: true,
      comparator: this.sortDates,
      valueFormatter: (params: ValueFormatterParams) => {
        return new Date(params.data.birth).toDateString().split(' ').splice(1).join(' ')
      }
    },
    {
      field: 'phone',
      maxWidth: 150,
      sortable: true,
    },
    {
      field: 'picture',
      cellRenderer: (params: any) => {
        return `<a href="${params.data.picture}" title="image">link</a>`;
      },
      maxWidth: 100,
    },
    {
      field: 'nationality',
      maxWidth: 110,
      sortable: true,
    }
  ]
}
