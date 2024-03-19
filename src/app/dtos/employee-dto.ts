import { UserDto } from './user-dto';

export interface EmployeeDto extends UserDto {
  name: string;
  surname: string;
  gender: string;
  position: string;
  department: string;
  active: boolean;
}

export function isEmployeeDto(obj: any): obj is EmployeeDto {
  return (
    typeof obj === 'object' &&
    'name' in obj &&
    'surname' in obj &&
    'gender' in obj &&
    'position' in obj &&
    'department' in obj &&
    'active' in obj
  );
}
