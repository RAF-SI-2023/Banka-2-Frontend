import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CardDto } from 'src/app/dtos/card-dto';
import { CardService } from 'src/app/services/bank-service/card.service';
import { cardNumberValidator } from 'src/app/utils/validators/card-number.validator';
import { MatDialog } from '@angular/material/dialog';
import { CardBlockStatusDialogComponent } from './card-block-status-dialog/card-block-status-dialog.component';

@Component({
  selector: 'app-change-block-form',
  templateUrl: './change-block-form.component.html',
  styleUrls: ['./change-block-form.component.css']
})
export class ChangeBlockFormComponent {
  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private dialog: MatDialog
  ) {}

  changeBlockForm = this.fb.group({
    identificationCardNumber: [
      null,
      [Validators.required, cardNumberValidator()],
    ],
  });

  onSubmit(formDirective: FormGroupDirective) {
    if (this.changeBlockForm.valid && this.changeBlockForm) {
      const card = this.changeBlockForm.value as unknown as CardDto;
      console.log(card);
      this.cardService
        .putChangeCardBlock(card.identificationCardNumber)
        .pipe(
          catchError(error => {
            console.log(error);
            // this.openDialog('An error occurred: ' + error.message);
            return throwError(() => error);
          }),
        )
        .subscribe(response => {
          const a=response as unknown as CardDto;
          console.log(a.block);
          if(a.block==false)
          this.openDialog('Kartica '+a.accountNumber +' : je blokirana');
          if(a.block==true)
            this.openDialog('Kartica '+a.accountNumber +' : je odblokirana');

          formDirective.resetForm();
          this.changeBlockForm.reset();
        });
    }
  }

  openDialog(message: string): void {
    this.dialog.open(CardBlockStatusDialogComponent, {
      data: { message: message }
    });
  }
}
