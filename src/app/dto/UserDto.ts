export interface UserDto {
    id: number;
    dateOfBirth: number;
    email: string;
    phone: string;
    address: string;
    username: string;
    role: string;
    permissions: string[];
    active: boolean;
}
