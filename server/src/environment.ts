export default {
  debug: true,
	testing: true,
	port: 3001,
	secret: 'D4mnG00d$3cr3t',
	db: {
		postgres: {
			host     : 'manny.db.elephantsql.com',
			port     :  5432,
			username : '',
			password : '',
			database : '',
			synchronize: false
		}
	},
	mail: {
		secret: '',
		apiKey: '',
		from: 'info@confi.org'
	}
};