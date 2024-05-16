import { Component, inject, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditRequestDto } from 'src/app/dtos/credit-request-dto';
import { CreditService } from 'src/app/services/bank-service/credit.service';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { Subscription, throwError } from 'rxjs';

import { Role } from 'src/app/dtos/decoded-token-dto';


@Component({
    selector: 'app-credit-req-info-dialog',
    templateUrl: './request-info-dialog.component.html',
    styleUrls: ['./request-info-dialog.component.css'],
})

export class RequestInfoDialog {
    authService = inject(AuthService);

    newSelectedRow: CreditRequestDto = { ...this.data.selectedRow };
    private loginSubscription: Subscription | undefined;
    private changeDetector = inject(ChangeDetectorRef);


    isLoading = true;
    role: Role | null = null;
    Role = Role;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private creditService: CreditService,
    ) {
        this.fetchData();
    }


    ngOnInit() {
        this.role = this.authService.getRoleFromToken();
    }

    fetchData() {
        this.creditService
            .getCreditRequestById(this.data.selectedRow.id)
            .subscribe(response => {
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

    approveCreditReq() {
        this.creditService
            .postApproveCreditRequest(this.newSelectedRow.id)
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.error(error);
                },
            });
    }

    denyCreditReq() {
        this.creditService
            .putDenyCreditRequest(this.newSelectedRow.id)
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.error(error);
                },
            });
    }
    checkTokenRole(roleArray: Role[]) {
        if (!this.role) return false;
        return roleArray.includes(this.role);
    }


}
