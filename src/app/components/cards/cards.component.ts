import { Component } from '@angular/core';
import { DropdownOptions, DropdownOption } from '../../utils/constants';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
	cardOptions: DropdownOption[] = DropdownOptions.cardSettingsType;
	cardTypeOptions: DropdownOption[] = DropdownOptions.cardTypeOptions;
}
