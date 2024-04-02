import { Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Options {
	lastPriceCalls: number;
	thetaCalls: number;
	bidCalls: number;
	askCalls: number;
	volumeCalls: number;
	openInterestCalls: number;
	strike: number;
	lastPricePuts: number;
	thetaPuts: number;
	bidPuts: number;
	askPuts: number;
	volumePuts: number;
	openInterestPuts: number;
}

const DATA: Options[] = [
	{
		lastPriceCalls: 1,
		thetaCalls: 0,
		bidCalls: 0,
		askCalls: 1,
		volumeCalls: 1,
		openInterestCalls: 1,
		strike: 1,
		lastPricePuts: 1,
		thetaPuts: 0,
		bidPuts: 0,
		askPuts: 1,
		volumePuts: 1,
		openInterestPuts: 1,
	},
	{
		lastPriceCalls: 3,
		thetaCalls: 5,
		bidCalls: 7,
		askCalls: 1,
		volumeCalls: 1,
		openInterestCalls: 9,
		strike: 5,
		lastPricePuts: 1,
		thetaPuts: 0,
		bidPuts: 0,
		askPuts: 1,
		volumePuts: 1,
		openInterestPuts: 1,
	},
	{
		lastPriceCalls: 4,
		thetaCalls: 1,
		bidCalls: 8,
		askCalls: 1,
		volumeCalls: 1,
		openInterestCalls: 6,
		strike: 2,
		lastPricePuts: 1,
		thetaPuts: 0,
		bidPuts: 0,
		askPuts: 1,
		volumePuts: 1,
		openInterestPuts: 1,
	},
];

@Component({
	selector: 'app-options',
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'lastPriceCalls',
		'thetaCalls',
		'bidCalls',
		'askCalls',
		'volumeCalls',
		'openInterestCalls',
		'strike',
		'lastPricePuts',
		'thetaPuts',
		'bidPuts',
		'askPuts',
		'volumePuts',
		'openInterestPuts',
	];
	dataSource = new MatTableDataSource(DATA);

	findOptionById(rowData: any) {
		console.log('Double clicked row data:', rowData);
	}

	Filterchange(data: Event) {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
	}

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
