import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallsModuleRoutingModule } from './calls-module-routing.module';
import { CallsComponent } from './calls/pages/calls/calls.component';
import { CallDetailsComponent } from './call-details/pages/call-details/call-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CallerDetailsComponent } from './call-details/components/caller-details/caller-details.component';
import { ValidationComponent } from './call-details/components/validation/validation.component';
import { VoucherSmsComponent } from './call-details/components/voucher-sms/voucher-sms.component';
import { ComplaintsComponent } from './call-details/components/complaints/complaints.component';
import { DocumentsComponent } from './call-details/components/documents/documents.component';

@NgModule({
  declarations: [CallsComponent, CallDetailsComponent, CallerDetailsComponent, ValidationComponent, VoucherSmsComponent, ComplaintsComponent, DocumentsComponent],
  imports: [
    CommonModule,
    CallsModuleRoutingModule,
    AgGridModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxIntlTelInputModule
  ],
  exports: [CallsComponent, CallDetailsComponent],
})
export class CallsModuleModule {}
