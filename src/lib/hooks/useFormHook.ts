import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { HookFormFieldValues, UseHookFormProps, ZOD_FORM_VALUE_TYPES } from './types';

const useHookForm = <StringType extends string, T extends HookFormFieldValues<StringType>>({
	schema,
	zodObject,
	onSubmit: callback,
	defaultValues,
}: UseHookFormProps<StringType, T>) => {
	const Scema = schema ? schema : zodObject ? z.object(zodObject) : undefined;

	const resolver = Scema ? zodResolver(Scema) : undefined;

	const data = useForm<ZOD_FORM_VALUE_TYPES<StringType, T>>({
		resolver,
		...(defaultValues ? defaultValues : {}),
	});

	const { handleSubmit: handle } = data;

	const handleSubmit = handle(callback);

	return {
		...data,
		handleSubmit,
	};
};

export default useHookForm;
