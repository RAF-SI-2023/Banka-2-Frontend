import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-block-status-dialog',
  templateUrl: './card-block-status-dialog.component.html',
  styleUrls: ['./card-block-status-dialog.component.css']
})
export class CardBlockStatusDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
