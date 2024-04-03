import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CurrencyDto } from 'src/app/dtos/currency-dto';
import { CurrencyService } from 'src/app/services/currency.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-currency-info-dialog',
  templateUrl: './currency-info-dialog.component.html',
  styleUrls: ['./currency-info-dialog.component.css']
})
export class CurrencyInfoDialogComponent {
  newSelectedRow: CurrencyDto = { ...this.data.selectedRow };
  isLoading = true;
  chartLoading= false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Inflation Rate'
    },
    xAxis: {
      categories: ['2002', '2003', '2004']
    },
    yAxis: {
      title: {
        text: 'Inflation Rate (%)'
      }
    },
    series: [
    ]
  };

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
          this.prepareChartOptions(response.inflationList);
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
    
    prepareChartOptions(inflationList: any[]) {
      const categories: string[] = [];
      const data: number[] = [];
      console.log(inflationList);
      inflationList.forEach(item => {
        categories.push(item.year.toString());
        data.push(item.inflationRate);
      });
      console.log(categories);
      console.log(data);

      this.chartOptions.xAxis = { categories: categories }; // Optional chaining used here
      console.log(this.chartOptions);
      this.chartOptions.series = [{ type: 'line', name: 'Inflation Rate', data: data }]; // Optional chaining used here
      this.chartLoading=true;
    }

}