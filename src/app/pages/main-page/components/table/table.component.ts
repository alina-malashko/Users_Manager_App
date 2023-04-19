import { UserLocation, UserName } from './../../../../interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ColDef, SelectionChangedEvent, ValueFormatterParams } from 'ag-grid-community';
import { User } from 'src/app/interfaces/user.interface';
import { AppPath } from 'src/app/enums/routing-path-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() users: User[] | undefined;

  public columnDefs: ColDef[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initColumns();
  }

  private initColumns(): void {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        sortable: true,
        comparator: (valueA: UserName, valueB: UserName) => {
          let a = valueA.first;
          let b = valueB.first;
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
        comparator: (valueA: UserLocation, valueB: UserLocation) => {
          let a = valueA.city;
          let b = valueB.city;
          return a.localeCompare(b) - b.localeCompare(a);
        },
        valueFormatter: (params: ValueFormatterParams) => {
          return Object.values(params.data.location).join(', ');
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
        valueFormatter: (params: ValueFormatterParams) => {
          return new Date(params.data.birth).toDateString().split(' ').splice(1, 3).join(' ');
        }
      },
      {
        field: 'registered',
        maxWidth: 130,
        sortable: true,
        valueFormatter: (params: ValueFormatterParams) => {
          return new Date(params.data.registered).toDateString().split(' ').splice(1).join(' ');
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

  public onSelectionChanged(event: SelectionChangedEvent) {
    const rowData = event.api.getSelectedNodes();
    this.router.navigate([AppPath.EditPageFullPath + rowData[0].data.id]);
  }
}
