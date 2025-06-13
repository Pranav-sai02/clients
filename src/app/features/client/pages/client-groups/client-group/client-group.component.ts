import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientGroup } from '../../../models/ClientGroup';
import { Select, Store } from '@ngxs/store';
import {
  AddClientGroup,
  LoadClientGroups,
  RemoveClientGroup,
  SoftDeleteClientGroup,
} from '../../../client-group-state/client-group.action';
import {
  CellValueChangedEvent,
  ColDef,
  GetContextMenuItems,
  GetContextMenuItemsParams,
  GridApi,
} from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { ClientGroupService } from '../../../services/client-group-services/client-group.service';
import { ClientGroupState } from '../../../client-group-state/client-group.state';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-client-group',
  standalone: false,
  templateUrl: './client-group.component.html',
  styleUrl: './client-group.component.css',
})
export class ClientGroupComponent implements OnInit {
  // @Select(state => state.clientGroups) clientGroups$!: Observable<ClientGroup[]>;
  ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;

  gridApi!: GridApi;

  rowData: ClientGroup[] = [];
  columnDefs: ColDef<ClientGroup>[] = [
    {
      field: 'Name',
      headerName: 'Name',
      sortable: true,
      flex: 1,
      minWidth: 200,
      editable: true,
      cellEditor: 'agTextCellEditor',
      valueFormatter: (params) => (params.value ? params.value : 'Enter Name'),
      cellClassRules: {
        'hint-text': (params) => !params.value,
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      cellRenderer: 'activeToggleRenderer',
      flex: 1,
      minWidth: 120,
      headerClass: 'bold-header',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      headerName: 'Delete',
      field: 'IsDeleted',
      flex: 1,
      minWidth: 120,
      cellRenderer: 'softDeleteRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => this.softDeleteProvider(params.data),
    },
    {
      headerName: 'Save',
      flex: 1,
      minWidth: 120,
      cellRenderer: () => {
        return `
      <button
        style="
          background-color: #05b9bc;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          height: 42px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          font-size: 1rem;
          justify-content: center;
          cursor: pointer;
        "
      >
        Save
      </button>
    `;
      },
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => {
        this.saveRow(params.data);
      },
    },
  ];

  constructor(
    private store: Store,
    private clientGroupService: ClientGroupService,
    private snackbarService: SnackbarService
  ) {}

  defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
  };

  ngOnInit(): void {
    this.store.dispatch(new LoadClientGroups());
    this.store.select(ClientGroupState.getClientGroups).subscribe((data) => {
      console.log('From select:', data);
      this.rowData = data;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  onCellValueChanged(event: CellValueChangedEvent): void {
    const row = event.data;
    const isNew = !row.ClientGroupId;

    // Just mark the row as edited; don't save automatically
    row.isEdited = true;
    this.gridApi.applyTransaction({ update: [row] });
  }

  saveRow(row: ClientGroup): void {
    const isComplete =
      row.Name &&
      row.Name.trim() !== '' &&
      row.IsActive !== null &&
      row.IsActive !== undefined;

    if (isComplete) {
      this.clientGroupService.addClientGroup(row).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Saved successfully!');
        row.IsEdited = false;
        this.gridApi.applyTransaction({ update: [row] });
        this.store.dispatch(new LoadClientGroups());
      },
    //  error: () => {
    //     this.snackbarService.showError('Failed to save. Try again.');
    //   }
    });
  } else {
    this.snackbarService.showError('Please complete all fields before saving.');
  }
}

  getRowClass = (params: any) => {
    // If AreaCodeId is not present, it's a newly added temporary row
    return !params.data.ClientGroupId ? 'temporary-row' : '';
  };

  softDeleteProvider(areaCode: ClientGroup): void {
    const updatedAreaCode = { ...areaCode, isDeleted: true };
    this.store.dispatch(new SoftDeleteClientGroup(updatedAreaCode));
  }

  addRow(): void {
    const newRow: ClientGroup = {
      Name: '',
      IsActive: true,
    };
    this.store.dispatch(new AddClientGroup(newRow));
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
          this.softDeleteProvider(params.node.data);
        }
      },
      icon: '<i class="fas fa-trash"></i>',
    };

    return [addRow, deleteRow, 'separator', 'copy', 'export'];
  };
}
