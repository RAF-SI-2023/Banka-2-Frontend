import { UserDto } from './user-dto';

export interface AgentDto extends UserDto {
	userLimit: number;
	leftOfLimit: number;
}

export function isAgentDto(obj: any): obj is AgentDto {
	return (
		typeof obj === 'object' && 'userLimit' in obj && 'leftOfLimit' in obj
	);
}
