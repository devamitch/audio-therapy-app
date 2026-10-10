import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';

import { AuthLayout } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import PrimaryGradientText from '@/components/Base/experimental/GradienText';
import { useAppStore } from '@/core/store';
import { CreateChalengeArgs, createChallange } from '@/lib/server/challange';
import { handleError, toast } from '@/lib/utils';
import { NEWZ_NAV_PROPS_TYPES } from '@/navigation/types';

const CreateChallengePage = ({ navigation }: NEWZ_NAV_PROPS_TYPES<'Create'>) => {
	const [state, setState] = useState<CreateChalengeArgs>();

	const user = useAppStore((state) => state?.user);

	const { mutate, isLoading } = useMutation({
		mutationKey: [state],
		mutationFn: createChallange,
		onError: (error) => handleError(error),
		onSuccess(data) {
			console.log({ data });
			toast.success('Successful artist registration');
			navigation.navigate('Newz');
		},
	});

	console.log({ id: user?._id || user?.id });

	return (
		<AuthLayout
			height={600}
			submitLabel="Create"
			onSubmit={() => mutate({ ...state, artist: user?._id || user?.id })}
			loading={isLoading}
			header={
				<PrimaryGradientText style={styles.title}>Create Challenge</PrimaryGradientText>
			}
		>
			<View style={styles.formContainer}>
				{/* Challenge Title */}
				<MaterialTextEditorComponent
					placeholder="Challenge Title"
					value={state?.title}
					onChangeText={(title) => setState((prev) => ({ ...prev, title }))}
				/>
				<MaterialTextEditorComponent
					placeholder="Chalange Youtube Link Id"
					value={state?.link}
					onChangeText={(link) => setState((prev) => ({ ...prev, link }))}
				/>

				{/* Challenge Description */}
				<MaterialTextEditorComponent
					style={styles.descriptionInput}
					placeholder="Challenge Description"
					multiline
					numberOfLines={4}
					value={state?.description}
					onChangeText={(description) => setState((prev) => ({ ...prev, description }))}
				/>
			</View>
		</AuthLayout>
	);
};

const styles = StyleSheet.create({
	descriptionInput: {
		height: 80,
	},
	formContainer: {
		flex: 1,
		gap: 20,
		justifyContent: 'center',
	},

	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default CreateChallengePage;
