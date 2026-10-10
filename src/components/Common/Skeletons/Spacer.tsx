import { View } from 'react-native';

import { responsive } from '@/styles';
interface SpacerProps {
	height?: number;
}

const Spacer: React.FC<SpacerProps> = ({ height = 16 }) => (
	<View style={{ height: responsive(height) }} />
);

export default Spacer;
