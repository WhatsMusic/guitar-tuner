export const calculateTuning = (baseFrequency: number) => {
	const ratio = baseFrequency / 440;
	return {
		E: 328.125 * ratio,
		A: 234.38 * ratio,
		D: 281.25 * ratio,
		G: 375.0 * ratio,
		B: 468.75 * ratio,
		e: 656.25 * ratio
	};
	// return {
	// 	E: 82.41 * ratio,
	// 	A: 110.0 * ratio,
	// 	D: 146.83 * ratio,
	// 	G: 196.0 * ratio,
	// 	B: 246.94 * ratio,
	// 	e: 329.63 * ratio
	// };
};
