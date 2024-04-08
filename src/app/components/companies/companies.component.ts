import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IamService } from 'src/app/services/iam.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { CompanyInfoDialogComponent } from './dialogs/company-info-dialog/company-info-dialog.component';
import { UpdateCompanyDialogComponent } from './dialogs/update-company-dialog/update-company-dialog.component';
import { AddCompanyDialogComponent } from './dialogs/add-company-dialog/add-company-dialog.component';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'companyName',
		'faxNumber',
		'phoneNumber',
		'pib',
		'registryNumber',
		'identificationNumber',
		'activityCode',
		'address',
	];
	dataSource: MatTableDataSource<CompanyDto>;
	selectedRow: CompanyDto | null = null;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	protected readonly validateHorizontalPosition = validateHorizontalPosition;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private iamService: IamService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	selectRow(row: CompanyDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	viewCompany(row: CompanyDto): void {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(CompanyInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	fetchAllData(): void {
		this.iamService
			.getFindAllCompanies()
			.pipe(
				map(dataSource => {
					console.log(dataSource);
					this.dataSource.data = dataSource;
					return dataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}
	addCompany(): void{
		const dialogRef = this.dialog.open(AddCompanyDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			this.selectedRow = null;
			setTimeout(() => {
				this.fetchAllData();
			}, 1000);
		});
	}
	updateCompany(): void{
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(UpdateCompanyDialogComponent, {
				data: { selectedRow: this.selectedRow },
			});

			dialogRef.afterClosed().subscribe(result => {
				console.log(`Dialog result: ${result}`);
				this.selectedRow = null;
				setTimeout(() => {
					this.fetchAllData();
				}, 1000);
			});
		}
	}
	deleteCompany(): void{
  
	}

}
