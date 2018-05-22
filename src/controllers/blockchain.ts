import { Request, Response } from 'express';
import { User } from '../models/user';

export const getAllBlock = async (req: Request, res: Response) => {
	const session: any = req.session;
	const loginInfo = session.loginInfo;
	if (loginInfo) {
		const userId = session.loginInfo.id;
		const user = await User.findOne(userId);

		res.json(user);
	} else {
		res.send('not login');
	}
};
