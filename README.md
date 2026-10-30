# GAP II Trainer

Lern-App für die Abschlussprüfung Teil 2 (GAP II) Kaufmann/-frau für Versicherungen und Finanzanlagen: Lernzettel, Karteikarten mit Wiederholungsstapeln, Quiz, Prüfungssimulation und Rechner zu allen Prüfungsbereichen.

## Funktionen

- **Start:** Lernplan bis zur Prüfung, Tagesziel, Lernserie, Aktivität der letzten 14 Tage und Fortschritt je Thema mit Empfehlung für das schwächste Thema.
- **Lernzettel:** alle Themen mit Volltextsuche, „gelesen“-Markierung und Druckansicht.
- **Karteikarten:** Leitner-System mit „Nochmal / Schwer / Gewusst“, Wischgesten, Markieren mit Stern.
- **Quiz:** gemischte Antworten, Modi „Neue Fragen“ und „Fehler wiederholen“, Note nach IHK-Schlüssel.
- **Prüfung:** Simulation mit Zeitlimit, Fragen nach Prüfungspunkten gewichtet, Auswertung je Thema und alle Lösungswege.
- **Rechner:** Unterversicherung, Invaliditätsleistung mit Progression, Abschreibung mit Verkauf, Fondsanteile, Bezugsrecht, Versicherungskennzahlen.
- **Suche** über alles (Taste `/`), Hell/Dunkel, Sicherung des Lernstands als Datei.

## Aufbau

- `index.html`: Grundgerüst
- `css/app.css`: Gestaltung
- `js/inhalte.js`: Lerninhalte aus den GAP2-Unterlagen. Neue Karten und Fragen nur hinten anhängen, weil der Lernstand über die Position gespeichert wird.
- `js/app.js`: App-Logik
- `sw.js`: Offline-Cache (bei Änderungen die Version in `CACHE` erhöhen)

Die App läuft im Browser und lässt sich auf dem Handy oder PC installieren. Nach dem ersten Öffnen funktioniert sie auch offline. Der Lernstand bleibt lokal im Browser des jeweiligen Geräts gespeichert.

**App öffnen:** https://kreabolo.github.io/Gap-2-lernen/

## Installieren

- **iPhone/iPad (Safari):** Teilen-Symbol → „Zum Home-Bildschirm“.
- **Android (Chrome):** Menü ⋮ → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
- **PC (Chrome/Edge):** Installations-Symbol rechts in der Adressleiste.
