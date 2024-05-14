import { AccountNumberFormatPipe } from './account-number-format.pipe';

describe('AccountNumberFormatPipe', () => {
	it('create an instance', () => {
		const pipe = new AccountNumberFormatPipe();
		expect(pipe).toBeTruthy();
	});
});
