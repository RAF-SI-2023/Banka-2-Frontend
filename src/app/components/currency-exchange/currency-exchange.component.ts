import { Component } from '@angular/core';

export interface Exchange {
	pair: string;
	exchangeRate: number;
	poslednjaIzmena: string;
}

const DATA: Exchange[] = [
	{ pair: ' ', exchangeRate: 1, poslednjaIzmena: '' },
	{ pair: ' ', exchangeRate: 1, poslednjaIzmena: '' },
	{ pair: ' ', exchangeRate: 1, poslednjaIzmena: '' },
	{ pair: ' ', exchangeRate: 1, poslednjaIzmena: '' },
];

@Component({
	selector: 'app-currency-exchange',
	templateUrl: './currency-exchange.component.html',
	styleUrls: ['./currency-exchange.component.css'],
})
export class CurrencyExchangeComponent {
	displayedColumns: string[] = ['pair', 'exchangeRate', 'poslednjaIzmena']; //?
	dataSource = DATA;

	convert() {}
}
