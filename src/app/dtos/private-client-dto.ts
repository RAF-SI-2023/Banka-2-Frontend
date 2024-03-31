import { UserDto } from './user-dto';

export interface PrivateClientDto extends UserDto {
	name: string;
	surname: string;
	gender: string;
	primaryAccountNumber: string;
}

export function isPrivateClientDto(obj: any): obj is PrivateClientDto {
	return (
		typeof obj === 'object' &&
		'name' in obj &&
		'surname' in obj &&
		'gender' in obj &&
		'primaryAccountNumber' in obj
	);
}
