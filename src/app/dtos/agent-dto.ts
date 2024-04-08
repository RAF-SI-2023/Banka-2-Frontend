import { UserDto } from './user-dto';

export interface AgentDto extends UserDto {
	limit: number;
	leftOfLimit: number;
}
