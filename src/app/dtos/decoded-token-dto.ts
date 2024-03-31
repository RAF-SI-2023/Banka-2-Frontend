export interface DecodedTokenDto {
	sub: string;
	role: Role;
	permissions: string[];
	iat: number;
	exp: number;
	email: string;
}

export enum Role {
	ADMIN = 'ADMIN',
	EMPLOYEE = 'EMPLOYEE',
	SUPERVISOR = 'SUPERVISOR',
	AGENT = 'AGENT',
	USER = 'USER',
}
