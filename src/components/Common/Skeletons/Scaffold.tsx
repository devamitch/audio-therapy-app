import { MotiSkeletonProps } from 'moti/build/skeleton/types';
import { Skeleton as MotiSkeleton } from 'moti/skeleton';

import { responsive } from '@/styles';

type Props = Omit<MotiSkeletonProps, 'Gradient'>;

export const Scaffold: React.FC<Props> = ({ height, width, radius = 10 }) => {
	const Height = typeof height === 'string' ? height : responsive(Number(height));

	const Width = typeof width === 'string' ? width : responsive(Number(width));

	const Radius = typeof radius === 'string' ? radius : responsive(Number(radius));

	return <MotiSkeleton height={Height} width={Width} radius={Radius} colorMode="light" />;
};
export const RoundSkeleton: React.FC<Props> = ({ height, width, ...props }) => (
	<Scaffold height={height} width={width} radius="round" {...props} />
);

export const SquareSkeleton: React.FC<Props> = ({ height, width, radius, ...props }) => (
	<Scaffold height={height} width={width} radius={radius ? radius : 'square'} {...props} />
);
