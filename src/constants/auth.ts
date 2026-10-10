import { createRef } from 'react';
import { BottomSheet } from '@gorhom/bottom-sheet';
import { z } from 'zod';

export const PASSWORD_REGEX =
	'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})' as const;

export const SIGNIN_ZOD_OBJECT = {
	email: z.string().trim().min(8, { message: 'Email must be 8 letter long' }).email().optional(),
	phone_number: z.string().trim().min(8, { message: 'Email must be 8 letter long' }).optional(),
	password: z.string().min(8, { message: 'Password must be 8 letter long' }).trim(),
};
// notification_token?: string;
// apple_token?: string;
// notificationToken?: string;
// appleToken?: string;
export const SIGNUP_ZOD_OBJECT = {
	name: z.string().trim().min(2, { message: 'Name must be 2 letter long' }).max(60),
	notification_token: z.string().trim().optional(),
	apple_token: z.string().trim().optional(),
	notificationToken: z.string().trim().optional(),
	appleToken: z.string().trim().optional(),
	authToken: z.string().trim().optional(),
	icon: z.string().trim().min(8, { message: 'Avatar must be 8 letter long' }).max(60).optional(),
	location: z
		.string()
		.trim()
		.min(8, { message: 'Location must be 8 letter long' })
		.max(60)
		.optional(),
	phone_number: z.string().trim().optional(),
	tokenId: z.string().trim().optional(),
	email: z.string().trim().min(2, { message: 'Email must be 2 letter long' }).email(),
	password: z.string().min(8, { message: 'Password must be 8 letter long' }).trim(),
};

export const UPDATE_ZOD_OBJECT = {
	name: z.string().trim().min(2, { message: 'Name must be 2 letter long' }).max(60),
	icon: z.string().trim().optional(),
	location: z
		.string()
		.trim()
		.min(8, { message: 'Location must be 8 letter long' })
		.max(60)
		.optional(),
	phone_number: z.string().trim().optional(),
};

export const SIGNUP_ZOD_SCHEMA = z.object(SIGNUP_ZOD_OBJECT);
export type RegisterParams = z.infer<typeof SIGNUP_ZOD_SCHEMA>;

export const SIGNIN_ZOD_SCHEMA = z.object(SIGNIN_ZOD_OBJECT);
export type LoginParams = z.infer<typeof SIGNIN_ZOD_SCHEMA>;

export const UPDATE_ZOD_SCHEMA = z.object(UPDATE_ZOD_OBJECT);
export type UpdateParams = z.infer<typeof UPDATE_ZOD_SCHEMA>;

export const authBottomSheetRef = createRef<BottomSheet>(null);
