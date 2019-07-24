import { Context } from 'koa';
import { getRepository, DeleteResult } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Conference } from './../models';
import { Enums } from 'shared/libs/enums';

export class ConferenceController {
	public static get = async (ctx: Context) => {
		const relations: string[] = ctx.query.eager === 'true' ? ['bookings'] : [];

		 // Load conference by id
		 const conference: Conference = await getRepository(Conference).findOne(ctx.params.id, { relations: relations });

		 if (conference) {
				 // Return OK status code and loaded conference object
				 ctx.status = Enums.HttpStatus.OK_200;
				 ctx.body = conference;
		 } else {
				 // Return a NOT FOUND status code and error message
				 ctx.status = Enums.HttpStatus.NOT_FOUND_404;
				 ctx.body = 'The conference you are trying to retrieve don\'t exist in the db';
		 }
	}

	public static getAll = async (ctx: Context) => {
		const relations: string[] = ctx.query.eager === 'true' ? ['bookings'] : [];

		// Load all conferences
		const conferences: Conference[] = await getRepository(Conference).find({ relations: relations });
		
		// Return OK status code and loaded conferences array
		ctx.status = Enums.HttpStatus.OK_200;
		ctx.body = conferences;
	}

	public static create = async (ctx: Context) => {
		let conference: Conference = new Conference();
		conference.map(ctx.request.body);

		// Validate conference entity
		const errors: ValidationError[] = await validate(conference, { skipMissingProperties: true }); // errors is an array of validation errors
		
		if (errors.length > 0) {
			// Return BAD REQUEST status code and errors array
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = errors;
		} else {
			// save the user contained in the POST body
			const conf = await getRepository(Conference).save(conference);
			// return CREATED status code and updated conference
			ctx.status = Enums.HttpStatus.CREATED_201;
			ctx.body = conf;
		}
	}

	public static update = async (ctx: Context) => {
		let conference: Conference = new Conference();
		conference.map(ctx.request.body);

		// Validate conference entity
		const errors: ValidationError[] = await validate(conference, { skipMissingProperties: true }); // errors is an array of validation errors

		if (errors.length > 0) {
			// Return BAD REQUEST status code and errors array
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = errors;
		} else {
				// Update the conference contained in the PUT body
				let updRes = await getRepository(Conference).update(ctx.params.id, conference);
				console.log(updRes);
				// Return CREATED status code and updated conference
				ctx.status = Enums.HttpStatus.CREATED_201;
				ctx.body = updRes;
		}
	}

	public static delete = async (ctx: Context) => {
		// Get a conference repository to perform delete operation
		let delRes: DeleteResult = await getRepository(Conference).delete(ctx.params.id);

		if (delRes.affected !== 0) {
			// Return a NO CONTENT status code
			ctx.status = Enums.HttpStatus.NO_CONTENT_204;
		} else {
			// Return a BAD REQUEST status code and error message
			ctx.status = Enums.HttpStatus.BAD_REQUEST_400;
			ctx.body = 'The conference you are trying to delete doesn\'t exist in the db'
		}
	}
}