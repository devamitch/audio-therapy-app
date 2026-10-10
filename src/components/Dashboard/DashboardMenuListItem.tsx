import { Feather } from '@expo/vector-icons';

import { Button } from '../Base';
import { ButtonProps } from '../Base/experimental/Button';

import { responsive } from '@/lib/utils/responsive';
import { ColorStyle, FontSizeColorStyle, LayoutStyle } from '@/styles';

const DashboardMenuListItem: React.FC<ButtonProps> = ({ onPress, label = 'Joined Contests' }) => (
	<Button
		label={label}
		labelStyle={FontSizeColorStyle['heebo-600-12-white']}
		size="md"
		style={[ColorStyle['bg-dark-00181f'], LayoutStyle.between]}
		endIcon={<Feather name="chevron-right" size={responsive(24)} color="#F0AE33" />}
		onPress={onPress}
	/>
);

export default DashboardMenuListItem;
