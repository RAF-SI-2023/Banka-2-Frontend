import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-single-company-dialog',
  templateUrl: './single-company-dialog.component.html',
  styleUrls: ['./single-company-dialog.component.css']
})
export class SingleCompanyDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
