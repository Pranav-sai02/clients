import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProvidersComponent } from '../service-providers/pages/service-providers/service-providers.component';
import { ServiceProvidersTypesComponent } from '../service-provider-types/pages/service-providers-types/service-providers-types.component';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPageComponent } from '../services-page/pages/services-page/services-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'providers',
        component: ServiceProvidersComponent,
        title: 'Service Providers',
        data: { breadcrumb: 'Services / Service Providers' },
      },
      {
        path: 'types',
        component: ServiceProvidersTypesComponent,
        title: 'Service Provider Types',
        data: { breadcrumb: 'Services / Service Provider Types' },
      },
      {
        path: 'services',
        component: ServicesPageComponent,
        title: 'Services',
        data: { breadcrumb: 'Services' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderRoutingModule {}
