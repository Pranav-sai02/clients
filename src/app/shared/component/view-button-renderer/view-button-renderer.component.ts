import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-view-button-renderer',
  standalone: false,
  templateUrl: './view-button-renderer.component.html',
  styleUrl: './view-button-renderer.component.css',
})
export class ViewButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onClick(): void {
    if (this.params.onView) {
      this.params.onView(this.params.data);
    }
  }
}
