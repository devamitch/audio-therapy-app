import type { SubmitHandler } from 'react-hook-form';
import type {
	z,
	ZodAny,
	ZodBigInt,
	ZodBoolean,
	ZodDate,
	ZodNever,
	ZodNull,
	ZodString,
	ZodSymbol,
	ZodTypeAny,
	ZodUndefined,
	ZodUnknown,
	ZodVoid,
} from 'zod';

export type ZodTypes =
	| ZodString
	| ZodBoolean
	| ZodBigInt
	| ZodVoid
	| ZodAny
	| ZodDate
	| ZodSymbol
	| ZodUndefined
	| ZodNull
	| ZodUnknown
	| ZodNever
	| ZodTypeAny;

export type HookFormFieldValues<StringType extends string> = Record<StringType, ZodTypes>;

export type ZOD_FORM_VALUE_TYPES<
	StringType extends string,
	T extends HookFormFieldValues<StringType>,
> = {
	[k in keyof z.baseObjectOutputType<T>]: z.baseObjectOutputType<T>[k];
};

export interface UseHookFormProps<
	StringType extends string,
	T extends HookFormFieldValues<StringType>,
> {
	schema?: z.Schema<T>;
	zodObject?: T;
	onSubmit: SubmitHandler<ZOD_FORM_VALUE_TYPES<StringType, T>>;
	defaultValues?: ZOD_FORM_VALUE_TYPES<StringType, T>;
}

export interface HookFormProps<StringType extends string, T extends HookFormFieldValues<StringType>>
	extends UseHookFormProps<StringType, T>,
		Omit<
			React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
			'onSubmit'
		> {
	title: string;
	submitText?: string;
	lodaing?: boolean;
	disabled?: boolean;
}
