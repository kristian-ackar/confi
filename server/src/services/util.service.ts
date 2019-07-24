import env from 'environment';

export class UtilService {
	public static bookingCode = (bookingId: number) => {
		return `CONFI${bookingId}`;
	};
}