// src/app/components/public-security-info-dialog/public-security-info-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SecurityDto } from 'src/app/dtos/security-dto';

@Component({
  selector: 'app-public-security-info-dialog',
  templateUrl: './public-security-info-dialog.component.html',
  styleUrls: ['./public-security-info-dialog.component.css']
})
export class PublicSecurityInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PublicSecurityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SecurityDto
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
