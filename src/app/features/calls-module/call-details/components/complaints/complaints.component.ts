import { Component } from '@angular/core';

@Component({
  selector: 'app-complaints',
  standalone: false,
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent {
printPage():void {
  window.print();
}
}