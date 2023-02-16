import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	try {
		if (!authenticatedUserId) {
			throw createHttpError(401, 'User not authenticated');
		}

		const user = await UserModel.findById(authenticatedUserId)
			.select('+ email')
			.exec();
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

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

		req.session.userId = registeredUser._id;

		res.status(201).json(registeredUser);
	} catch (error) {
		next(error);
	}
};

interface LoginBody {
	username?: string;
	password?: string;
}

export const login: RequestHandler<
	unknown,
	unknown,
	LoginBody,
	unknown
> = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) {
			throw createHttpError(400, 'Parameter missing');
		}

		const user = await UserModel.findOne({ username })
			.select('+password +email')
			.exec();

		if (!user) {
			throw createHttpError(401, 'Invalid credentials');
		}

		const pwdMatch = await bcrypt.compare(password, user.password);

		if (!pwdMatch) {
			throw createHttpError(401, 'Invalid credentials');
		}

		req.session.userId = user._id;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};