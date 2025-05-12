// Defines the structure for a single tuning preset
export interface TuningPreset {
	name: string;
	notes: { [key: string]: number };
}

// Defines the structure for calculated frequencies based on base A4
export interface CalculatedTuning {
	[key: string]: number; // e.g., E: 82.41, A: 110.00, ...
}

// Standard Guitar Tuning (EADGBe) based on A4=440Hz
export const STANDARD_TUNING_NOTES: { [key: string]: number } = {
	E: 82.41, // E2
	A: 110.0, // A2
	D: 146.83, // D3
	G: 196.0, // G3
	B: 246.94, // B3
	e: 329.63 // E4 (high e)
};

// Standard Guitar Tuning (EADGBe) based on A4=432Hz
// export const A432Hz_TUNING_NOTES: { [key: string]: number } = {
// 	E: 328.125, // E3
// 	A: 234.38, // A3
// 	D: 281.25, // D4
// 	G: 375.0, // G4
// 	B: 468.75, // B4
// 	e: 656.25 // E5 (high e)
// };

// Drop D Tuning based on A4=440Hz
export const DROP_D_TUNING_NOTES: { [key: string]: number } = {
	D2: 73.42, // D2 (Low D)
	A2: 110.0, // A2
	D3: 146.83, // D3
	G3: 196.0, // G3
	B3: 246.94, // B3
	e4: 329.63 // E4
};

// List of available tuning presets
export const TUNING_PRESETS: TuningPreset[] = [
	{ name: "E Standard", notes: STANDARD_TUNING_NOTES },
	{ name: "Drop D", notes: DROP_D_TUNING_NOTES }
	// Add more presets here if needed (e.g., Open G, DADGAD)
];

/**
 * Calculates the target frequencies for a given set of notes based on a base A4 frequency.
 * @param baseNotes - An object containing note names and their frequencies at A4=440Hz.
 * @param baseFrequency - The desired base frequency for A4 (e.g., 440, 432).
 * @returns An object with note names and their calculated frequencies.
 */
export const calculateTuningFrequencies = (
	baseNotes: { [key: string]: number },
	baseFrequency: number = 440
): CalculatedTuning => {
	const ratio = baseFrequency / 440;
	const calculatedNotes: CalculatedTuning = {};
	for (const note in baseNotes) {
		calculatedNotes[note] = baseNotes[note] * ratio;
	}
	return calculatedNotes;
};
