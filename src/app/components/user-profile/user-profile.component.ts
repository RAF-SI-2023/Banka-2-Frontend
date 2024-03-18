import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dtos/user-dto';
import { PrivateClientDto } from '../../dtos/private-client-dto';
import { CorporateClientDto } from '../../dtos/corporate-client-dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: UserDto | null = null;
  privateClient: PrivateClientDto | null = null;
  corporateClient: CorporateClientDto | null = null;
  isPrivateClient: boolean = false;
  isCorporateClient: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.userService.getUserById().subscribe({
      next: (user: UserDto) => {
        this.user = user;
        if ('surname' in user) {
          this.privateClient = user as PrivateClientDto;
          this.corporateClient = null;
        } else if ('primaryAccountNumber' in user) {
          this.corporateClient = user as CorporateClientDto;
          this.privateClient = null;
        }
      },
      error: (error) => {
        console.error('Greška prilikom dohvatanja podataka o korisniku', error);
      }
    });
  }

  setUserDetails(user: UserDto | PrivateClientDto | CorporateClientDto, isPrivate: boolean): void {
    this.user = user;
    this.isPrivateClient = isPrivate;
    this.isCorporateClient = !isPrivate;
  }
}
