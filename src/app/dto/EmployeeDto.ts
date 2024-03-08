import { UserDto } from "./UserDto";

export interface EmployeeDto extends UserDto {
    name: string;
    surname: string;
    gender: string;
    position: string;
    department: string;
}
