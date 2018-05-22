import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import { createConnection } from 'typeorm';
import * as session from 'express-session';

// router
import ApiRouter from './routes';

createConnection({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'jhy5968!',
	database: 'blockchain',
	synchronize: true,
	logging: true,
	entities: [ 'src/models/**/*.ts' ],
	migrations: [ 'src/migration/**/*.ts' ],
	subscribers: [ 'src/subscriber/**/*.ts' ]
}).then(() => {
	const app: express.Application = express();

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(
		session({
			secret: 'blockchain',
			resave: false,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure: false
			}
		})
	);

	app.use('/api/v1', ApiRouter);

	app.listen(4000, () => console.log('Server is listening on port 4000'));
});
