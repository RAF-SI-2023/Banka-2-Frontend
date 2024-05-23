import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'epochToDate',
})
export class EpochToDatePipe implements PipeTransform {
	transform(epoch: number): Date | null {
		if (!epoch && epoch !== 0) {
			return null; // Return null if the epoch value is false
		}

		console.log('alo ', epoch);

		let milliseconds: number;

		if (epoch >= 0) {
			// Handle positive epoch values
			switch (true) {
				case epoch < 10000000000: // Epoch in seconds
					milliseconds = epoch * 1000;
					break;
				case epoch < 10000000000000: // Epoch in milliseconds
					milliseconds = epoch;
					break;
				case epoch < 10000000000000000: // Epoch in microseconds
					milliseconds = Math.floor(epoch / 1000);
					break;
				case epoch < 10000000000000000000: // Epoch in nanoseconds
					milliseconds = Math.floor(epoch / 1000000);
					break;
				default:
					throw new Error(
						`Invalid (positive) epoch format: ${epoch}`,
					);
			}
		} else {
			// Handle negative epoch values
			switch (true) {
				case epoch > -10000000000: // Epoch in seconds
					milliseconds = epoch * 1000;
					break;
				case epoch > -10000000000000: // Epoch in milliseconds
					milliseconds = epoch;
					break;
				case epoch > -10000000000000000: // Epoch in microseconds
					milliseconds = Math.ceil(epoch / 1000);
					break;
				case epoch > -10000000000000000000: // Epoch in nanoseconds
					milliseconds = Math.ceil(epoch / 1000000);
					break;
				default:
					throw new Error(
						`Invalid (negative) epoch format: ${epoch}`,
					);
			}
		}

		return new Date(milliseconds);
	}
}
