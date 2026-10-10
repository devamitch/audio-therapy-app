import { useMemo } from 'react';
import { View } from 'react-native';

import Player, { PlayerProps } from './Player';
import PlayerListContainer, { PlayerListContainerProps } from './PlayerListContainer';

import { SearchPlayerParam } from '@/navigation/types';
import { LayoutStyle } from '@/styles';

type PlayerListProps = Omit<PlayerListContainerProps, 'children' | 'hideHeader'> & {
	players?: PlayerProps[];
	rows?: number;
	onPlayerClick?: (type?: SearchPlayerParam, id?: string) => void;
};

function divideArray<T>(arr: T[], num: number) {
	const chunkSize = Math.ceil(arr.length / num);

	return Array.from({ length: num }, () => arr.splice(0, chunkSize));
}

const PlayerList: React.FC<PlayerListProps> = ({
	players = [],
	rows = 1,
	onPlayerClick,
	...props
}) => {
	const players2 = useMemo(() => {
		if (rows < 2) {
			return [[], []];
		}

		return divideArray(players, rows);
	}, [players, rows]);

	return rows < 2 ? (
		<PlayerListContainer {...props}>
			{players?.map((player, index) => (
				<Player
					key={index?.toString()}
					onPress={() =>
						onPlayerClick && onPlayerClick(props?.type || 'headliner', player?.id)
					}
					{...player}
				/>
			))}
		</PlayerListContainer>
	) : (
		players2?.map((playerz, i) => (
			<View style={LayoutStyle.fill} key={i?.toString()}>
				<PlayerListContainer hideHeader={i !== 0} {...props}>
					{playerz?.map((player, index) => (
						<Player
							key={index?.toString()}
							onPress={() =>
								onPlayerClick &&
								onPlayerClick(props?.type || 'headliner', player?.id)
							}
							{...player}
						/>
					))}
				</PlayerListContainer>
			</View>
		))
	);
};

export default PlayerList;
