import { Component } from '@angular/core';
import { ServiceProviders } from '../../models/ServiceProviders';
import { ServicProvidersService } from '../../services/service-providers/servic-providers.service';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-service-providers',
  standalone: false,
  templateUrl: './service-providers.component.html',
  styleUrl: './service-providers.component.css',
})
export class ServiceProvidersComponent {
  ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;

  selectedProvider: ServiceProviders | null = null;
  isEditMode = false;
  showPopup = false;

  serviceProviders: ServiceProviders[] = [];
  gridApi!: GridApi;

  columnDefs: ColDef[] = [
    { field: 'Name', headerName: 'Name', minWidth: 150, cellStyle: { textAlign: 'left' } },
    { field: 'VATNumber', headerName: 'VAT Number', minWidth: 150, cellStyle: { textAlign: 'left' } },
    { field: 'CompanyRegNo', headerName: 'Company Reg. No', minWidth: 160, cellStyle: { textAlign: 'left' } },
    { field: 'Branch', headerName: 'Branch', minWidth: 120, cellStyle: { textAlign: 'left' } },
    {
      field: 'OfficeAddress',
      headerName: 'Office Address',
      minWidth: 250,
      wrapText: true,
      autoHeight: true,
      cellStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

      }
    },
    {
      field: 'StorageAddress',
      headerName: 'Storage Address',
      minWidth: 250,
      wrapText: true,
      autoHeight: true,
      cellStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',


      }
    },
    { field: 'TownCity', headerName: 'Town / City', minWidth: 130, cellStyle: { textAlign: 'left' } },
    { field: 'Province', headerName: 'Province', minWidth: 130, cellStyle: { textAlign: 'left' } },
    {
      field: 'ServiceProviderServiceTypeId',
      headerName: 'Service Type ID',
      minWidth: 140,
      cellStyle: { textAlign: 'center' }
    },
    { field: 'DesignationNumber', headerName: 'Designation No', minWidth: 140, cellStyle: { textAlign: 'left' } },
    {
      field: 'RatePerKm',
      headerName: 'Rate per Km',
      minWidth: 120,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'RateAuthorisedOn',
      headerName: 'Rate Authorised On',
      minWidth: 160,
      cellStyle: { textAlign: 'left' }
    },
    {
      field: 'RateAuthorisedby',
      headerName: 'Rate Authorised By',
      minWidth: 150,
      cellStyle: { textAlign: 'left' }
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      minWidth: 100,
      cellRenderer: 'activeToggleRenderer',
      cellStyle: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'

      }
    },
    { field: 'IsActiveOn', headerName: 'Active On', minWidth: 150, cellStyle: { textAlign: 'left' } },
    { field: 'IsActiveby', headerName: 'Active By', minWidth: 150, cellStyle: { textAlign: 'left' } },
    {
      field: 'IsVerified',
      headerName: 'Verified',
      minWidth: 100,
      cellRenderer: (params: any) => {
        const icon = params.value ? 'tick' : 'cross';
        return `<img src="assets/icons/${icon}.png" alt="${params.value ? 'Yes' : 'No'
          }" style="width: 20px; height: 20px;" />`;
      },
      cellStyle: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      }
    },
    { field: 'IsVerifiedOn', headerName: 'Verified On', minWidth: 150, cellStyle: { textAlign: 'left' } },
    { field: 'IsVerifiedby', headerName: 'Verified By', minWidth: 150, cellStyle: { textAlign: 'left' } },
    {
      field: 'IsAccredited',
      headerName: 'Accredited',
      minWidth: 120,
      cellRenderer: (params: any) => {
        const icon = params.value ? 'tick' : 'cross';
        return `<img src="assets/icons/${icon}.png" alt="${params.value ? 'Yes' : 'No'
          }" style="width: 20px; height: 20px;" />`;
      },
      cellStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
    { field: 'IsAccreditedOn', headerName: 'Accredited On', minWidth: 150, cellStyle: { textAlign: 'left' } },
    { field: 'IsAccreditedby', headerName: 'Accredited By', minWidth: 150, cellStyle: { textAlign: 'left' } },
    {
      field: 'ContactDetails',
      headerName: 'Contact Details',
      valueGetter: (params) =>
        params.data?.ContactDetails?.map((c: any) => `${c.Type}: ${c.Value}`).join(', '),
      minWidth: 250,
      maxWidth: 500,
      tooltipField: 'ContactDetails',
      cellStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left'
      },
    },

    {
      headerName: 'View',
      minWidth: 150,
      flex: 1,
      cellRenderer: (_: ICellRendererParams) =>
        '<i class="fas fa-eye" title="Can View / Edit" style="color: green; cursor: pointer;"></i>',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '17px',
      },
      onCellClicked: (params: any) => this.openPopup(params.data),
      headerClass: 'bold-header',
    },
    {
      headerName: 'Delete',
      flex: 1,
      minWidth: 150,
      cellRenderer: 'softDeleteRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => this.softDelete(params.data),
    },
  ];


  defaultColDef: ColDef = {
    headerClass: 'bold-header',
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: {
      borderRight: '1px solid #ccc',
    },
  };

  constructor(private providerService: ServicProvidersService,private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.providerService.getServiceProviders().subscribe((data) => {
      this.serviceProviders = data;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;

    // Optional: Only auto-size some columns (e.g., short ones)
    const autoSizeThese = [
      'Name',
      'VATNumber',
      'Branch',
      'Manager',
      'Province',
    ];
    setTimeout(() => {
      const colIds =
        this.gridApi
          .getColumnDefs()
          ?.map((col: any) => col.field)
          .filter((id: string) => autoSizeThese.includes(id)) || [];
      this.gridApi.autoSizeColumns(colIds);
    }, 100);
  }

  resetColumns(): void {
    this.gridApi.setGridOption('columnDefs', this.columnDefs);
  }



  openPopup(rowData: ServiceProviders) {
    this.selectedProvider = rowData;
    this.isEditMode = true;
    this.showPopup = true;
  }

  handleFormSubmit(data: ServiceProviders) {
    console.log('Form submitted with data:', data);
    // You can refresh the grid, close popup, show toast, etc.
  }
  // softDelete(ServiceProviders: ServiceProviders): void {
  //     // Remove from UI
  //     this.serviceProviders = this.serviceProviders.filter(
  //       r => r.ServiceProviderId !== row.ServiceProviderId
  //     );
  //     this.serviceProviders = [...this.serviceProviders]; // trigger Angular UI update
  
  //     // Show success toast
  //     this.snackbarService.showSuccess('Removed successfully');
  
  //     // Soft delete API call
  //     this.providerService.softDeleteServiceProviders(row.ServiceProviderId).subscribe({
  //       next: () => {
  //         // Optional: add refresh logic
  //       },
  //       // error: () => {
  //       //   this.snackbarService.showError('Soft delete failed');
  //       // }
  //     });
  //   }
    softDelete(ServiceProviders: ServiceProviders): void {
    // Mark the item as deleted (optional if you want to preserve the flag)
    ServiceProviders.IsDeleted = true;

    // Remove it from rowData
    this.serviceProviders = this.serviceProviders.filter(group => group.ServiceProviderId !== ServiceProviders.ServiceProviderId);

    // Optionally update the grid manually if you want
    // this.gridApi.setRowData(this.rowData);

    this.snackbarService.showSuccess('Removed successfully');
  }
}
