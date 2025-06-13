import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaCodesService } from '../../services/areacodes/area-codes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areacode-popup',
  standalone: false,
  templateUrl: './areacode-popup.component.html',
  styleUrl: './areacode-popup.component.css',
})
export class AreacodePopupComponent {
  areaForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private areaCodeService: AreaCodesService,private toastr: ToastrService) {
    this.areaForm = this.fb.group({
      areaCode: ['', Validators.required],
      description: [''],
      type: ['Landline'],
      isActive: [false],
    });
  }

  onSubmit() {
  if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      this.toastr.error('Please fill in required fields.', 'Form Invalid');
      return;
    }

    const formData = this.areaForm.value;

    this.areaCodeService.addAreaCode(formData).subscribe({
      next: (response) => {
        this.toastr.success('Area code saved successfully!', 'Success');
        this.formSubmit.emit(response);
        this.close.emit();
      },
      error: (err) => {
        console.error('Save error:', err);
        this.toastr.error('Failed to save area code.', 'Error');
      },
    });
  }

  onCancel() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

   get f() {
    return this.areaForm.controls;
  }
}
