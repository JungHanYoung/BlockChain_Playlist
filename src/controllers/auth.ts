import { Request, Response } from 'express';
import { User } from '../models/user';
import { compareSync } from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		if (compareSync(password, user.password)) {
			const sess: any = req.session;
			sess.loginInfo = {
				id: user.id,
				email: user.email
			};
		}
		res.json({ success: true });
	} else {
		res.send('login fail');
	}
};

export const loginInfo = async (req: Request, res: Response) => {
	const sess: any = req.session;
	res.json({
		loginInfo: sess.loginInfo
	});
};
