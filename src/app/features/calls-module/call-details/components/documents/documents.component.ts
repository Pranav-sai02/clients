import { Component } from '@angular/core';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
selectedFile: File | null = null;
  uploadedFiles: { file: File; uploadedAt: Date }[] = [];
  pagedFiles: { file: File; uploadedAt: Date }[] = [];
  pageSize = 50;
  currentPage = 0;
 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
 
  onUpload(): void {
    if (this.selectedFile) {
      this.uploadedFiles.push({
        file: this.selectedFile,
        uploadedAt: new Date()
      });
      this.selectedFile = null;
      this.resetPagination();
    }
  }
 
  printPage(): void {
    window.print();
  }
 
  downloadFile(fileData: { file: File }): void {
  const file = fileData.file;
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  }
 
  resetPagination(): void {
    this.currentPage = 0;
    this.updatePagedFiles();
  }
 
  getStartIndex(): number {
    return this.currentPage * this.pageSize;
  }
 
  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize, this.uploadedFiles.length);
  }
 
  updatePagedFiles(): void {
    const start = this.getStartIndex();
    const end = this.getEndIndex();
    this.pagedFiles = this.uploadedFiles.slice(start, end);
  }
 
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedFiles();
    }
  }
 
  nextPage(): void {
    if (this.getEndIndex() < this.uploadedFiles.length) {
      this.currentPage++;
      this.updatePagedFiles();
    }
  }
 
  ngOnInit(): void {
    this.resetPagination();
  }
}
 

