import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ActiveToggleRendererComponent } from '../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ClientService } from '../../services/client-service/client.service';
import { SnackbarService } from '../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  softDeleteRenderer = SoftDeleteButtonRendererComponent;

  /* === Class Members === */
  selectedUser: Client | null = null; // Reference to the selected client for popup
  editedUser: Client = {} as Client; // Detached copy for editing
  toggleOptions = false; // Flag to toggle options in popup
  saving = false; // Spinner flag for saving state
  users: Client[] = []; // Array to hold client data
  gridApi!: GridApi; // AG Grid API

  /* === AG-Grid Options === */
  gridOptions: GridOptions = {
    context: { componentParent: this },
    getRowId: (params) => params.data.id?.toString() ?? params.data.name, // Use 'name' as fallback if 'id' is unavailable
    pagination: true,
    paginationPageSize: 20,
    domLayout: 'autoHeight',
    animateRows: true,
    rowSelection: 'single',
    rowClassRules: {
      'temporary-row': (params) => params.data?.Name?.includes('(INACTIVE)'), // Highlight inactive rows
    },
    // rowClassRules: {
    //   'temporary-row': ({ data }) => data?.Name?.includes('(INACTIVE)'),
    // },
  };

  columnDefs: ColDef<Client>[] = [
    {
      field: 'ClientName', // Match field names with Client model
      headerName: 'Name',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
      sortable: true,
      filter: true,
    },
    {
      field: 'ClaimsManager',
      headerName: 'Claims Manager',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
      sortable: true,
      filter: true,
    },
    {
      field: 'ClientGroup',
      valueGetter: (params) => params.data?.ClientGroup?.Name ?? '',
      headerName: 'Group Name',
      minWidth: 230,
      flex: 2,
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
      sortable: true,
      filter: true,
    },
    {
      field: 'AreaCodes',
      valueGetter: (params) => params.data?.AreaCodes?.AreaCode ?? '',
      headerName: 'Area Code',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
      sortable: true,
      filter: true,
    },
    {
      field: 'Tel',
      headerName: 'Telephone',
      minWidth: 230,
      flex: 1,
      cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
      headerClass: 'bold-header',
      sortable: true,
      filter: true,
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      minWidth: 150,
      flex: 1,
      cellRenderer: 'activeToggleRenderer',
      cellRendererParams: { onChange: this.onActiveToggleChange.bind(this) },
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Delete',
      flex: 1,
      minWidth: 100,
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
  store: any;
  // softDeleteProvider(client: Client): void {
  //   const updatedClient = { ...client, isDeleted: true };
  //   // this.store.dispatch(new SoftDeleteAreaCode(updatedClient));
  // }

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Custom components for AG Grid
  components = {
    activeToggleRenderer: ActiveToggleRendererComponent,
  };

  constructor(private clientService: ClientService,private snackbarService: SnackbarService) { }

  /* === Lifecycle === */
  ngOnInit(): void {
    this.loadUsers();
  }

  /* === Grid Handlers === */
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.resizeGrid();
  }

  resizeGrid(): void {
    if (this.gridApi) {
      setTimeout(() => this.gridApi.sizeColumnsToFit(), 100);
    }
  }

  loadUsers(): void {
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.users = data;
        this.resizeGrid();
      },
      error: (err: any) => {
        console.error('Failed to load clients', err);
      },
    });
  }

  onExport(): void {
    this.gridApi.exportDataAsCsv({
      fileName: 'clients.csv',
      columnSeparator: ',',
      allColumns: true,
    });
  }

  /* === Popup Handlers === */
  openPopup(user: Client): void {
    this.selectedUser = user;
    this.editedUser = { ...user }; // Shallow copy for editing
    this.toggleOptions = false;
  }

  closePopup(): void {
    this.selectedUser = null;
    this.editedUser = {} as Client;
  }

  onActiveToggleChange(params: any): void {
    const updatedUser = params.data as Client;
    // this.saveUserToggleStatus(updatedUser);
    params.api.refreshCells({ rowNodes: [params.node], force: true });
  }

  clearField(field: keyof Client): void {
    if (field in this.editedUser) {
      (this.editedUser as any)[field] = '';
    }
  }
  softDelete(Client: Client): void {
    // Mark the item as deleted (optional if you want to preserve the flag)
    Client.IsDeleted = true;

    // Remove it from rowData
    this.users = this.users.filter(group => group.ClientId !== Client.ClientId);

    // Optionally update the grid manually if you want
    // this.gridApi.setRowData(this.rowData);

    this.snackbarService.showSuccess('Removed successfully');
  }
}
