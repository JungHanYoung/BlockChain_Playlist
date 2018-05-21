import * as express from 'express';

import userRouter from './user';

const router: express.Router = express.Router();

router.get('/', (_, res) => res.send('API OK'));
router.use('/user', userRouter);

export default router;
