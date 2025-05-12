'use client'
import { useState, useEffect } from "react";
import { calculateTuningFrequencies, TUNING_PRESETS, TuningPreset, CalculatedTuning } from "../utils/tuning";

export interface TuningSelectorProps {
    baseFrequency: number;
    onBaseFrequencyChangeAction: (newFreq: number) => void;
    onTuningChangeAction: (newTuning: CalculatedTuning) => void;
}

export default function TuningSelector({
    baseFrequency,
    onBaseFrequencyChangeAction,
    onTuningChangeAction
}: TuningSelectorProps) {
    const [selectedPreset, setSelectedPreset] = useState<TuningPreset>(TUNING_PRESETS[0]);

    // Update tuning when base frequency or preset changes
    useEffect(() => {
        const newTuning = calculateTuningFrequencies(selectedPreset.notes, baseFrequency);
        onTuningChangeAction(newTuning);
    }, [baseFrequency, selectedPreset, onTuningChangeAction]);

    const handleBaseFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBase = Number(event.target.value);
        if (!isNaN(newBase) && newBase > 0) { // Basic validation
            onBaseFrequencyChangeAction(newBase);
        }
    };

    const handlePresetChange = (preset: TuningPreset) => {
        setSelectedPreset(preset);
        // Optional: Reset base frequency when changing preset, or keep current calibration
        // onBaseFrequencyChange(440);
    };

    return (
        <div className="w-full max-w-md p-6 bg-[--card-rgb] rounded-lg shadow-md border border-[--card-border-rgb]">
            <h2 className="text-xl font-semibold text-center mb-4">Stimmung wählen</h2>

            {/* Tuning Preset Buttons */}
            <div className="flex justify-center space-x-2 mb-4">
                {TUNING_PRESETS.map((preset) => (
                    <button
                        key={preset.name}
                        onClick={() => handlePresetChange(preset)}
                        className={`px-3 py-1 rounded font-medium transition-colors ${selectedPreset.name === preset.name
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-100'
                            }`}
                    >
                        {preset.name}
                    </button>
                ))}
            </div>

            {/* Base Frequency Input */}
            <div className="flex items-center justify-center space-x-2">
                <label htmlFor="baseFrequency" className="font-medium">A4 Frequenz:</label>
                <input
                    id="baseFrequency"
                    type="number"
                    value={baseFrequency}
                    onChange={handleBaseFreqChange}
                    className="w-20 p-1.5 border border-[--card-border-rgb] rounded bg-white dark:bg-gray-800 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.1" // Allow finer adjustments
                />
                <span>Hz</span>
            </div>

            {/* Display current tuning frequencies (optional) */}
            {/* <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                {Object.entries(calculateTuningFrequencies(selectedPreset.notes, baseFrequency)).map(([string, freq]) => (
                    <span key={string} className="mr-2">
                        {string}: {freq.toFixed(2)} Hz
                    </span>
                ))}
            </div> */}
        </div>
    );
}