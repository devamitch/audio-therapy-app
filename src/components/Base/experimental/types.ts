type marginsLiterals =
	| 'margin'
	| 'marginVertical'
	| 'marginHorizontal'
	| 'marginTop'
	| 'marginBottom'
	| 'marginLeft'
	| 'marginRight'
	| 'padding'
	| 'paddingVertical'
	| 'paddingHorizontal'
	| 'paddingTop'
	| 'paddingBottom'
	| 'paddingLeft'
	| 'paddingRight'
	| 'height'
	| 'width'
	| 'borderRadius';

export type MarginPadding = Partial<Record<marginsLiterals, number>>;

// export type PropsTypes<T> = Omit<
// 	Partial<any> & Partial<ForwardRefInjectedProps> & Partial<T>,
// 	'color' | MarginLiterals
// > &
// 	MarginPadding;
