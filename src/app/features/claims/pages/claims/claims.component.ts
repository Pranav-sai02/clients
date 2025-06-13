import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Claim } from '../../models/Claim';
import { ClaimsService } from '../../services/claims.service';

@Component({
  selector: 'app-claims',
  standalone: false,
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.css',
})
export class ClaimsComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular; // Access AgGridAngular instance

  columnDefs: ColDef[] = [
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    { headerName: 'Progress', field: 'progress', sortable: true, filter: true },
    {
      headerName: 'Claim Ref #',
      field: 'claimRef',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Call Ref #',
      field: 'callRef',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Claim Date',
      field: 'claimDate',
      sortable: true,
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      headerName: 'Claimant',
      field: 'claimantName',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Deceased',
      field: 'deceasedName',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Policy',
      field: 'policyNumber',
      sortable: true,
      filter: true,
    },
  ];

  rowData: Claim[] = [];
  gridApi!: GridApi;
  gridOptions: GridOptions = {};

  constructor(private claimService: ClaimsService) {}

  ngOnInit(): void {
    this.claimService.getClaims().subscribe((data) => {
      this.rowData = data;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    console.log('AG Grid is ready', params);
  }

  onExport(): void {
    this.gridApi.exportDataAsCsv({
      fileName: 'claims.csv',
      columnSeparator: ',',
      allColumns: true,
    });
  }
}
