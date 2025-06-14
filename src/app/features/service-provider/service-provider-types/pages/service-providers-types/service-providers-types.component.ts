import { Component, OnInit } from '@angular/core';
import { ColDef, GetContextMenuItems, GetContextMenuItemsParams, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ServiceProviderTypes } from '../../models/ServiceProviderTypes';
import { ServiceProviderTypesService } from '../../services/serviceProvider-types/service-provider-types.service';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Store } from '@ngxs/store';


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
      editable: true,
      flex: 1,
      minWidth: 90,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) =>
        params.value ? params.value : 'Enter Code',
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
    },
    {
      field: 'Description',
      headerName: 'Description',
      editable: true,
      flex: 2,
      minWidth: 200,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) =>
        params.value ? params.value : 'Enter Description',
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
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
    private snackbarService: SnackbarService, private store: Store,) { }

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

  addRow(): void {
    const newRow: ServiceProviderTypes = {
      ServiceProviderId: 0,
      ServiceProvideCode: '',
      Description: '',
      IsActive: true,
      IsDeleted: false,
    };

    // Push to `rows` and trigger Angular change detection
    this.rows = [newRow, ...this.rows];

    // Let Angular render the new row, then start editing
    setTimeout(() => {
      if (this.gridApi) {
        this.gridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'ServiceProvideCode',
        });
      }
    }, 50);
  }

  getContextMenuItems: GetContextMenuItems = (
    params: GetContextMenuItemsParams
  ) => {
    const addRow = {
      name: 'Add Row',
      action: () => this.addRow(),
      icon: '<i class="fas fa-plus"></i>',
    };

    const deleteRow = {
      name: 'Delete Row',
      action: () => {
        if (params.node) {
          this.softDelete(params.node.data);
        }
      },
      icon: '<i class="fas fa-trash"></i>',
    };

    return [addRow, deleteRow, 'separator', 'copy', 'export'];
  };

  getRowClass = (params: any): string => {
    const row = params.data;
    if (row?.IsDeleted) return 'row-deleted';
    return '';
  };

}
