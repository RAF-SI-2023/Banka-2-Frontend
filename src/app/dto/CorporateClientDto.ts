import { UserDto } from "./UserDto";

export interface CorporateClientDto extends UserDto {
    name: string;
    primaryAccountNumber: string;
}
