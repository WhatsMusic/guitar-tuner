import FrequencyVisualizer from "@/components/FrequencyVisualizer";
import TuningSelector from "@/components/TuningSelector";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold">Gitarrenstimmgerät 🎸</h1>
      <TuningSelector />
      <FrequencyVisualizer baseFrequency={440} />
    </main>
  );
}
