import * as express from 'express';

import { login, loginInfo } from '../controllers/auth';
import userRouter from './user';
import blockRouter from './blockchain';

const router: express.Router = express.Router();

router.get('/', (_, res) => res.send('API OK'));

router.post('/login', login);
router.get('/loginInfo', loginInfo);

router.use('/user', userRouter);
router.use('/block', blockRouter);

export default router;
