import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ServiceProviderTypes } from '../../models/ServiceProviderTypes';
import { ServiceProviderTypesService } from '../../services/serviceProvider-types/service-provider-types.service';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';


@Component({
  selector: 'app-service-providers-types',
  standalone: false,
  templateUrl: './service-providers-types.component.html',
  styleUrl: './service-providers-types.component.css',
})
export class ServiceProvidersTypesComponent implements OnInit {
  ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;
  rows: ServiceProviderTypes[] = [];
  private gridApi!: GridApi;

  columnDefs: ColDef<ServiceProviderTypes>[] = [
    {
      field: 'ServiceProvideCode',
      headerName: 'Code',
      flex: 1,
      minWidth: 90,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'Description',
      headerName: 'Description',
      flex: 2,
      minWidth: 200,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      flex: 1,
      minWidth: 90,
      cellRenderer: 'activeToggleRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
    },

    {
      headerName: 'Delete',
      // field: 'isDeleted',
      flex: 1,
      minWidth: 150,
      cellRenderer: 'softDeleteRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => this.softDelete(params.data),
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  constructor(private spSvc: ServiceProviderTypesService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.spSvc.getAll().subscribe((data) => (this.rows = data));
  }

  onGridReady(e: GridReadyEvent) {
    this.gridApi = e.api;
    this.onFitColumns();
  }

  onFitColumns() {
    this.gridApi?.sizeColumnsToFit();
  }

  softDelete(row: ServiceProviderTypes): void {
    // Remove from UI
    this.rows = this.rows.filter(
      r => r.ServiceProvideCode !== row.ServiceProvideCode
    );
    this.rows = [...this.rows]; // trigger Angular UI update

    // Show success toast
    this.snackbarService.showSuccess('Removed successfully');

    // Soft delete API call
    this.spSvc.softDeleteServiceProviderType(row.ServiceProviderId).subscribe({
      next: () => {
        // Optional: add refresh logic
      },
      // error: () => {
      //   this.snackbarService.showError('Soft delete failed');
      // }
    });
  }

}
