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

  gridApi!: GridApi<ClientGroup>;

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
  ) { }

  defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
  };

  ngOnInit(): void {
    this.store.dispatch(new LoadClientGroups());
    // this.store.select(ClientGroupState.getClientGroups).subscribe((data) => {
    //   console.log('From select:', data);
    //   this.rowData = data;
    // });
    this.store.select(ClientGroupState.getClientGroups).subscribe((data) => {
      console.log('From select:', data);
      this.rowData = data.filter(group => !group.IsDeleted);
    });

  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  // onCellValueChanged(event: CellValueChangedEvent): void {
  //   const row = event.data;
  //   const isNew = !row.ClientGroupId;

  //   // Just mark the row as edited; don't save automatically
  //   row.isEdited = true;
  //   this.gridApi.applyTransaction({ update: [row] });
  // }
  onCellValueChanged(event: CellValueChangedEvent): void {
    const updatedRow = event.data;

    // 🔍 Find original row reference in rowData
    const index = this.rowData.findIndex(r => r === updatedRow || r.ClientGroupId === updatedRow.ClientGroupId);

    if (index > -1) {
      this.rowData[index].IsEdited = true; // ✅ Update actual reference
      this.gridApi.applyTransaction({ update: [this.rowData[index]] });
    }
  }


  saveRow(row: ClientGroup): void {
    const isComplete =
      row.Name && row.Name.trim() !== '' &&
      row.IsActive !== null && row.IsActive !== undefined;

    if (!isComplete) {
      this.snackbarService.showError('Please complete all fields before saving.');
      return;
    }

    const isNew = !row.ClientGroupId;

    // Skip save if not edited and not new
    if (!isNew && !row.IsEdited) {
      this.snackbarService.showInfo('No changes to save.');
      return;
    }

    const saveObservable = isNew
      ? this.clientGroupService.addClientGroup(row)
      : this.clientGroupService.updateClientGroup(row);

    saveObservable.subscribe({
      next: (savedRow: ClientGroup) => {
        this.snackbarService.showSuccess('Saved successfully!');

        // ✅ Assign new ID if it's a fresh row
        if (isNew && savedRow?.ClientGroupId) {
          row.ClientGroupId = savedRow.ClientGroupId;
        }

        row.IsEdited = false;

        // ✅ Refresh grid UI
        this.gridApi.applyTransaction({ update: [row] });

        // ✅ Reload from store (ensures proper state)
        this.store.dispatch(new LoadClientGroups());

        // ✅ Optional: refresh cells to force UI update (you can keep or remove this)
        setTimeout(() => {
          this.gridApi.redrawRows();
        }, 100);
      },
      error: () => {
        this.snackbarService.showError('Failed to save. Try again.');
      }
    });
  }

  getRowClass = (params: any) => {
    // If AreaCodeId is not present, it's a newly added temporary row
    return !params.data.ClientGroupId ? 'temporary-row' : '';
  };

  softDeleteProvider(ClientGroup: ClientGroup): void {
    // Mark the item as deleted (optional if you want to preserve the flag)
    ClientGroup.IsDeleted = true;

    // Remove it from rowData
    this.rowData = this.rowData.filter(group => group.ClientGroupId !== ClientGroup.ClientGroupId);

    // Optionally update the grid manually if you want
    // this.gridApi.setRowData(this.rowData);

    this.snackbarService.showSuccess('Removed successfully');
  }

  addRow(): void {
    const newRow: ClientGroup = {
      Name: '',
      IsActive: true,
    };

    if (this.gridApi) {
      this.gridApi.applyTransaction({ add: [newRow] });
    }

    this.rowData = [newRow, ...this.rowData];
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
