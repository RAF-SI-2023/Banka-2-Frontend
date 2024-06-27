import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { Role } from 'src/app/dtos/decoded-token-dto';
import { ContractDto, ContractStatus } from 'src/app/dtos/contract-dto';
import { ContractService } from 'src/app/services/otc-service/contract.service';

@Component({
	selector: 'app-contract-info-dialog',
	templateUrl: './contract-info-dialog.component.html',
	styleUrls: ['./contract-info-dialog.component.css'],
})
export class ContractInfoDialogComponent {
	newSelectedRow: ContractDto = { ...this.data.selectedRow };
	isLoading = true;

	role: Role | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthService,
		private contractService: ContractService,
	) {
		this.fetchData();
		this.isLoading = false;
		this.role = this.authService.getRoleFromToken();
	}

	fetchData() {
		this.contractService
			.getContractById(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.isLoading = false;
			});
	}

	checkTokenRole(roleArray: string[]) {
		if (!this.role) return false;
		return roleArray.includes(this.role);
	}

	protected readonly Role = Role;

	checkButtonCondition(): boolean {
		if (
			this.checkTokenRole([Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR]) &&
			this.newSelectedRow.bankConfirmation
		) {
			return false;
		} else if (
			this.checkTokenRole([Role.USER ,Role.AGENT]) &&
			this.newSelectedRow.sellerConfirmation
		) {
			return false;
		}
		return true;
	}

	approveContract() {
		if (this.checkTokenRole([Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR])) {
			this.bankApproveContract();
		} else if (this.checkTokenRole([Role.USER])) {
			this.sellerApproveContract();
		}
	}

	denyContract() {
		if (this.checkTokenRole([Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR])) {
			this.bankDenyContract();
		} else {
			this.sellerDenyContract();
		}
	}

	bankApproveContract() {
		this.contractService
			.putBankApproveContractById(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	bankDenyContract() {
		this.contractService
			.putBankDenyContractById(this.newSelectedRow.id, '')
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	sellerApproveContract() {
		this.contractService
			.putSellerApproveContractById(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	sellerDenyContract() {
		this.contractService
			.putSellerDenyContractById(this.newSelectedRow.id, '')
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	protected readonly ContractStatus = ContractStatus;
}
