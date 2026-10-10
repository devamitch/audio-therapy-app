import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarProps {
	selectedDate: Date;
	onDateSelect: (date: Date) => void;
	color: string;
}

const defaultProps: CalendarProps = {
	selectedDate: new Date(),
	color: 'lightblue',
	onDateSelect: () => {},
};

const CalendarComponent: React.FC<CalendarProps> = (props) => {
	const { selectedDate, color, onDateSelect } = props;

	const daysInMonth = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth() + 1,
		0
	).getDate();

	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.monthYearText}>
					{selectedDate.toLocaleString('default', { month: 'long' })}{' '}
					{selectedDate.getFullYear()}
				</Text>
			</View>
			<View style={styles.daysContainer}>
				{days.map((day) => (
					<TouchableOpacity
						key={day}
						onPress={() =>
							onDateSelect(
								new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
							)
						}
					>
						<View
							style={[
								styles.day,
								{ backgroundColor: color },
								selectedDate.getDate() === day ? styles.selectedDay : {},
							]}
						>
							<Text style={styles.dayText}>{day}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

CalendarComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	day: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		margin: 5,
		width: 40,
	},
	dayText: {
		color: 'white',
	},
	daysContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	header: {
		marginBottom: 10,
	},
	monthYearText: {
		color: 'black',
		fontSize: 18,
	},
	selectedDay: {
		backgroundColor: 'darkblue',
	},
});

export default CalendarComponent;
