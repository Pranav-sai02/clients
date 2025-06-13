import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsComponent } from './features/claims/pages/claims/claims.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/auth/login/loginpage/login/login.component';
import { SidebarComponent } from './layouts/sidebar/pages/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { loginGuard } from './core/guards/loginguard/login.guard';
import { authGuard } from './core/guards/authguard/auth.guard';
import { LayoutComponent } from './layouts/layoutcomponent/layout/layout.component';
import { UserComponent } from './features/users/pages/user/user.component';
import { AreaCodesComponent } from './features/areacodes/pages/area-codes/area-codes.component';

import { ClientGroupComponent } from './features/client/pages/client-groups/client-group/client-group.component';
import { ClientComponent } from './features/client/pages/client/client.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
    title: 'Login',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        title: 'Home',
        data: { breadcrumb: 'Home' },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        title: 'Dashboard',
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'claims',
        component: ClaimsComponent,
        canActivate: [authGuard],
        title: 'Claims',
        data: { breadcrumb: 'Call Centre / Claims' },
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [authGuard],
        title: 'User',
        data: { breadcrumb: 'Security / Users' },
      },
      {
        path: 'area-codes',
        component: AreaCodesComponent,
        canActivate: [authGuard],
        title: 'Area Codes',
        data: { breadcrumb: 'Configuration / AreaCodes' },
      },

      {
        path: 'client',
        component: ClientComponent,
        canActivate: [authGuard],
        title: 'client',
        data: { breadcrumb: 'Client' },
      },
      {
        path: 'client-group',
        component: ClientGroupComponent,
        canActivate: [authGuard],
        title: 'client',
        data: { breadcrumb: 'Client / Client Group' },
      },

      {
        path: 'service-provider',
        loadChildren: () =>
          import('./features/service-provider/service-provider.module').then(
            (m) => m.ServiceProviderModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'cases',
        loadChildren: () =>
          import('./features/calls-module/calls-module.module').then(
            (m) => m.CallsModuleModule
          ),
      },

      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
