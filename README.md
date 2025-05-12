# Guitar Tuner

Ein moderner Gitarrenstimmer, der mit Next.js implementiert wurde. Dieses Projekt visualisiert Audiofrequenzen in Echtzeit und zeigt den nächstgelegenen Ton an.

## Funktionen

- **Live-Frequenzvisualisierung:** Anzeige der aktuellen Frequenz in Echtzeit.
- **Nächster Ton:** Berechnung und Anzeige des am nächsten liegenden Tons basierend auf dem eingestellten Grundton.
- **Einstellbarer Grundton:** Nutzer können den Referenz- oder Grundton flexibel anpassen.
- **Responsive Design:** Optimiert für verschiedene Endgeräte.

## Installation

1. **Repository clonen:**

   ```bash
   git clone https://github.com/dein-benutzername/guitar-tuner.git
   cd guitar-tuner
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   # oder
   yarn install
   ```

## Entwicklung

Starte den Entwicklungsserver:

```bash
npm run dev
# oder
yarn dev
```

Öffne [http://localhost:3000](http://localhost:3000) mit deinem Browser, um die Anwendung live zu sehen. Änderungen an den Dateien werden automatisch aktualisiert.

## Projektstruktur

- **components/**
  - `FrequencyVisualizer.tsx` – Visualisiert die aktuelle Frequenz und den nächstgelegenen Ton.
  - `TuningSelector.tsx` – Ermöglicht die Anpassung des Grundtons.
- **hooks/**
  - `useAudioAnalyzer.ts` – Hook zur Verarbeitung von Mikrofoneingaben und Frequenzanalyse.
- **utils/**
  - `tuning.ts` – Berechnung der nötigen Frequenzwerte für die Stimmung.

## Hinweise

- Das Projekt setzt voraus, dass der Browser den Zugriff auf das Mikrofon erlaubt. Bei deaktiviertem oder nicht verfügbarem Mikrofon wird eine entsprechende Fehlermeldung angezeigt.
- Ein funktionsfähiges Audio-Interface kann zu speziellen Herausforderungen führen, wenn das Mikrofon zwar physisch ausgeschaltet, aber softwareseitig weiterhin verfügbar ist.

## Weitere Informationen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Deployment

Für das Deployment eignet sich [Vercel](https://vercel.com). Weitere Informationen findest du in der [Next.js Deployment-Dokumentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

---

Viel Spaß beim Stimmen!
