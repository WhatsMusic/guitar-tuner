"use client";
import { useEffect, useState, useRef } from "react";

export function useAudioAnalyzer() {
	const [currentFreq, setCurrentFreq] = useState<number | null>(null);
	const [micError, setMicError] = useState<boolean>(false);
	const audioCtxRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
	const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		let isActive = true; // Flag to prevent updates after unmount

		const setupAudio = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true
				});
				if (!isActive) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}
				streamRef.current = stream;
				const audioCtx = new (window.AudioContext ||
					(
						window as typeof window & {
							webkitAudioContext: typeof AudioContext;
						}
					).webkitAudioContext)();
				audioCtxRef.current = audioCtx;
				const analyser = audioCtx.createAnalyser();
				analyserRef.current = analyser;
				analyser.fftSize = 2048; // Standard FFT size
				const source = audioCtx.createMediaStreamSource(stream);
				sourceRef.current = source;
				source.connect(analyser);

				const dataArray = new Float32Array(analyser.frequencyBinCount);

				const detectFrequency = () => {
					if (!analyserRef.current || !audioCtxRef.current) return;
					analyserRef.current.getFloatFrequencyData(dataArray);

					// Simple peak detection (find the bin with the highest power)
					let maxVal = -Infinity;
					let maxIndex = -1;
					for (
						let i = 0;
						i < analyserRef.current.frequencyBinCount;
						i++
					) {
						if (dataArray[i] > maxVal && dataArray[i] < 0) {
							// Avoid silence/DC offset issues
							maxVal = dataArray[i];
							maxIndex = i;
						}
					}

					// Convert index to frequency
					if (maxIndex !== -1) {
						const frequency =
							maxIndex *
							(audioCtxRef.current.sampleRate /
								analyserRef.current.fftSize);
						if (frequency > 30) {
							// Basic filter for very low frequencies/noise
							setCurrentFreq(frequency);
						} else {
							setCurrentFreq(null); // Or handle low frequencies differently
						}
					} else {
						setCurrentFreq(null);
					}
				};

				// Clear previous interval if any
				if (intervalIdRef.current) {
					clearInterval(intervalIdRef.current);
				}
				intervalIdRef.current = setInterval(detectFrequency, 100); // Adjust interval as needed
				setMicError(false); // Reset error on success
			} catch (err) {
				console.error("Error accessing microphone:", err);
				setMicError(true);
			}
		};

		setupAudio();

		// Cleanup function
		return () => {
			isActive = false;
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
			// Stop audio processing and release resources
			sourceRef.current?.disconnect();
			streamRef.current?.getTracks().forEach((track) => track.stop());
			audioCtxRef.current?.close().catch(console.error);
		};
	}, []); // Empty dependency array ensures this runs only once on mount

	return { currentFreq, micError };
}
