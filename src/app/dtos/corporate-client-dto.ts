import { UserDto } from './user-dto';

export interface CorporateClientDto extends UserDto {
  name: string;
  primaryAccountNumber: string;
}

export function isCorporateClientDto(obj: any): obj is CorporateClientDto {
  return (
    typeof obj === 'object' && 'name' in obj && 'primaryAccountNumber' in obj
  );
}
