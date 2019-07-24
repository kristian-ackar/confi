import { Booking } from '.';

export class Conference {
	id: number;
	name: string;
	intro?: string;
	title?: string;
	description?: string;
	start: Date;
	end: Date;
	created?: Date;
	updated?: Date;
	bookings?: Booking[];
}
