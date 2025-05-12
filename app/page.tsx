'use client';

import { useState, useCallback } from "react";
import FrequencyVisualizer from "@/components/FrequencyVisualizer";
import TuningSelector from "@/components/TuningSelector";
import { calculateTuningFrequencies, TUNING_PRESETS, CalculatedTuning } from "@/utils/tuning";

export default function Home() {
  const [baseFrequency, setBaseFrequency] = useState<number>(440);
  const [currentTuning, setCurrentTuning] = useState<CalculatedTuning>(
    calculateTuningFrequencies(TUNING_PRESETS[0].notes, 440)
  );

  const handleBaseFrequencyChange = (newFreq: number) => {
    setBaseFrequency(newFreq);
  };

  // Stabilisiere onTuningChangeAction mit useCallback
  const handleTuningChange = useCallback((newTuning: CalculatedTuning) => {
    setCurrentTuning(newTuning);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-balance">
        Modernes Gitarrenstimmgerät 🎸
      </h1>
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <TuningSelector
          baseFrequency={baseFrequency}
          onBaseFrequencyChangeAction={handleBaseFrequencyChange}
          onTuningChangeAction={handleTuningChange}
        />
        <FrequencyVisualizer tuning={currentTuning} />
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Gebaut mit Next.js & Tailwind CSS - {new Date().getFullYear()}
      </footer>
    </main>
  );
}