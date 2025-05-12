'use client'
import { useEffect, useState } from "react";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import { CalculatedTuning } from "../utils/tuning"; // Import CalculatedTuning type

const DEVIATION_THRESHOLD = 2; // Hz threshold for being "in tune"
const MAX_DEVIATION_DISPLAY = 50; // Max deviation (in cents) for needle display range (-50 to +50 cents)

// Function to convert frequency deviation (Hz) to cents
const hzToCents = (deviationHz: number, targetFreq: number): number => {
    if (targetFreq === 0) return 0;
    return 1200 * Math.log2((targetFreq + deviationHz) / targetFreq);
};

export default function FrequencyVisualizer({ tuning }: { tuning: CalculatedTuning }) {
    const { currentFreq, micError } = useAudioAnalyzer();
    const [deviationHz, setDeviationHz] = useState<number | null>(null);
    const [deviationCents, setDeviationCents] = useState<number | null>(null);
    const [nearestTone, setNearestTone] = useState<string | null>(null);
    const [targetFreq, setTargetFreq] = useState<number | null>(null);

    useEffect(() => {
        if (currentFreq !== null && Object.keys(tuning).length > 0) {
            // Find the nearest note in the current tuning
            const nearest = Object.entries(tuning).reduce(
                (prev, [name, freq]) => {
                    const diff = Math.abs(freq - currentFreq);
                    return diff < Math.abs(prev.freq - currentFreq) ? { name, freq } : prev;
                },
                { name: '', freq: Infinity } // Initial accumulator
            );

            if (nearest.name) {
                const devHz = currentFreq - nearest.freq;
                const devCents = hzToCents(devHz, nearest.freq);

                setNearestTone(nearest.name);
                setTargetFreq(nearest.freq);
                setDeviationHz(devHz);
                setDeviationCents(devCents);

            } else {
                // Reset if no close note is found (or frequency is out of range)
                setNearestTone(null);
                setTargetFreq(null);
                setDeviationHz(null);
                setDeviationCents(null);
            }
        } else {
            // Reset when frequency is null
            setNearestTone(null);
            setTargetFreq(null);
            setDeviationHz(null);
            setDeviationCents(null);
        }
    }, [currentFreq, tuning]);

    // Calculate needle rotation based on cents deviation
    const getNeedleRotation = () => {
        if (deviationCents === null) return 0;
        // Clamp deviation to the display range (-50 to +50 cents)
        const clampedCents = Math.max(-MAX_DEVIATION_DISPLAY, Math.min(MAX_DEVIATION_DISPLAY, deviationCents));
        // Map cents (-50 to +50) to degrees (-45 to +45)
        return (clampedCents / MAX_DEVIATION_DISPLAY) * 45;
    };

    const rotationDegrees = getNeedleRotation();

    // Determine color based on deviation
    const getStatusColor = () => {
        if (deviationHz === null) return 'text-gray-500'; // Default/inactive
        if (Math.abs(deviationHz) < DEVIATION_THRESHOLD) return 'text-green-500'; // In tune
        return 'text-red-500'; // Out of tune (sharp or flat)
    };
    const statusColor = getStatusColor();

    const getStatusText = () => {
        if (deviationHz === null) return '--';
        if (Math.abs(deviationHz) < DEVIATION_THRESHOLD) return 'In Tune';
        if (deviationHz > 0) return 'Sharp';
        return 'Flat';
    }
    const statusText = getStatusText();


    // ... (rest of the component code)

    return (
        <div className="w-full max-w-md p-6 bg-[--card-rgb] rounded-lg shadow-md border border-[--card-border-rgb] flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold text-center">Tuner</h2>

            {micError ? (
                <p className="text-red-500 text-lg font-semibold text-center px-4 py-2 bg-red-100 dark:bg-red-900 rounded border border-red-500">
                    ⚠️ Mikrofonzugriff benötigt! Bitte erlaube den Zugriff im Browser.
                </p>
            ) : (
                <>
                    {/* Needle Visualizer */}
                    <div className="relative w-60 h-32 overflow-hidden"> {/* Adjusted height */}
                        {/* Background Scale (Simplified) */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 border-b-2 border-l-2 border-r-2 border-gray-400 dark:border-gray-600 rounded-b-full"></div>
                        <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-gray-600 dark:bg-gray-400 transform -translate-x-1/2"></div> {/* Center mark */}
                        {/* Needle */}
                        <div
                            className={`tuner-needle absolute bottom-0 left-1/2 w-1 h-28 bg-red-600 rounded-t-sm ${deviationHz === null ? 'opacity-50' : ''}`}
                            style={{ transform: `translateX(-50%) rotate(${rotationDegrees}deg)` }}
                        ></div>
                    </div>

                    {/* Detected Note Display */}
                    <div className="text-center">
                        <div className={`text-6xl font-bold ${statusColor}`}>
                            {nearestTone ?? '--'}
                        </div>
                        <div className={`text-lg font-medium ${statusColor}`}>
                            {statusText}
                        </div>
                    </div>

                    {/* Deviation Info (Optional) */}
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        <p>Abweichung: {deviationHz?.toFixed(1)} Hz / {deviationCents?.toFixed(0)} cents</p>
                        {/* --- HIER WIRD targetFreq VERWENDET --- */}
                        {targetFreq !== null && (
                            <p>Zielfrequenz: {targetFreq.toFixed(1)} Hz</p>
                        )}
                        {/* <p>Aktuelle Frequenz: {currentFreq?.toFixed(1)} Hz</p> */}
                    </div>
                </>
            )}
        </div>
    );
}
