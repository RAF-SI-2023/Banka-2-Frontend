import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-company-info-dialog',
  templateUrl: './company-info-dialog.component.html',
  styleUrls: ['./company-info-dialog.component.css']
})
export class CompanyInfoDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
