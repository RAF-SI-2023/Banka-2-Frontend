import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/iam-service/user.service';
import { AgentDto } from 'src/app/dtos/agent-dto';
import {
	emailValidator,
	phoneNumberValidator,
} from '../../../utils/validators';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-add-agent-dialog',
	templateUrl: './add-agent-dialog.component.html',
	styleUrls: ['./add-agent-dialog.component.css'],
})
export class AddAgentDialogComponent {
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
		limit: [null, [Validators.required, digitValidator()]],
		leftOfLimit: [null, [Validators.required, digitValidator()]],
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
		if (this.createAgentForm.valid) {
			const dateOfBirthControl = this.createAgentForm.get('dateOfBirth');
			const permissionsControl = this.createAgentForm.get('permissions');

			if (dateOfBirthControl && permissionsControl) {
				const dateOfBirthValue = dateOfBirthControl.value;
				const dateOfBirthEpoch = dateOfBirthValue
					? new Date(dateOfBirthValue).getTime()
					: 0;
				const selectedPermissions = permissionsControl.value;

				this.createAgentForm.patchValue({
					dateOfBirth: dateOfBirthEpoch.toString(),
					permissions: selectedPermissions,
				});

				const agentDto = this.createAgentForm
					.value as unknown as AgentDto;

				console.log(agentDto);
				this.userService.postCreateAgent(agentDto).subscribe({
					next: response => console.log(response),
					error: error => console.error(error),
				});
			} else {
				console.error('Form controls are null.');
			}
		}
	}
}
