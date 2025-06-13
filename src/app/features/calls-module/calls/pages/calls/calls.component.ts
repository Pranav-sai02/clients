import { Component, OnInit } from '@angular/core';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { Call } from '../../models/Call';
import { CallsService } from '../../services/call-services/calls.service';
import { Router } from '@angular/router';
import { ICellRendererParams, CellClickedEvent } from 'ag-grid-community';
import { CallDataService } from '../../services/call-data-service/call-data.service';

@Component({
  selector: 'app-calls',
  standalone: false,
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css',
})
export class CallsComponent implements OnInit {
  ActiveToggleRendererComponent = ActiveToggleRendererComponent;

  call: Call[] = [];
  gridApi!: GridApi;

  columnDefs: ColDef<Call>[] = [
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'caseRef',
      headerName: 'Case Ref Number',
      filter: 'agTextColumnFilter',
      minWidth: 200,
      flex: 1,
      cellRenderer: (params: ICellRendererParams) =>
        `<a style="color:blue;cursor:pointer;text-decoration:underline;">${params.value}</a>`,
      onCellClicked: (event: CellClickedEvent) => {
        const call = event.data;

        this.callDataService.setSelectedCall(call);

        const queryParams = {
          callRef: call.caseRef,
          callerName: `${call.callerFirstName} ${call.callerLastName}`,
          client: call.client,
        };

        this.router.navigate(['/cases/case-details'], { queryParams });
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'caseNo',
      headerName: 'Case Number ',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'caseDate',
      headerName: 'Case Date',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 2,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'callerName',
      headerName: 'Caller Name',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'deceasedName',
      headerName: 'Deceasced Name',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'client',
      headerName: 'Client',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'type',
      headerName: 'Type',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'funeralDate',
      headerName: 'Funeral Date',
      filter: 'agTextColumnFilter',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
  ];

  defaultColDef: ColDef = { sortable: true, filter: true, resizable: true };

  constructor(
    private callService: CallsService,
    private router: Router,
    private callDataService: CallDataService
  ) { }

  /* === lifecycle === */
  ngOnInit(): void {
    this.loadUsers();
  }

  resizeGrid(): void {
    if (this.gridApi) {
      setTimeout(() => this.gridApi.sizeColumnsToFit(), 100);
    }
  }

  loadUsers(): void {
    this.callService.getUsers().subscribe((data) => {
      this.call = data;
      this.resizeGrid();
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.resizeGrid();
  }

  onCellClicked(event: any): void {
    const call: Call = event.data;

    this.callDataService.setSelectedCall(call);

    const queryParams = {
      callRef: call.caseRef,
      callerName: `${call.callerFirstName} ${call.callerLastName}`,
      client: call.client,
    };

    this.router.navigate(['/cases/case-details'], { queryParams });
  }

  onFitColumns(): void {
    this.gridApi?.sizeColumnsToFit();
  }

  onGridSizeChanged(event: any): void {
    this.onFitColumns();
  }
}
