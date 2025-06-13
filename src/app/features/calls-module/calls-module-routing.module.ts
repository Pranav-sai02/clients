import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';

const routes: Routes = [
  // Add your routes here
  {
    path: '',
    component: CallsComponent, // 👈 Load this when path is '/calls'
    title: 'Cases',
    data: { breadcrumb: 'Call Centre / Cases' },
  },
  {
    path: 'case-details', // No :callRef
    component: CallDetailsComponent,
    title: 'Case Details',
    data: { breadcrumb: 'Call Centre / Cases / Case Details' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallsModuleRoutingModule {}
