import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { SidebarComponent } from './layouts/sidebar/pages/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/pages/header/header.component';
import { ClaimsComponent } from './features/claims/pages/claims/claims.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ClaimsFilterComponent } from './features/claims/pages/claims-filter/claims-filter.component';
import { LoginComponent } from './features/auth/login/loginpage/login/login.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layouts/layoutcomponent/layout/layout.component';
import { UserComponent } from './features/users/pages/user/user.component';
import { UserFilterToolbarComponent } from './features/users/pages/user-filter-toolbar/user-filter-toolbar.component';
import { UserpopupComponent } from './features/users/pages/userpopup/userpopup/userpopup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ActiveToggleRendererComponent } from './shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { ServiceProviderModule } from './features/service-provider/service-provider.module';
import { SoftDeleteButtonRendererComponent } from './shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';
import { ViewButtonRendererComponent } from './shared/component/view-button-renderer/view-button-renderer.component';
import { AreaCodesComponent } from './features/areacodes/pages/area-codes/area-codes.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { AreacodePopupComponent } from './features/areacodes/pages/areacode-popup/areacode-popup.component';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { EditorModule } from 'primeng/editor';
import { NgxsModule } from '@ngxs/store';
import { AreaCodesState } from './features/areacodes/state/area-code.state';

import { ClientGroupComponent } from './features/client/pages/client-groups/client-group/client-group.component';
import { ClientGroupState } from './features/client/client-group-state/client-group.state';
import { ClientComponent } from './features/client/pages/client/client.component';
import { ClientPopupComponent } from './features/client/pages/client-popup/client-popup/client-popup.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DatePickerModule } from 'primeng/datepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


ModuleRegistry.registerModules([AllEnterpriseModule]);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ClaimsComponent,
    HomeComponent,
    ClaimsFilterComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    UserComponent,
    UserFilterToolbarComponent,
    UserpopupComponent,
    ActiveToggleRendererComponent,
    SoftDeleteButtonRendererComponent,
    ViewButtonRendererComponent,
    AreaCodesComponent,
    BreadcrumbComponent,
    AreacodePopupComponent,
    ClientComponent,
    ClientGroupComponent,
    ClientPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EditorModule,
    DatePickerModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ServiceProviderModule,
    NgxIntlTelInputModule,
    NgxsModule.forRoot([AreaCodesState, ClientGroupState]),
    MatSnackBarModule,


  ],
  providers: [ provideClientHydration(withEventReplay()), {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
