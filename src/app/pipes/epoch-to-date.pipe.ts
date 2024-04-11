import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'epochToDate',
})
export class EpochToDatePipe implements PipeTransform {
	transform(epoch: number): Date | null {
		if (!epoch && epoch !== 0) {
			return null; // Return null if the epoch value is false
		}

		let milliseconds: number;

		console.log(epoch);
		switch (true) {
			case epoch < 10000000000: // Epoch in seconds
				console.log('epochToDate (s): ', epoch);
				milliseconds = epoch * 1000;
				console.log('epochToDate (s-ms): ', milliseconds);
				break;
			case epoch < 10000000000000: // Epoch in milliseconds
				console.log('epochToDate (ms): ', epoch);
				milliseconds = epoch;
				console.log('epochToDate (ms-ms): ', milliseconds);
				break;
			case epoch < 10000000000000000: // Epoch in microseconds
				console.log('epochToDate (us) ', epoch);
				milliseconds = Math.floor(epoch / 1000);
				console.log('epochToDate (us-ms): ', milliseconds);
				break;
			case epoch < 10000000000000000000: // Epoch in nanoseconds
				console.log('epochToDate (ns): ', epoch);
				milliseconds = Math.floor(epoch / 1000000);
				console.log('epochToDate (ns-ms): ', milliseconds);
				break;
			default:
				throw new Error('Invalid epoch format');
		}

		return new Date(milliseconds);
	}
}
