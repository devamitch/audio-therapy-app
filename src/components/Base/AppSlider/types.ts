export type SlidersProps = {
	active?: boolean;
};

export type IntroScreenProp = ({ active }: SlidersProps) => JSX.Element;
export type AppIntroSliderProps = { introScreens: IntroScreenProp[] };
