import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  assetType: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Dunav osiguranje', price: 1.0079, assetType: 'akcija' },
  { position: 2, name: 'Bambi', price: 4.0026, assetType: 'akcija' },
  { position: 3, name: 'Krušik', price: 6.941, assetType: 'obaveznica' },
  { position: 4, name: 'Zastava', price: 9.0122, assetType: 'obaveznica' },
  { position: 5, name: 'Rade Končar', price: 10.811, assetType: 'akcija' },
  { position: 6, name: 'Jaffa', price: 12.0107, assetType: 'obaveznica' },
  { position: 7, name: 'Aviogeneks', price: 14.0067, assetType: 'akcija' },
  { position: 8, name: 'Dijamant', price: 15.9994, assetType: 'akcija' },
  {
    position: 9,
    name: 'Železnice Srbije',
    price: 18.9984,
    assetType: 'akcija',
  },
  { position: 10, name: 'Knjaz Miloš', price: 20.1797, assetType: 'akcija' },
];

@Component({
  selector: 'stocks',
  templateUrl: 'stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'price', 'assetType'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
