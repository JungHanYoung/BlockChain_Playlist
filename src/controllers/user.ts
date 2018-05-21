import { Request, Response } from 'express';
import { User } from '../models/user';

export const getAllUsers = async (_: Request, res: Response) => {
	const allUsers = await User.find({});
	if (allUsers.length <= 0) {
		res.send('User is nothing');
	}
	res.json(allUsers);
};

export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await User.findOne(id);
	user ? res.json(user) : res.send('user is not found');
};

export const addUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = User.create({
		email,
		password
	});
	await user.save();
	res.json({
		success: true
	});
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email, password } = req.body;
	const user = await User.findOne(id);
	if (user) {
		user.email = email;
		user.password = password;
		await user.save();
		res.json({ success: true });
	} else {
		res.send('update fail');
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await User.findOne(id);
	if (user) {
		await user.remove();
		res.json({ success: true });
	} else {
		res.send('user is not found');
	}
};
