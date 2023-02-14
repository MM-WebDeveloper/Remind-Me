import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

interface SignUpBody {
	username?: string;
	email?: string;
	password: string;
}

export const signUp: RequestHandler<
	unknown,
	unknown,
	SignUpBody,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const passwordRaw = req.body.password;

	try {
		if (!username || !email || !passwordRaw) {
			throw createHttpError(400, 'Signup paramters missing');
		}

		const userExists = await UserModel.findOne({ username }).exec();

		if (userExists) {
			throw createHttpError(409, 'This username is already taken.');
		}

		const emailExists = await UserModel.findOne({ email }).exec();

		if (emailExists) {
			throw createHttpError(409, 'This email is already registered.');
		}

		const hashedPassword = await bcrypt.hash(passwordRaw, 12);

		const registeredUser = await UserModel.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json(registeredUser);
	} catch (error) {
		next(error);
	}
};
