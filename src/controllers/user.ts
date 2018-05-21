import { Request, Response } from 'express';

export const allUsers = (_: Request, res: Response) => res.send('allUsers');

export const getUserById = (req: Request, res: Response) => res.send('getUserById ' + req.params.id);

export const addUser = (_: Request, res: Response) => res.send('addUser');

export const updateUser = (req: Request, res: Response) => res.send('updateUser ' + req.params.id);

export const deleteUser = (req: Request, res: Response) => res.send('deleteUser ' + req.params.id);
