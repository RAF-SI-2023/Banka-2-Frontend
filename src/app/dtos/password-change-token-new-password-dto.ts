import { passwordChangeTokenDto } from './password-change-token-dto';

export interface passwordChangeTokenNewPasswordDto {
	newPassword: string;
	passwordChangeTokenDto: passwordChangeTokenDto;
}
