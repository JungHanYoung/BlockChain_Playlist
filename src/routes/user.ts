import * as express from 'express';
import { allUsers, addUser, getUserById, updateUser, deleteUser } from '../controllers/user';

const router: express.Router = express.Router();

router.route('/').get(allUsers).post(addUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
