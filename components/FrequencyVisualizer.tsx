'use client'
import { useEffect, useRef, useState } from "react";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import { calculateTuning } from "../utils/tuning";

export default function FrequencyVisualizer({ baseFrequency }: { baseFrequency: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { currentFreq, micError } = useAudioAnalyzer();
    const frequency = currentFreq;
    const [deviation, setDeviation] = useState<number | null>(null);
    const [nearestTone, setNearestTone] = useState<string | null>(null);
    const tuning = calculateTuning(baseFrequency);

    useEffect(() => {
        if (frequency !== null) {
            // Berechne den nächsten Ton anhand des Tuning-Objekts
            const nearest = Object.entries(tuning).reduce(
                (prev, curr) =>
                    Math.abs(curr[1] - frequency) < Math.abs(prev[1] - frequency) ? curr : prev
            );
            setDeviation(frequency - nearest[1]);
            setNearestTone(nearest[0]);
        }
    }, [frequency, tuning]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || frequency === null) return;

        ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
        ctx.fillStyle = "#4CAF50";
        const barHeight = Math.min(200, Math.abs(deviation ?? 0) * 2);
        ctx.fillRect(50, 250 - barHeight, 40, barHeight);
    }, [frequency, deviation]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Frequenz-Visualizer</h2>
            {micError ? (
                <p className="text-red-500 text-lg font-semibold">
                    ⚠️ Bitte aktiviere dein Mikrofon für die Tonerkennung!
                </p>
            ) : (
                <>
                    <p className="text-lg mt-2">Aktuelle Frequenz: {currentFreq?.toFixed(2)} Hz</p>
                    {nearestTone && (
                        <p className="text-lg mt-2">Nächster Ton: {nearestTone}</p>
                    )}
                </>
            )}
            <canvas ref={canvasRef} width={200} height={300} className="border" />
            <p className={`text-lg ${Math.abs(deviation ?? 0) < 3 ? "text-green-500" : "text-red-500"}`}>
                Abweichung: {deviation?.toFixed(2)} Hz
            </p>
        </div>
    );
}