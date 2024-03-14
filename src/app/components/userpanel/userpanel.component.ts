import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/UserDto';
import { PrivateClientDto } from '../../dto/PrivateClientDto';
import { CorporateClientDto } from '../../dto/CorporateClientDto';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent {
  user: UserDto | PrivateClientDto | CorporateClientDto | null = null;
  isPrivateClient: boolean = false;
  isCorporateClient: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.userService.getUserById().subscribe({
      next: (user: UserDto) => {
        if ('surname' in user) {
          let privateUser = user as PrivateClientDto;
          console.log(privateUser.surname);
          this.setUserDetails(privateUser, true);
        } else if ('primaryAccountNumber' in user) {
          let corporateUser = user as CorporateClientDto;
          console.log(corporateUser.primaryAccountNumber);
          this.setUserDetails(corporateUser, false);
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
