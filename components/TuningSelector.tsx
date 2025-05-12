'use client'
import { useState } from "react";
import { calculateTuning } from "../utils/tuning";

export default function TuningSelector() {
    const [baseFrequency, setBaseFrequency] = useState(440);
    const [tuning, setTuning] = useState(calculateTuning(440));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBase = Number(event.target.value);
        setBaseFrequency(newBase);
        setTuning(calculateTuning(newBase));
    };

    return (
        <div className="text-center p-4">
            <label className="block text-lg font-semibold">Grundton wählen:</label>
            <input
                type="number"
                value={baseFrequency}
                onChange={handleChange}
                className="border p-2 text-center"
            />
            <div className="mt-4">
                {Object.entries(tuning).map(([string, freq]) => (
                    <p key={string}>
                        {string}: {freq.toFixed(2)} Hz
                    </p>
                ))}
            </div>
        </div>
    );
}
