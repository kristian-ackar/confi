import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import env from 'environment';
import { Enums } from 'shared/libs/enums';

const credentials = {
	username: 'admin',
	password: 'admin'
}

export class AuthController {
	public static login = async (ctx: Context) => {
		let username = ctx.request.body.username;
		let password = ctx.request.body.password;

		if (credentials.username === username && credentials.password === password) {
			ctx.body = { token: jwt.sign({ username: username }, env.secret) };
		} else {
			ctx.status = Enums.HttpStatus.UNAUTHORIZED_401;
			ctx.body = 'Invalid credentials';
		}
	}
}