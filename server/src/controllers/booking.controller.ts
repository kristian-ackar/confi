import { Context } from 'koa';
import { getRepository, DeleteResult } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Booking, Conference } from './../models';
import { MailService, UtilService } from 'services';
import { Enums } from 'shared/libs/enums';
import env from 'environment';

export class BookingController {

	public static get = async (ctx: Context) => {
		 // Load booking by id
		 const booking: Conference = await getRepository(Conference).findOne(ctx.params.id);

		 if (booking) {
				 // Return OK status code and loaded booking object
				 ctx.status = Enums.HttpStatus.OK_200;
				 ctx.body = booking;
		 } else {
				 // Return a NOT FOUND status code and error message
				 ctx.status = Enums.HttpStatus.NOT_FOUND_404;
				 ctx.body = 'The booking you are trying to retrieve don\'t exist in the db';
		 }
	}

	public static getAll = async (ctx: Context) => {
		// Load all bookings
		const bookings: Booking[] = await getRepository(Booking).find();
		
		// Return OK status code and loaded bookings array
		ctx.status = Enums.HttpStatus.OK_200;
		ctx.body = bookings;
	}

	public static create = async (ctx: Context) => {
		let booking: Booking = new Booking();
		booking.map(ctx.request.body);

		// Validate booking entity
		const errors: ValidationError[] = await validate(booking, { skipMissingProperties: true });
		
		if (errors.length > 0) {
			// Return BAD REQUEST status code and errors array
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = errors;
		} else {
			// Save the booking contained in the POST body
			const book = await getRepository(Booking).save(booking);

			/* await  */MailService.send({
				to: book.email,
				from: env.mail.from,
				subject: 'You applied for a new conference',
				text: `Your entrance code: ${UtilService.bookingCode(book.id)}`,
				html: `Your entrance code: <strong>${UtilService.bookingCode(book.id)}</strong>`,
			});

			// Return CREATED status code and created booking
			ctx.status = Enums.HttpStatus.CREATED_201;
			ctx.body = book;
		}
	}

	public static update = async (ctx: Context) => {
		let booking: Booking = new Booking();
		booking.map(ctx.request.body);

		// Validate booking entity
		const errors: ValidationError[] = await validate(booking, { skipMissingProperties: true });

		if (errors.length > 0) {
			// Return BAD REQUEST status code and errors array
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = errors;
		} else {
				// Update the booking contained in the PUT body
				let updRes = await getRepository(Booking).update(ctx.params.id, booking);
				// Return CREATED status code and updated booking
				ctx.status = Enums.HttpStatus.CREATED_201;
				ctx.body = updRes;
		}
	}

	public static delete = async (ctx: Context) => {
		// Get a booking repository to perform delete operation
		let delRes: DeleteResult = await getRepository(Booking).delete(ctx.params.id);

		if (delRes.affected !== 0) {
			// Return a NO CONTENT status code
			ctx.status = Enums.HttpStatus.NO_CONTENT_204;
		} else {
			// Return a BAD REQUEST status code and error message
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = 'The booking you are trying to delete don\'t exist in the db'
		}
	}
}