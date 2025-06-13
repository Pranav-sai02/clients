import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicProvidersService } from '../../services/service-providers/servic-providers.service';
import { ServiceProviders, ContactDetail } from '../../models/ServiceProviders';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-providers-popup',
  standalone: false,
  templateUrl: './service-providers-popup.component.html',
  styleUrls: ['./service-providers-popup.component.css'],
})
export class ServiceProvidersPopupComponent implements OnInit {
  @Input() providerData!: ServiceProviders | null;
  @Input() isEdit = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

 
toggleOptions = false;



  providerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServicProvidersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.providerForm = this.fb.group({
      name: [this.providerData?.Name || '', Validators.required],
      vatNumber: [this.providerData?.VATNumber || ''],
      companyRegNo: [this.providerData?.CompanyRegNo || ''],
      branch: [this.providerData?.Branch || ''],
      officeAddress: [this.providerData?.OfficeAddress || ''],
      storageAddress: [this.providerData?.StorageAddress || ''],
      townCity: [this.providerData?.TownCity || ''],
      province: [this.providerData?.Province || ''],
  

      

      contactNumbers: this.fb.array(this.initContacts(this.providerData?.ContactDetails || [], 'Phone')),
      faxNumbers: this.fb.array(this.initContacts(this.providerData?.ContactDetails || [], 'Fax')),
      emailAddresses: this.fb.array(this.initEmails(this.providerData?.ContactDetails || [])),

      serviceType: [this.providerData?.ServiceProviderServiceTypeId || 0],
      designationNo: [this.providerData?.DesignationNumber || ''],

      ratePerKm: [this.providerData?.RatePerKm || ''],
      dateAuthorised: [this.providerData?.RateAuthorisedOn || ''],
      authorisedBy: [this.providerData?.RateAuthorisedby || ''],

      canEditAddress: [false],
      isActive: [this.providerData?.IsActive || false],
      dateOpened: [this.providerData?.IsActiveOn || ''],
      openedBy: [this.providerData?.IsActiveby || ''],

      isVerified: [this.providerData?.IsVerified || false],
      dateVerified: [this.providerData?.IsVerifiedOn || ''],
      verifiedBy: [this.providerData?.IsVerifiedby || ''],

      isAccredited: [this.providerData?.IsAccredited || false],
      dateAccredited: [this.providerData?.IsAccreditedOn || ''],
      accreditedBy: [this.providerData?.IsAccreditedby || ''],
    });
  }

  get contactNumbers(): FormArray {
    return this.providerForm.get('contactNumbers') as FormArray;
  }

  get faxNumbers(): FormArray {
    return this.providerForm.get('faxNumbers') as FormArray;
  }

  get emailAddresses(): FormArray {
    return this.providerForm.get('emailAddresses') as FormArray;
  }

  private createContactRow(value: any = {}): FormGroup {
    return this.fb.group({
      number: [value.Value || ''],
      name: [value.Name || ''],
      comment: [value.Comments || ''],
    });
  }

  private createFaxRow(value: any = {}): FormGroup {
    return this.fb.group({
      fax: [value.Value || ''],
      name: [value.Name || ''],
      comment: [value.Comments || ''],
    });
  }

  private createEmailRow(value: any = {}): FormGroup {
    return this.fb.group({
      email: [value.Value || '', [Validators.required, Validators.email]],
      type: [value.Type || ''],
    });
  }

  private initContacts(details: ContactDetail[], type: string): FormGroup[] {
    const filtered = details.filter(d => d.Type === type);
    return filtered.length > 0 ? filtered.map(c =>
      type === 'Phone' ? this.createContactRow(c) : this.createFaxRow(c)) : [
      type === 'Phone' ? this.createContactRow() : this.createFaxRow()
    ];
  }

  private initEmails(details: ContactDetail[]): FormGroup[] {
    const emails = details.filter(d => d.Type === 'Email');
    return emails.length > 0 ? emails.map(e => this.createEmailRow(e)) : [this.createEmailRow()];
  }

  addContactRow(): void {
    if (this.contactNumbers.length < 5) {
      this.contactNumbers.push(this.createContactRow());
    }
  }

  removeContactRow(index: number): void {
    if (this.contactNumbers.length > 1) {
      this.contactNumbers.removeAt(index);
    }
  }

  addFaxRow(): void {
    if (this.faxNumbers.length < 3) {
      this.faxNumbers.push(this.createFaxRow());
    }
  }

  removeFaxRow(index: number): void {
    if (this.faxNumbers.length > 1) {
      this.faxNumbers.removeAt(index);
    }
  }

  addEmailRow(): void {
    if (this.emailAddresses.length < 2) {
      this.emailAddresses.push(this.createEmailRow());
    }
  }

  removeEmailRow(index: number): void {
    if (this.emailAddresses.length > 1) {
      this.emailAddresses.removeAt(index);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }

 onSubmit(): void {
  if (this.providerForm.valid) {
    const formValue = this.providerForm.value;

    const payload: ServiceProviders = {
      ServiceProviderId: this.isEdit && this.providerData ? this.providerData.ServiceProviderId : 0,
      Name: formValue.name,
      VATNumber: formValue.vatNumber,
      CompanyRegNo: formValue.companyRegNo,
      Branch: formValue.branch,
      OfficeAddress: formValue.officeAddress,
      StorageAddress: formValue.storageAddress,
      TownCity: formValue.townCity,
      Province: formValue.province,
      ServiceProviderServiceTypeId: formValue.serviceType,
      DesignationNumber: formValue.designationNo,
      Manager: '',
      RatePerKm: +formValue.ratePerKm || 0,
      RateAuthorisedOn: formValue.dateAuthorised,
      RateAuthorisedby: formValue.authorisedBy,
      IsActive: formValue.isActive,
      IsActiveOn: formValue.dateOpened,
      IsActiveby: formValue.openedBy,
      IsVerified: formValue.isVerified,
      IsVerifiedOn: formValue.dateVerified,
      IsVerifiedby: formValue.verifiedBy,
      IsAccredited: formValue.isAccredited,
      IsAccreditedOn: formValue.dateAccredited,
      IsAccreditedby: formValue.accreditedBy,
      ContactDetails: this.mapContactDetails(
        formValue.contactNumbers,
        formValue.faxNumbers,
        formValue.emailAddresses
      )
    };

    const request$ = this.isEdit
      ? this.service.updateServiceProvider(payload)
      : this.service.addServiceProvider(payload);

    request$.subscribe({
      next: () => {
        const msg = this.isEdit ? 'updated' : 'added';
        this.toastr.success(`Service provider ${msg} successfully!`, 'Success');
        this.formSubmit.emit(payload);
        this.close.emit();
      },
      error: (err) => {
        this.toastr.error('Failed to save service provider', 'Error');
        console.error('Error:', err);
      }
    });

  } else {
    this.providerForm.markAllAsTouched();
    this.toastr.error('Please fill in all required fields.', 'Form Incomplete');
  }
  }

private mapServiceType(id: number): string {
  switch (id) {
    case 1: return 'Added Value Services';
    case 2: return 'Funerary Claim Only';
    case 3: return 'Funerary Inf';
    case 4: return 'Funerary Management';
    default: return 'Select';
  }
}


  private mapServiceTypeReverse(id: number): string {
    switch (id) {
      case 1: return 'Added Value Services';
      case 2: return 'Funerary Claim Only';
      case 3: return 'Funerary Inf';
      case 4: return 'HostingFunerary Management';
      default: return '';
    }
  }

  private mapContactDetails(
    contacts: any[],
    faxes: any[],
    emails: any[]
  ): ContactDetail[] {
    const contactList: ContactDetail[] = [];

    contacts.forEach(c => {
      contactList.push({
        Id: 0,
        Type: 'Phone',
        Code: '+27',
        Value: c.number,
        Name: c.name,
        Comments: c.comment,
      });
    });

    faxes.forEach(f => {
      contactList.push({
        Id: 0,
        Type: 'Fax',
        Code: '',
        Value: f.fax,
        Name: f.name,
        Comments: f.comment,
      });
    });

    emails.forEach(e => {
      contactList.push({
        Id: 0,
        Type: e.type || 'Email',
        Code: '',
        Value: e.email,
        Name: '',
        Comments: '',
      });
    });

    return contactList;
  }
}
