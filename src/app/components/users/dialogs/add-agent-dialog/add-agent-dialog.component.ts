import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IamService } from 'src/app/services/iam.service';
import { AgentDto } from 'src/app/dtos/agent-dto';

@Component({
	selector: 'app-add-agent-dialog',
	templateUrl: './add-agent-dialog.component.html',
	styleUrls: ['./add-agent-dialog.component.css'],
})
export class AddAgentDialogComponent {
	email: string = '';
	dateOfBirth: number = 0;
	username: string = '';
	phone: string = '';
	address: string = '';
	role: string = '';

	limit: number = 0;
	leftOfLimit: number = 0;

	availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];

	constructor(
		private fb: FormBuilder,
		private iamService: IamService,
	) {}

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addAgent() {
		const agentDto: AgentDto = {
			id: 0,
			email: this.email,
			dateOfBirth: this.dateOfBirth,
			username: this.email,
			phone: this.phone,
			address: this.address,
			role: 'AGENT',
			permissions: this.permissions,
			limit: this.limit,
			leftOfLimit: this.leftOfLimit,
		};

		console.log(agentDto);
		this.iamService.postCreateAgent(agentDto).subscribe({
			next: response => console.log('Agent dodat', response),
			error: error => console.error('Greška pri dodavanju agenta', error),
		});
	}
}
