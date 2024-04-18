import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/iam-service/user.service';
import { AgentDto } from 'src/app/dtos/agent-dto';
import {emailValidator, phoneNumberValidator} from "../../../../utils/validators";

@Component({
	selector: 'app-add-agent-dialog',
	templateUrl: './add-agent-dialog.component.html',
	styleUrls: ['./add-agent-dialog.component.css'],
})
export class AddAgentDialogComponent {
	email = '';
	dateOfBirth = 0;
	username = '';
	phone = '';
	address = '';
	role = '';

	limit = 0;
	leftOfLimit = 0;

	availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];

	createAgentForm = this.fb.group({
		email: ['', [Validators.required, emailValidator()]],
		dateOfBirth: ['', [Validators.required]],
		phone: ['', [Validators.required, phoneNumberValidator()]],
		address: ['', [Validators.required]],
		limit: [0, [Validators.required]],
		leftOfLimit: [0, [Validators.required]],
		permissions: [[]], // Add permissions field to form
	});

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
	) {}

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addAgent() {
		if(this.createAgentForm.invalid) {
			return;
		}

		const dateOfBirthValue = this.createAgentForm.get('dateOfBirth')!.value;
		const dateOfBirthEpoch = new Date(dateOfBirthValue!).getTime();
		const selectedPermissions = this.createAgentForm.get('permissions')!.value;

		this.createAgentForm.patchValue({
			dateOfBirth: dateOfBirthEpoch.toString(),
			permissions: selectedPermissions,
		});

		const agentDto = this.createAgentForm.value as unknown as AgentDto;

		console.log(agentDto);
		this.userService.postCreateAgent(agentDto).subscribe({
			next: response => console.log('Agent dodat', response),
			error: error => console.error('Greška pri dodavanju agenta', error),
		});
	}
}
