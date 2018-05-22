import * as express from 'express';
import { getAllBlock } from '../controllers/blockchain';

const router: express.Router = express.Router();

router.route('/').get(getAllBlock);

export default router;
