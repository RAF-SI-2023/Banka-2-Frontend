import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from "@angular/material/table";
import { validateHorizontalPosition } from "@angular/cdk/overlay";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from 'src/app/dto/UserDto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})

export class AdminpanelComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'dateOfBirth', 'phone', 'address', 'role', 'active'];
  dataSource: MatTableDataSource<UserDto>;
  selectedRow: UserDto | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  protected readonly validateHorizontalPosition = validateHorizontalPosition;

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) {
    this.dataSource = new MatTableDataSource();
    this.fetchData();
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
    if (this.sort)
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: UserDto) {
    if (this.selectedRow?.id != row.id) {
      this.selectedRow = row;
      console.log(this.selectedRow);
    }
  }

  fetchData(): void {
    this.userService.getFindAll()
      .pipe(
        map(dataSource => {
          this.dataSource.data = dataSource;
          return dataSource;
        }),
        catchError(error => {
          console.error('Error loading data.', error);
          return throwError(() => error);
        })
      ).subscribe();
  }

  deleteUser(): void {
    if (this.selectedRow != null) {
      this.userService.delete(this.selectedRow.email)
        .pipe(
          catchError(error => {
            console.error('Error loading data.', error);
            return throwError(() => error);
          })
        ).subscribe(() => {
          this.selectedRow = null;
          this.fetchData();
        });
    }
  }
}