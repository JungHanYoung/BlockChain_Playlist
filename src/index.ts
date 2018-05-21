import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

// router
import ApiRouter from './routes';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/v1', ApiRouter);

app.listen(4000, () => console.log('Server is listening on port 4000'));
