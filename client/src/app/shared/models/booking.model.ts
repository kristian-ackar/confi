import { Conference } from '.';

export class Booking {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	created: Date;
	updated: Date;
	conference: Conference;
}
