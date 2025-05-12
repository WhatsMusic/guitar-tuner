"use client";
import { useEffect, useState } from "react";

export function useAudioAnalyzer() {
	const [currentFreq, setCurrentFreq] = useState<number | null>(null);
	const [micError, setMicError] = useState<boolean>(false); // Neuer Zustand für Fehleranzeige

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const audioCtx = new AudioContext();
				const analyser = audioCtx.createAnalyser();
				const source = audioCtx.createMediaStreamSource(stream);
				source.connect(analyser);

				const dataArray = new Float32Array(analyser.frequencyBinCount);
				const detectFrequency = () => {
					analyser.getFloatFrequencyData(dataArray);
					const maxIndex = dataArray.indexOf(Math.max(...dataArray));
					setCurrentFreq(
						maxIndex *
							(audioCtx.sampleRate / analyser.frequencyBinCount)
					);
				};

				setInterval(detectFrequency, 100);
			})
			.catch(() => {
				setMicError(true); // Mikrofon nicht verfügbar, Fehler setzen
			});
	}, []);

	return { currentFreq, micError };
}
