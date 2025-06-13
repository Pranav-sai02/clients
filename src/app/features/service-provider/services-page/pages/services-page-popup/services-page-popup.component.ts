import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesPageService } from '../../services/service-page/services-page.service';
import { ServicesPage } from '../../models/Services-page';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services-page-popup',
  standalone: false,
  templateUrl: './services-page-popup.component.html',
  styleUrl: './services-page-popup.component.css',
})
export class ServicesPagePopupComponent implements OnInit {
  @Input() service: ServicesPage | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  areaForm: FormGroup;

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  constructor(
    private fb: FormBuilder,
    private serviceSvc: ServicesPageService,
    private toastr: ToastrService
  ) {
    this.areaForm = this.fb.group({
      ServiceId: [null], // Added ServiceId to the form
      Description: ['', [Validators.required, Validators.minLength(3)]],
      ServiceType: ['', Validators.required],
      Note: ['', Validators.required],
      EnforceMobileNumber: [false],
      SendRefSMSEnabled: [false],
      IsActive: [false],
    });
  }

  ngOnInit(): void {
    if (this.service) {
      this.areaForm.patchValue({
        ServiceId: this.service.ServiceId,
        Description: this.service.Description,
        ServiceType: this.service.ServiceType,
        Note: this.service.Note,
        EnforceMobileNumber: this.service.EnforceMobileNumber,
        SendRefSMSEnabled: this.service.SendRefSMSEnabled,
        IsActive: this.service.IsActive,
      });
    }
  }

  onSubmit() {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const formData = this.areaForm.value;

    const payload: ServicesPage = {
      ServiceId: formData.ServiceId,
      Description: formData.Description,
      ServiceType: formData.ServiceType,
      Note: formData.Note,
      NotePlain: this.stripHtmlTags(formData.Note),
      EnforceMobileNumber: formData.EnforceMobileNumber,
      SendRefSMSEnabled: formData.SendRefSMSEnabled,
      IsActive: formData.IsActive,
    };

    const isUpdating = formData.ServiceId && formData.ServiceId > 0;

    const request$ = isUpdating
      ? this.serviceSvc.update(formData.ServiceId, payload)
      : this.serviceSvc.create(payload);

    request$.subscribe({
      next: (response) => {
        this.toastr.success(
          isUpdating
            ? 'Service updated successfully!'
            : 'Service created successfully!',
          'Success'
        );
        this.formSubmit.emit(response);
        this.close.emit();
      },
      error: (err) => {
        console.error('Failed to save service:', err);
        this.toastr.error('Failed to save service. Please try again.', 'Error');
      },
    });
  }

  private stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  onCancel() {
    this.areaForm.reset();
    this.close.emit();
  }

  onClose() {
    this.areaForm.reset();
    this.close.emit();
  }

  get f() {
    return this.areaForm.controls;
  }
}
