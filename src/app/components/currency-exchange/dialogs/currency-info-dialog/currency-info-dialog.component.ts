import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CurrencyDto } from 'src/app/dtos/currency-dto';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-info-dialog',
  templateUrl: './currency-info-dialog.component.html',
  styleUrls: ['./currency-info-dialog.component.css']
})
export class CurrencyInfoDialogComponent {
  newSelectedRow: CurrencyDto = { ...this.data.selectedRow };
  isLoading = true;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private currencyService: CurrencyService,
    ) {
      this.fetchData();
    }
    fetchData() {
      console.log(this.data.selectedRow.currencyName);
      this.currencyService
        .getFindByCurrencyCode(this.data.selectedRow.currencyName)
        .subscribe(response => {
          console.log(response);
          this.data.selectedRow = response;
          this.prepareValues();
          this.isLoading = false;
        });
    }
    prepareValues() {
      // replace null or empty values with a placeholder
      for (const key in this.data.selectedRow) {
        if (
          this.data.selectedRow[key] == null ||
          this.data.selectedRow[key] == ''
        ) {
          this.data.selectedRow[key] = '-';
        }
      }
      this.newSelectedRow = { ...this.data.selectedRow };
    }
}