import * as SGM from '@sendgrid/mail';
import { MailData } from '@sendgrid/helpers/classes/mail';
import env from 'environment';

SGM.setApiKey(env.mail.apiKey);

export class MailService {
	public static send = async (mailData: MailData) => {
		return SGM.send(mailData);
	};
}