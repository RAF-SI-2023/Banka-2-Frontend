import { UserDto } from "./UserDto";

export interface PrivateClientDto extends UserDto {
    name: string;
    surname: string;
    gender: string;
    primaryAccountNumber: string;
}
