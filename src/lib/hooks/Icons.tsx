import { Entypo, Feather, FontAwesome5, Fontisto } from '@expo/vector-icons';

import type { ShareIconProps } from './useShareMenu';

import { ALL_COLORS, responsive } from '@/styles';

const SIZE = responsive(24);

const isAvailable = (available?: boolean) =>
	!available ? ALL_COLORS['grey-868686'] : ALL_COLORS.green;

export const FaceBookIcon = ({ available }: ShareIconProps) => (
	<FontAwesome5 name="facebook" size={SIZE} color={isAvailable(available)} />
);
export const InstagramIcon = ({ available }: ShareIconProps) => (
	<Entypo name="instagram" size={SIZE} color={isAvailable(available)} />
);
export const WhatsappIcon = ({ available }: ShareIconProps) => (
	<FontAwesome5 name="whatsapp" size={SIZE} color={isAvailable(available)} />
);

export const TelegramIcon = ({ available }: ShareIconProps) => (
	<FontAwesome5 name="telegram" size={SIZE} color={isAvailable(available)} />
);
export const TwitterIcon = ({ available }: ShareIconProps) => (
	<FontAwesome5 name="twitter" size={SIZE} color={isAvailable(available)} />
);
export const PinterestIcon = ({ available }: ShareIconProps) => (
	<FontAwesome5 name="pinterest" size={SIZE} color={isAvailable(available)} />
);
export const ShareIcon = ({ available }: ShareIconProps) => (
	<Fontisto name="share-a" size={responsive(18)} color={isAvailable(available)} />
);
export const CloseIcon = ({ available }: ShareIconProps) => (
	<Feather name="chevrons-down" size={SIZE} color={isAvailable(available)} />
);
