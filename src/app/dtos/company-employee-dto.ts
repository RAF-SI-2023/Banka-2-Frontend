import { UserDto } from './user-dto';

export interface CompanyEmployeeDto extends UserDto {
	pib: number;
}

export function isCompanyEmployeeDto(obj: any): obj is CompanyEmployeeDto {
	return typeof obj === 'object' && 'pib' in obj;
}
