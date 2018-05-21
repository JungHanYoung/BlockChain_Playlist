import * as express from 'express';

const router: express.Router = express.Router();

router.get('/', (_, res) => res.send('allUsers'));
router.post('/', (_, res) => res.send('addUser'));
router.get('/:id', (req, res) => res.send('getUserById ' + req.params.id));
router.put('/:id', (req, res) => res.send('updateUser' + req.params.id));
router.delete('/:id', (req, res) => res.send('deleteUser' + req.params.id));

export default router;
