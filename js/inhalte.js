/* Lerninhalte GAP II: Themen, Lernzettel, Karteikarten, Quizfragen.
   Karten und Fragen werden über ihren Index gespeichert: Neue Einträge nur hinten anhängen (siehe inhalte-extra.js). */
/* ---------- Themen ---------- */
const TOPICS = [
  {id:"mobil", name:"Mobilität & Reisen", pts:"15*"},
  {id:"freizeit", name:"Berufsausübung & Freizeit", pts:"15*"},
  {id:"wohnen", name:"Wohnen & Wohneigentum", pts:"Reg."},
  {id:"gesund", name:"Gesundheit, Krankheit, Pflege", pts:"10"},
  {id:"vorsorge", name:"Alter & Vermögen", pts:"10"},
  {id:"finanz", name:"Finanzanlagen", pts:"15"},
  {id:"einkommen", name:"Einkommen & Hinterbliebene", pts:"10"},
  {id:"rw", name:"Rechnungswesen", pts:"20"},
  {id:"wiso", name:"WiSo", pts:"10 %"}
];

/* ---------- Lernzettel ---------- */
const SUMS = {
mobil:{
  sections:[
    ["Pflichtversicherung und Antrag",[
      "Versicherungspflicht für die Kfz-Haftpflicht, sobald das Fahrzeug auf öffentlichen Wegen genutzt wird (§ 1 PflVG). Mindestversicherungssummen, Leitgedanke ist der Schutz des Verkehrsopfers.",
      "Kontrahierungszwang (§ 5 PflVG): Der Versicherer muss den KH-Antrag annehmen, mindestens zu den gesetzlichen Mindestsummen. Für Kasko gilt er nicht.",
      "Ausnahme (§ 5 Abs. 4): Der Versicherer hatte einen Vorvertrag desselben Kunden nach einem Schadenfall gekündigt. Ein Rücktritt eines anderen Versicherers reicht nicht.",
      "Ablehnung nur schriftlich innerhalb von 2 Wochen nach Antragseingang. Danach gilt der KH-Antrag als angenommen (Annahmefiktion).",
      "Endet der KH-Schutz, meldet der Versicherer das der Zulassungsstelle, um aus der Nachhaftung (§ 117 VVG, Ziffer C.5) zu kommen.",
      "Widerrufsrecht des Kunden: 14 Tage nach Erhalt von Police und allen Informationen (§ 8 VVG)."
    ]],
    ["Vorläufige Deckung (eVB)",[
      "Eigenständiger Vertrag vor der Einigung über den Hauptvertrag, Schutz ab sofort ohne Risikoprüfung.",
      "Endet durch: Hauptvertrag kommt zustande (Erstbeitrag gezahlt), Nichtzahlung des Erstbeitrags, Kündigung (Frist 2 Wochen), Widerruf des Kunden.",
      "Schutzbrief: vorläufige Deckung ab Zulassung. Kasko: keine vorläufige Deckung ohne ausdrückliche Zusage."
    ]],
    ["Schadenfreiheitsrabatt (SFR)",[
      "Ersteinstufung Pkw: SF 0 mit 85 %. Sondereinstufung SF 1 (52 %) für einen Zweitwagen: Auf den VN oder seinen Ehe- bzw. Lebenspartner ist bereits ein Pkw in mindestens SF 1 zugelassen und der VN hat seit mindestens 1 Jahr den Führerschein. Typischer Fall: Das Auto des Kindes wird über ein Elternteil als VN versichert (AKB I.2.2.2, Proximus 5, S. 125).",
      "Sondereinstufung SF 3 als Zweitwagen von Ehe- oder Lebenspartnern: Erstfahrzeug mindestens in SF 3, Führerschein seit mindestens 1 Jahr, nur VN und Partner fahren, beide mindestens 23 Jahre. Gilt nicht, wenn das Kind das Auto fahren soll (AKB I.2.2.3, Proximus 5, S. 125 f.).",
      "Rabattübertragung von Eltern oder Großeltern: Fahrzeug wurde überwiegend vom Kind gefahren, schriftliche Erklärung beider, vollständige Abtretung, Führerscheinkopie. Übertragen wird höchstens so viel, wie das Kind seit dem Führerschein hätte erfahren können.",
      "Vollkasko wird in dieselbe SF-Klasse wie die Haftpflicht eingestuft.",
      "Campingfahrzeuge: keine Sondereinstufung (SF 0 = 100 %), höchstens SF 10 (45 %), keine Typ- und Regionalklassen. Typ- und Regionalklassen gibt es nur für Pkw.",
      "Rückkauf eines Schadens innerhalb von 6 Monaten nach Regulierung. Bis 500 € Schaden muss der Versicherer den Kunden darauf hinweisen."
    ]],
    ["Unterbrechung und Stilllegung",[
      "Bis 6 Monate: Einstufung, als hätte es keine Unterbrechung gegeben.",
      "Über 6 bis 12 Monate: Einstufung wie vor der Unterbrechung, keine Besserstufung.",
      "Über 12 Monate: für jedes weitere angefangene Kalenderjahr wird ein schadenfreies Jahr abgezogen.",
      "Über 7 Jahre: der SFR verfällt, Neueinstufung.",
      "Stilllegung ab 2 Wochen mit Abmeldebescheinigung: Ruheversicherung, beitragsfrei für KH und Teilkasko. Fahrten zur Zulassungsstelle mit ungestempeltem Kennzeichen sind versichert.",
      "Wiederanmeldung innerhalb von 18 Monaten, sonst endet der Vertrag ohne Kündigung."
    ]],
    ["Kasko, KH und Schutzbrief im Schadenfall",[
      "Teilkasko: Glas, Wild (Zusammenstoß mit Tieren aller Art), Entwendung, Brand, Sturm. Kein Einfluss auf den SFR, Selbstbeteiligung beachten.",
      "Vollkasko zusätzlich: selbst verschuldete Unfälle und mut- oder böswillige Handlungen Dritter (Vandalismus, Kratzer). Ausweichen vor Wild ohne Zusammenstoß ist ein Vollkaskoschaden.",
      "Totalschaden: Wiederbeschaffungswert minus Restwert minus SB. Abrechnung nach Kostenvoranschlag netto, nach konkreter Reparatur brutto.",
      "Entwendung: Wird das Auto innerhalb eines Monats nach Schadenanzeige gefunden, muss der Kunde es zurücknehmen, wenn das zumutbar ist.",
      "Alkohol ab 1,1 Promille: Vollkasko leistungsfrei. KH zahlt dem Opfer und nimmt beim Fahrer Regress, höchstens 5.000 €.",
      "Ölverlust: KH zahlt die verunreinigte Fläche. Abschleppen und Mietwagen nur über den Schutzbrief (Mietwagen erst ab 50 km Entfernung vom Wohnort).",
      "Mitversichert sind Fahrzeugteile wie Dachbox und Fahrradträger, nicht aber Surfbrett, Fahrräder oder Gepäck.",
      "Geltungsbereich Europa. Außereuropäische Gebiete wie Marokko besonders vereinbaren und in der Internationalen Versicherungskarte vermerken.",
      "Beitragserhöhung durch Typklassenänderung: außerordentliches Kündigungsrecht innerhalb 1 Monats ab Zugang. Zur Vertragserhaltung SB erhöhen oder einzelne Bausteine kündigen."
    ]],
    ["Reiseversicherungen",[
      "Weltweit gültig, versichert ist eine Reise ab 1 Übernachtung. Jahresvertrag kostet 20 % Zuschlag.",
      "Reiserücktritt erstattet Stornokosten, z. B. wenn die Unterkunft unbewohnbar wird oder ein Dienst (freiwilliges soziales Jahr) unverschiebbar früher beginnt.",
      "Reisegepäck: versichert auch in Gewahrsam eines Beförderungsunternehmens, bei verspätetem Gepäck Ersatzkäufe bis 10 % der VS, höchstens 400 €. Nicht versichert: Bargeld, Fahrkarten, Fahrräder (dafür Hausrat mit Fahrradklausel), liegen gelassene Sachen.",
      "Foto-Ausrüstung und Schmuck zusammen bis 50 % der VS, nur wenn getragen, benutzt oder sicher im persönlichen Gewahrsam (Proximus 5, S. 460 f.). Diebstahl immer der Polizei melden."
    ]],
    ["Kfz nach Proximus 5 (AKB 2021, S. 108–150)", ["Sondereinstufung SF ½ (65 % KH / 60 % VK): Pkw ohne übernommenen Schadenverlauf, wenn der Kunde seit mindestens 3 Jahren einen Pkw- oder Kradführerschein hat (AKB I.2.2.1, S. 125).", "Beitragssätze Pkw KH/VK: SF M 111/88 %, SF 0 85/66 %, SF ½ 65/60 %, SF 1 52/53 %, SF 3 46/49 %, SF 10 33/39 %, SF 20 24/31 % (Kfz-Tarif).", "Rückstufung nach einem KH-Schaden, z. B. SF 10 auf SF 3, SF 4 auf SF ½, SF 1 auf SF ½, SF 0 auf M. Neueinstufung immer zum 1.1., maßgeblich ist der Tag der Schadenmeldung (AKB I.3).", "Beginnt der Vertrag zwischen 2.1. und 1.7. und bestand er mindestens 6 Monate, wird zum 1.1. wie nach einem vollen Jahr besser gestuft (AKB I.3).", "Rabattschutz: ab SF 4 in KH und VK, 1 Schaden je 24 Monate ohne Rückstufung, Zuschlag 25 %.", "Neupreisentschädigung Pkw: Totalschaden oder Verlust innerhalb von 12 Monaten nach Erstzulassung beim Erstbesitzer, oder Reparatur ab 80 % des Neupreises innerhalb von 18 Monaten (AKB A.2.6).", "Grobe Fahrlässigkeit: Proximus verzichtet in der Kasko auf eine Kürzung, außer bei grob fahrlässig ermöglichter Entwendung und bei Alkohol oder Drogen.", "Regress in der KH: Obliegenheitsverletzung vor dem Schaden (z. B. Alkohol, kein Führerschein) bis 5.000 €, nach dem Schaden bis 2.500 €, bei Unfallflucht bis 5.000 € (AKB D und E).", "Schadenanzeige binnen 1 Woche. Polizei bei Entwendung, Brand und Wildschaden über 500 €. Bei Entwendung Zahlung frühestens nach 1 Monat.", "Schutzbrief: Pannenhilfe und Abschleppen bis 300 €. Ab 50 km Luftlinie vom Wohnsitz: Übernachtung bis 3 × 50 € je Person oder Mietwagen bis 7 Tage × 50 €.", "Fahrerschutz: Personenschäden des berechtigten Fahrers bis 12 Mio. €, Schmerzensgeld erst ab 5 Tagen Krankenhaus, nachrangig zu anderen Leistungen, geht bei Verkauf nicht über.", "Tarifmerkmale: Fahrleistung bis 9.000 km −15 %, bis 12.000 km −10 %, über 30.000 km +20 %. Garage und Wohneigentum je −10 % in KH. Nachlässe nacheinander auf die Zwischensumme rechnen."]],
    ["Reise nach Proximus 5 (S. 450–464)", ["Reiserücktritt muss mehr als 30 Tage vor Reiseantritt abgeschlossen werden. Liegen weniger als 30 Tage dazwischen, nur wenn der Vertrag spätestens 3 Tage nach der Buchung geschlossen wird (S. 451).", "Versicherte Gründe u. a.: Tod, schwere Unfallverletzung, unerwartete schwere Erkrankung, Schwangerschaft, betriebsbedingte Kündigung, neuer Job nach Arbeitslosigkeit, Wiederholungsprüfung. Die Reise ist unverzüglich zu stornieren (S. 454 f.).", "Risikopersonen: Mitreisende einer gemeinsamen Buchung (höchstens 6 Personen, bei Familienprodukten 7) und Angehörige wie Partner, Kinder, Eltern, Großeltern, Schwiegereltern (S. 455).", "Selbstbehalt, wenn vereinbart: 20 % des Schadens, mindestens 25 € je Person (S. 456).", "Reiseabbruch gibt es nur zusammen mit dem Rücktritt. Ersetzt werden anteilig nicht genutzte Reiseleistungen und zusätzliche Rückreisekosten (S. 457).", "Gepäck im abgestellten Kfz ist voll versichert nur tagsüber (6 bis 22 Uhr), in einer abgeschlossenen Garage oder bei einer Fahrtunterbrechung bis 2 Stunden, sonst bis 10 % der VS, höchstens 400 €. Schmuck und Foto im unbeaufsichtigten Kfz nie (S. 461).", "Tarif: Prämie nach Reisepreis je Person, Paare und Familien +15 %, Jahresvertrag +20 % nach der teuersten Reise. Beispiel Paar, 500 €, Jahresvertrag: 23 € × 1,15 × 1,20 = 31,74 € (S. 463 f.).", "Gepäck: 1.500 € kosten 50 €, 3.000 € 75 €, 4.500 € 95 € je Reise. VSt 19 %, kein Dauernachlass (S. 463 f.)."]]
  ],
  keys:[["§ 1 PflVG","Versicherungspflicht"],["§ 5 PflVG","Kontrahierungszwang, Ablehnung in 2 Wochen"],["SF 0","85 % (Pkw)"],["SF 1","52 %"],["SF 10","45 %, Maximum Camping"],["1,1 ‰","VK leistungsfrei"],["5.000 €","Regress KH beim Fahrer"],["18 Mon.","Frist Wiederanmeldung"],["6 Mon.","Rückkauf des Schadens"],["+20 %","Reise-Jahresvertrag"],["19 %","VSt Kfz und Reise"],["SF ½", "65 %, 3 Jahre Führerschein"],["SF 3", "Zweitwagen, Erstwagen ≥ SF 3"],["30 / 3 Tage", "Reiserücktritt abschließen"],["+15 % / +20 %", "Paar / Jahresvertrag Reise"]],
  src:"IHK-Lösungen S24, S25, W25/26 · KBF 3 Mobilität (2026) · Einstieg GAP II · Proximus 5 (Bedingungen und Tarife)"
},
freizeit:{
  sections:[
    ["Haftungsrecht (BGB)",[
      "Verschuldenshaftung (§ 823 BGB): Der Geschädigte muss das Verschulden beweisen.",
      "Vermutetes Verschulden: Nutztierhalter (§ 833 S. 2), Aufsichtspflichtige (§ 832), Haus- und Gebäudebesitzer, Bauherr. Der Schädiger muss seine Unschuld beweisen (Beweislastumkehr).",
      "Gefährdungshaftung: Luxustier wie Hund oder Reitpferd (§ 833 S. 1), Öltank, Kfz-Halter (§ 7 StVG). Haftung auch ohne Verschulden, keine Entlastung.",
      "Deliktfähigkeit (§ 828): unter 7 Jahren nicht deliktfähig. Unter 10 Jahren keine Haftung für Unfälle mit Kfz im Straßenverkehr. Bis 17 bedingt deliktfähig, Haftung bei Einsichtsfähigkeit.",
      "Hat der Aufsichtspflichtige seine Pflicht nicht verletzt und ist das Kind nicht deliktfähig, haftet niemand. Die PHV wehrt dann die Ansprüche ab (passiver Rechtsschutz)."
    ]],
    ["Privathaftpflicht (PHV)",[
      "Mitversichert: Ehe- und Lebenspartner, unverheiratete Kinder bis zum Ende der Erstausbildung, minderjährige Stiefkinder und pflegebedürftige Angehörige in häuslicher Gemeinschaft.",
      "Nach der Erstausbildung braucht das Kind eine eigene PHV.",
      "Vorübergehender Auslandsaufenthalt bis 2 Jahre mitversichert.",
      "Eigenschäden sind nie versichert, auch nicht zwischen Personen desselben Vertrags.",
      "Mitversichert z. B.: Inline-Skates, Skifahren, Krankenfahrstühle, Aufsitzmäher unter 20 km/h, legaler Schusswaffengebrauch, fremde Segelboote ohne Motor, Vermietung im selbst bewohnten Zweifamilienhaus.",
      "Nicht mitversichert: eigene Motorboote, Pferde (eigene Tierhalter-Haftpflicht). Bauherren-Haftpflicht nötig, wenn die Bausumme über 200.000 € liegt.",
      "Mietsachschäden an privat gemieteten Räumen sind gedeckt. Geliehene und gemietete Sachen mit 100 € SB.",
      "Vorsorgeversicherung: neue Risiken sind beitragsfrei mitversichert. Anzeige innerhalb 1 Monats nach Aufforderung, sonst erlischt der Schutz rückwirkend."
    ]],
    ["Rechtsschutz",[
      "Bausteine: Privat, Beruf, Verkehr, Wohnen. Im Beratungsgespräch immer alle anbieten.",
      "Verkehrs-RS für Familien: alle Fahrzeuge der mitversicherten Personen pauschal, auch das Mofa des Kindes und das künftige Auto des studierenden Sohnes.",
      "Falschparken ist ausgeschlossen. Geschwindigkeitsverstöße fallen unter Ordnungswidrigkeiten-RS.",
      "Schadenersatz-RS hat keine Wartezeit. Mietwagen fallen unter RS im Vertrags- und Sachenrecht.",
      "Europäisches Ausland: Strafkaution wird gestellt, VS bis 1 Mio. €, dazu der Korrespondenzanwalt am Wohnort.",
      "Außerhalb des Geltungsbereichs (z. B. Südamerika): nur bei Reisen bis 12 Wochen und bis 100.000 €.",
      "Beratungs-RS im Familien- und Erbrecht: Rechtsschutzfall ist das Ereignis, das die Rechtslage ändert (z. B. der Erbfall). Vorsorgliche Beratung ist nicht versichert.",
      "Verwaltungs-RS: Streit um die Zulassung zum Studium ist ausgeschlossen.",
      "Beitrag: Grundbeitrag minus 10 % Dauernachlass (3 Jahre) minus 5 % bei jährlicher Zahlung, plus 19 % VSt."
    ]],
    ["Haftpflicht nach Proximus 5 (PHV 2021, S. 76–106)", ["Versicherungssumme pauschal 15 Mio. € (Alternative A) oder 30 Mio. € (B), doppelte Jahresmaximierung.", "Volljährige unverheiratete Kinder sind nur in Schule oder in einer innerhalb von 12 Monaten anschließenden Erstausbildung mitversichert, auch Bachelor mit direkt anschließendem Master. Wehrdienst, FSJ oder BFD dazwischen sind unschädlich.", "Nichteheliche Partner nur bei besonderer Vereinbarung (beide unverheiratet, gleiche Meldeadresse). Im Single-Tarif ist nur der VN versichert.", "Deliktunfähige Kinder und Gefälligkeitsschäden (z. B. Umzugshilfe): bis 100.000 € je Fall und 200.000 € je Jahr.", "Gemietete oder geliehene bewegliche Sachen bis 15.000 € mit 100 € SB. Schlüsselverlust bis 100.000 €, nicht für Tresor-, Möbel- oder Kfz-Schlüssel.", "Mitversichert: Nebenberuf bis 12.000 € Jahresumsatz, Drohnen bis 250 g, Modelle ohne Motor bis 5 kg, Aufsitzmäher bis 20 km/h, Pedelecs bis 25 km/h, Bauherr bis 200.000 € Bausumme.", "Hunde und Pferde brauchen eine eigene Tierhalter-Haftpflicht. Wer fremde Hunde oder Pferde nicht gewerbsmäßig hütet, ist über die PHV versichert.", "Ausland: in der EU unbegrenzt, sonst vorübergehend bis 2 Jahre.", "Neuwertentschädigung bis 3.000 € für Sachen bis 12 Monate alt (nicht Elektronik, Kameras, Brillen). Forderungsausfall, wenn die Zwangsvollstreckung gegen den Schädiger erfolglos war.", "Tarif Familie ohne SB: 90,60 € (A) bzw. 95,50 € (B), mit 150 € SB 66,70 €. Hund 93,20 €, Pferd 145,00 €. Dauernachlass 3 Jahre 10 %, VSt 19 %."]],
    ["Rechtsschutz nach Proximus 5 (ARB 2021, S. 152–172)", ["Wartezeit 3 Monate für Arbeits-, Wohnungs-, Vertrags-, Steuer-, Sozial- und Verwaltungs-RS. Keine Wartezeit für Schadenersatz-, Straf-, OWi- und Opfer-RS sowie bei lückenloser Vorversicherung.", "Leistungen: VS 1 Mio. € je Fall, Strafkaution bis 200.000 € als zinsloses Darlehen, Mediation 1.500 € je Fall, reine Beratung bis 250 €. Weltweit bis 100.000 € bei Aufenthalt bis 12 Wochen.", "Straf-RS nur für Vergehen, die auch fahrlässig begangen werden können. Bei Vorsatzvorwurf rückwirkend Schutz, wenn nicht wegen Vorsatz verurteilt wird. Verbrechen und reine Vorsatzdelikte (Diebstahl, Betrug) nie.", "Vergleich: Kosten nur im Verhältnis des Unterliegens. 10.000 € gefordert, 8.000 € erhalten: 20 % der Kosten werden übernommen.", "Familie: Kinder bis zur ersten auf Dauer angelegten Berufstätigkeit mit eigenem Einkommen. Heirat des Single-VN: rückwirkende Umstellung auf Familie binnen 6 Monaten.", "Kündigung nach zwei Rechtsschutzfällen in 12 Monaten für beide Seiten binnen 1 Monat. Ablehnung mangels Erfolgsaussicht: Stichentscheid durch den Anwalt.", "Tarif ohne SB: Privat Familie 195 € (mit 150 € SB 139 €), Verkehr Familie 180 €, Beruf als Ergänzung 36 €. Tarifgruppe B für den öffentlichen Dienst."]]
  ],
  keys:[["§ 823","Verschuldenshaftung"],["§ 832","Aufsichtspflicht"],["§ 833 S.1","Luxustier, Gefährdung"],["§ 833 S.2","Nutztier, vermutet"],["< 7 J.","nicht deliktfähig"],["< 10 J.","keine Haftung im Kfz-Verkehr"],["2 Jahre","Ausland PHV"],["100 €","SB Miet-/Leihsachen"],["200.000 €","Bausumme, sonst Bauherren-HV"],["12 Wochen","RS außerhalb Geltungsbereich"],["15 / 30 Mio.", "PHV Alt. A / B"],["12.000 €", "Nebenberuf PHV"],["3 Monate", "RS-Wartezeit"],["200.000 €", "Strafkaution RS"]],
  src:"IHK-Lösungen S24–W25/26 · KBF 3 (RS-Fälle) · Einstieg GAP II · Proximus 5 (Bedingungen und Tarife)"
},
wohnen:{
  sections:[
    ["Hausratversicherung",[
      "Versicherte Gefahren: Feuer, Einbruchdiebstahl und Raub, Leitungswasser (bestimmungswidriger Austritt), Sturm und Hagel (vom Wetteramt bestätigt).",
      "Hausrat wird zum Neuwert ersetzt, wenn die Reparatur unwirtschaftlich ist. Teppiche und Einrichtung zum Wiederbeschaffungswert.",
      "Außenversicherung: bis 10 % der VS inklusive Vorsorge, höchstens 10.000 €. Ein Student ohne eigenen Hausstand ist darüber unabhängig von der Dauer versichert.",
      "Entschädigungsgrenzen: Bargeld 1.500 €, Schmuck 20.000 €. Wertsachen insgesamt bis 20 % der VS inklusive Vorsorge.",
      "Terrassenmöbel draußen sind keine versicherte Sache. Mit Klausel PK 7215 (Naturgefahren außerhalb von Gebäuden) doch, die direkt anschließende Terrasse ist dann Versicherungsort.",
      "Gebäude- und Grundstücksbestandteile (Fensterscheibe, Zaun, Parkett) zahlt die Wohngebäudeversicherung, nicht die Hausrat.",
      "Bei falsch angegebener Wohnfläche entfällt der Unterversicherungsverzicht."
    ]],
    ["Wohngebäudeversicherung",[
      "Brand: Brandbegriff ist erfüllt, wenn das Feuer seinen bestimmungsgemäßen Herd verlassen hat. Schäden durch die Sprinkleranlage sind als Folgeschaden versichert. Grobe Fahrlässigkeit prüfen.",
      "Überschwemmung ist eine Elementargefahr. Carport und Zaun über Klausel 7264, Aufräumen von Bäumen über Klausel 7363 bis 2.000 €. Bäume, die durch die Überschwemmung entwurzelt wurden, sind nicht versichert.",
      "Abbruch- und Aufräumkosten bis 5 % der VS 1914 mal Anpassungsfaktor.",
      "Mietausfall nur für Wohnräume. Notwendige Schadenminderung (z. B. Abdecken des Dachs) wird ersetzt.",
      "Unterversicherung: Entschädigung = Schaden × VS ÷ Versicherungswert. Nicht angezeigte werterhöhende Maßnahmen führen dazu.",
      "Selbstbeteiligung in den Aufgaben meist 500 €."
    ]],
    ["Glasversicherung",[
      "Allgefahrenversicherung: leistet, wenn keine andere Versicherung leistet.",
      "Ersetzt werden die Scheibe nach Rechnung sowie Aufräumkosten und Notverglasung. Aquarium mitversichert, Fische nicht."
    ]],
    ["Versicherungsteuer",[
      "Hausrat 16,15 %, Glas 19 %, Wohngebäude mit Feuer 16,34 %, nur Feuer 13,20 %, ohne Feuer 19 %.",
      "Haftpflicht, Rechtsschutz, Kfz, Reise und Unfall 19 %. Zinsmethode PROXIMUS 30/360."
    ]],
    ["Hausrat und Glas nach Proximus 5 (VHB 2021, AGlB 2021, S. 2–36)", ["Außenversicherung nur vorübergehend: Über 3 Monate gilt ein Aufenthalt nicht mehr als vorübergehend. Naturgefahren draußen nur in Gebäuden.", "Wertsachen außerhalb des Wertschutzschranks: Bargeld 1.500 €, Urkunden und Sparbücher 3.000 €, Schmuck 20.000 €. Wertschutzschrank VdS-anerkannt, freistehend mindestens 200 kg.", "Hotelkosten bis 100 Tage, je Tag 1 ‰ der VS. Bewachung bis 48 Stunden. Kosten über die VS hinaus bis 10 % der VS.", "Unterversicherungsverzicht (PK 7712) ab 650 € je m² Wohnfläche, ohne Keller, Balkon und Terrasse gerechnet.", "Umzug: Beide Wohnungen sind versichert, die alte bis 2 Monate nach Umzugsbeginn. Umzug ins Ausland geht nicht über.", "Fahrradklausel PK 7110: bis 1 % der VS, verkehrsübliches Schloss (Rahmenschloss reicht nicht), Polizeianzeige, Rad nicht binnen 3 Wochen wieder da.", "Gefahrerhöhung: Wohnung länger als 60 Tage unbewohnt und unbeaufsichtigt. Sturm ab Windstärke 8.", "Elementar: Wartezeit 1 Monat, SB 500 €, keine vorläufige Deckung, keine Annahme bei 2 Vorschäden in 10 Jahren.", "Tarif: Zone I 1,70 ‰ bis Zone VI 3,90 ‰, Mindestprämie 40 €, SB 500 € (PK 7710) bringt −20 %, VSt 16,15 %.", "Glas: nicht versichert sind Kratzer, optische Gläser, Geschirr, Displays und PV-Module. Falsche Wohnfläche: Schaden × gezahlte ÷ richtige Prämie."]],
    ["Wohngebäude nach Proximus 5 (VGB 2021, S. 38–74)", ["Gleitender Neuwert in Preisen von 1914. Prämie = VS 1914 × Prämiensatz × Anpassungsfaktor. Der Neuwertanteil wird nur bei Wiederherstellung binnen 3 Jahren gezahlt.", "Mietausfall höchstens 12 Monate, auch für selbst bewohnte Räume (Mietwert).", "Leitungswasser außen nur für Zuleitungen auf dem Grundstück. Regenfallrohre innen über Klausel 7166, Ableitungen über 7262/7263.", "Klauseln: 7363 Bäume nur nach Blitz oder Sturm bis 2.000 €, 7366 Graffiti bis 10.000 € je Jahr mit 500 € SB, 7165 Fahrzeuganprall durch Fremde.", "Neubaunachlass 20 % bis zum Ende des Versicherungsjahres, in dem das Gebäude 10 Jahre alt wird. SB 500 € je Gefahr (7761) bringt −20 %.", "Bauartklassen: I massiv mit harter Bedachung, III Holz hart, IV und V weiche Bedachung. Bei gemischter Bauweise gilt die ungünstigere ab über 25 %."]]
  ],
  keys:[["10 %","Außenversicherung, max. 10.000 €"],["1.500 €","Bargeld"],["20.000 €","Schmuck"],["20 %","Wertsachen im Wertschutzschrank"],["PK 7215","Naturgefahren draußen"],["7264","Carport, Zaun"],["7363","Bäume bis 2.000 €"],["5 %","Aufräumkosten der VS 1914"],["16,15 %","VSt Hausrat"],["16,34 %","VSt Gebäude mit Feuer"],["3.000 €", "Urkunden, Sparbücher"],["650 €/m²", "Unterversicherungsverzicht"],["60 Tage", "unbewohnt = Gefahrerhöhung"],["12 Monate", "Mietausfall Wohngebäude"]],
  src:"IHK-Lösungen S24, W24/25, S25, W25/26 · Proximus 5 (Bedingungen und Tarife)"
},
gesund:{
  sections:[
    ["Versicherungspflicht und Wechsel",[
      "JAEG 2026: 6.450 € im Monat bzw. 77.400 € im Jahr. Wer ein Jahr darüber liegt, kann in die PKV wechseln. BBG KV/PV 2026: 5.812,50 € im Monat.",
      "Zum Jahresentgelt zählen 13. Gehalt, VWL, Dienstwagen und regelmäßige Pauschalen. Einmalzahlungen wie Jubiläumsprämie und Bonus zählen nicht.",
      "Selbstständige werden versicherungsfrei. Austritt aus der GKV innerhalb von 2 Wochen nach Hinweis, sonst Kündigung zum Ende des übernächsten Monats mit PKV-Nachweis.",
      "Wer über 55 ist und seit über 5 Jahren privat versichert, wird bei Arbeitslosigkeit nicht wieder versicherungspflichtig. Beitragssenkung über Tarifwechsel, KT prüfen.",
      "Studium: Tochter wird GKV-pflichtig, Befreiung möglich und dann beihilfekonform in der PKV bleiben.",
      "Beihilfe: Beamtin mit 2 Kindern 70 %, jedes Kind 80 %."
    ]],
    ["Neugeborene, Wartezeiten, Gesundheitsprüfung",[
      "Neugeborene ohne Gesundheitsprüfung und Wartezeit, wenn ein Elternteil seit mindestens 3 Monaten versichert ist und das Kind innerhalb von 2 Monaten rückwirkend angemeldet wird. Schutz nicht höher als beim Elternteil.",
      "Allgemeine Wartezeit entfällt bei Unfällen. Besondere Wartezeit von 8 Monaten (z. B. Zahnersatz) entfällt auch bei Unfällen nicht.",
      "Keine Wartezeit bei Wechsel aus GKV oder anderer PKV (Anrechnung) und bei Beamten, deren Beihilfesatz sich ändert (§ 199 Abs. 2 VVG).",
      "Gesundheitsprüfung immer bei Wechsel in einen besseren Tarif, bei zusätzlichen Einschlüssen und bei Wechsel von einer anderen Gesellschaft.",
      "Versicherungsschutz beginnt erst, wenn technischer und formeller Beginn erreicht und Wartezeiten abgelaufen sind."
    ]],
    ["Leistungsfälle",[
      "Geltungsbereich Krankheitskosten und KHT: Europa. Außereuropäisch: die ersten 2 Monate eines vorübergehenden Aufenthalts, länger nur, wenn die Rückreise die Gesundheit gefährden würde.",
      "Krankentagegeld nur bei Arbeitsunfähigkeit in Deutschland. Ausnahme: Unfall im europäischen Ausland mit stationärer Behandlung im öffentlichen Krankenhaus.",
      "Ausgeschlossene Ärzte: keine Leistung. Bei schwebenden Fällen erst 3 Monate nach der Benachrichtigung.",
      "Prämienverzug: nach qualifizierter Mahnung 2 Wochen Zahlungsfrist, danach Leistungsfreiheit. Bei kündbaren Tarifen außerordentliches Kündigungsrecht.",
      "Heilpraktiker erstattungsfähig. Der Versicherer darf auf die Kosten schulmedizinischer Behandlung kürzen.",
      "Lasik erst 4 Jahre nach Tarifbeginn, 100 % bis 1.000 €. Danach 5 Jahre keine Sehhilfen.",
      "Über dem 3,5-fachen GOÄ/GOZ-Satz braucht die Rechnung eine Begründung. Kosmetische Mehrkosten bei KFO werden nicht erstattet.",
      "KHT bei PROXIMUS höchstens 55 € pro Tag."
    ]],
    ["Pflege",[
      "Die Pflegepflichtversicherung leistet auch bei geistigen Einschränkungen, wenn sie voraussichtlich länger als 6 Monate bestehen und Medicproof einen Pflegegrad festgestellt hat.",
      "Wohnumfeldverbesserung bis 4.000 € je Maßnahme. Entscheidung innerhalb von 3 Wochen nach Antrag.",
      "Pflegehilfsmittel nach Hilfsmittelverzeichnis, vorrangig leihweise.",
      "Pflege-Bahr (GEPV): 5 € staatliche Förderung im Monat, Wartezeit 5 Jahre. Ergänzend Tarif PET mit 3 Jahren Wartezeit.",
      "Gesetzliche und private Pflegepflichtversicherung leisten gleich viel."
    ]],
    ["Kranken nach Proximus 5 (S. 348–447)", ["Allgemeine Wartezeit 3 Monate, besondere Wartezeit 8 Monate für Entbindung, Psychotherapie, Zahnbehandlung, Zahnersatz und Kieferorthopädie (MB/KK § 3, S. 349).", "Krankentagegeld: Arbeitsunfähig ist, wer den Beruf vorübergehend in keiner Weise ausüben kann und auch nicht ausübt. KT und Krankengeld zusammen dürfen das Nettoeinkommen nicht übersteigen (MB/KT, S. 358 f.).", "KT-Tarife: KT 43 für Arbeitnehmer (GKV-Versicherte nur die Lücke zwischen Netto und Krankengeld), KT 8/15/22 für Selbstständige, höchstens 260 € je Tag, Anpassung alle 3 Jahre ohne Gesundheitsprüfung, Aufnahme bis 60 (S. 435).", "PPV-Wartezeit: 2 Jahre Versicherung innerhalb der letzten 10 Jahre. Kinder erfüllen sie über ein Elternteil (S. 367).", "GEPV (Pflege-Bahr): Eigenanteil mindestens 10 € plus 5 € Zulage im Monat, Wartezeit 5 Jahre (S. 383). PET: Wartezeit 3 Jahre (S. 389).", "Annahmerichtlinien: Erschwerungsdauer = Rezidivfrist minus beschwerdefreie Jahre. Bis 6 Monate abrunden, ab 7 Monaten aufrunden. Beginn zwischen 1.7. und 1.12. verlängert um 1 Jahr (S. 423).", "Risikozuschlag erst nach 4 beschwerdefreien Monaten. In der substitutiven KV keine Leistungsausschlüsse, in Zusatztarifen höchstens 4, sonst Ablehnung (S. 423).", "Vollversicherung: A0/A1/A2 mit SB 0/500/1.000 € (Kinder 0/250/500 €), S1 Mehrbett, S2 Zweibett, S3 Einbett, Z1/Z2/Z3 Zahnersatz 85/75/50 %. Beitragsrückerstattung 3 Monatsbeiträge bei Leistungsfreiheit (S. 426).", "GKV-Ergänzung: AEV Heilpraktiker 80 % bis 1.000 € je Jahr, Brille bis 200 €. ZEV Zahnersatz 85 %, Zahnreinigung 2 × jährlich bis 50 €. SEV Ein- oder Zweibettzimmer und Chefarzt (S. 424).", "Basistarif: Leistungen wie GKV, SB wählbar 300 bis 1.200 €. Notlagentarif: nur akute Erkrankungen, Schmerzzustände und Schwangerschaft (S. 427).", "BEV senkt den Beitrag ab 65 um mindestens 50 € im Monat. Anwartschaft klein: später ohne neue Gesundheitsprüfung, groß: zusätzlich mit dem Eintrittsalter bei Abschluss (S. 425)."]]
  ],
  keys:[["77.400 €","JAEG 2026 / Jahr"],["5.812,50 €","BBG KV / Monat"],["3 / 2 Mon.","Neugeborene: Vorversicherung / Anmeldung"],["8 Mon.","besondere Wartezeit"],["2 Mon.","außereuropäisches Ausland"],["2 Wochen","nach qualifizierter Mahnung"],["55 €","max. KHT PX"],["4.000 €","Wohnumfeld je Maßnahme"],["5 €","GEPV-Förderung"],["§ 204 VVG","Tarifwechsel"],["260 €", "KT-Höchstsatz/Tag"],["2 in 10 J.", "PPV-Wartezeit"],["4 Monate", "vor Risikozuschlag"],["max. 4", "Leistungsausschlüsse Zusatz"]],
  src:"IHK-Lösungen S24–W25/26 · KBF 4 · RW-Skript 2026 · Einstieg GAP II · Proximus 5 (Bedingungen und Tarife)"
},
vorsorge:{
  sections:[
    ["Drei-Schichten-Modell",[
      "1. Schicht Basisversorgung: gesetzliche Rente, Rürup (Basisrente).",
      "2. Schicht Zusatzversorgung: Riester, betriebliche Altersversorgung.",
      "3. Schicht private Vorsorge: Kapital-LV (Tod und Erleben), Risiko-LV (Tod), private Rente (Erleben), sofort beginnend oder aufgeschoben."
    ]],
    ["Basisrente (Rürup)",[
      "Beiträge bis zum Höchstbetrag als Vorsorgeaufwendungen absetzbar.",
      "Nachgelagerte Besteuerung: die Rente wird später nach Kohorte versteuert.",
      "Nicht vererbbar, nicht übertragbar, nicht beleihbar, nicht veräußerbar, nicht kapitalisierbar. Kündigung führt zur Beitragsfreistellung. Rente frühestens mit 62.",
      "Tod vor Rentenbeginn: keine Leistung, es sei denn, eine Hinterbliebenenrente ist eingeschlossen."
    ]],
    ["Private Rente und Lebensversicherung",[
      "Beiträge aus versteuertem Einkommen. Die Rente wird nur mit dem Ertragsanteil versteuert.",
      "Rentengarantiezeit im Tarif S30: 10 Jahre. Tod vor Rentenbeginn: Beitragsrückgewähr.",
      "Bei GKV-pflichtversicherten Hinterbliebenen fallen keine Kassenbeiträge auf die private Rente an.",
      "Rente garantiert berechnen per Dreisatz: Rente laut Tarif × Jahresbeitrag ohne Stückkosten ÷ Tarifbeitrag.",
      "Bewertungsreserven entstehen, wenn der Marktwert der Kapitalanlagen den Buchwert übersteigt. Sie werden jährlich, bei Vertragsende und bei Rentenbeginn ermittelt und sind nicht garantiert.",
      "Fondsgebundene Versicherung im Todesfall: Anteile × Wert am 2. Börsentag nach Eingang der Todesfallmeldung.",
      "Hybrid-Rentenversicherung mit Dread-Disease-Option: bei schwerer Krankheit Auszahlung des Deckungskapitals."
    ]],
    ["Bezugsrecht, Abtretung, Leistungsprüfung",[
      "Bezugsrecht in Textform, wirksam ab Zugang beim Versicherer. Widerruflich: jederzeit änderbar. Unwiderruflich: nur mit Zustimmung des Bezugsberechtigten.",
      "Abtretung an eine Bank: die Bank erhält die Restschuld, den Rest der Bezugsberechtigte. Die Unfalltod-Zusatzversicherung geht an den Bezugsberechtigten.",
      "Selbsttötung in den ersten 3 Jahren: nur Rückkaufswert. Bei einer vereinbarten Erhöhung beginnt die Frist für den Erhöhungsbetrag neu, bei einer planmäßigen Dynamik-Erhöhung nicht (Proximus 5, S. 308). Ausnahme: krankhafte Störung der Geistestätigkeit. Die Unfalltod-Zusatzversicherung schließt Selbsttötung immer aus.",
      "Überschussverwendung Beitragsverrechnung: im Todesfall keine zusätzliche Überschussbeteiligung.",
      "Unterlagen: Sterbeurkunde, ärztlicher Bericht zur Todesursache, Versicherungsschein, bei Unfall der Polizeibericht, Kontoverbindung."
    ]],
    ["Leben nach Proximus 5 (S. 173–324)", ["Mindestbeitrag 240 € im Jahr (fondsgebunden 300 €), Einmalbeitrag mindestens 5.000 €. Eintrittsalter = Beginnjahr minus Geburtsjahr (S. 309).", "Stückkosten: 24 € jährlich, 12 € halbjährlich, 6 € vierteljährlich, 2 € monatlich. Unterjährig: Jahresbeitrag ÷ 1,9607843 (halbj.), ÷ 3,8834951 (viertelj.), ÷ 11,4285710 (monatl.) (S. 309).", "Abschlusskosten 2,5 % der Beitragssumme, verteilt auf 5 Jahre (S. 309).", "Basisrente S 10: Rente frühestens mit 62, keine Kapitalauszahlung (nur Abfindung einer Kleinbetragsrente), bei Tod ohne Zusatzversicherung keine Leistung (S. 174, 310).", "Zulagen-Rente S 20 (Riester): Rente frühestens mit 62, bis 30 % Teilkapital zu Rentenbeginn, Tod vor Rentenbeginn: Deckungskapital wird gezahlt. Beiträge und Zulagen sind zu Rentenbeginn garantiert (S. 184, 311).", "S 30 aufgeschobene Rente mit Beitragsrückgewähr und 10 Jahren Garantiezeit. S 31 sofort beginnende Rente gegen Einmalbeitrag (Eintrittsalter 50 bis 70, RGZ 10 oder 20 Jahre). S 32 fondsgebunden mit Kapitalwahlrecht, Rentenbeginn 67 (S. 312–314).", "Kapital-LV S 34: VS bei Ablauf oder Tod. Termfix: Auszahlung zum festen Termin, bei Tod endet nur die Beitragszahlung (S. 192, 316).", "Vorläufiger Schutz für das Todesfallkapital: höchstens 100.000 €, ab Antragseingang, längstens 2 Monate, versicherte Person 7 bis 64 Jahre, bekannte Vorerkrankungen ausgeschlossen (S. 306).", "Dynamik: Erhöhung wie der Höchstbeitrag der DRV oder fest 2 bis 10 %, ohne Gesundheitsprüfung bis 65. Widerspruch bis Ende des ersten Monats. Nach 3 entfallenen Erhöhungen in Folge keine weiteren (S. 308).", "Hinterbliebenenrenten-Zusatz: Rente an die mitversicherte Person, solange sie lebt. Mit Rentengarantiezeit erst nach deren Ablauf (S. 305).", "Anzeigepflichtverletzung: Die Rechte des Versicherers erlöschen nach 5 Jahren, bei Vorsatz oder Arglist nach 10 Jahren."]]
  ],
  keys:[["62","Mindestrentenalter Rürup"],["10 Jahre","Rentengarantiezeit S30"],["3 Jahre","Selbsttötungsfrist"],["2. Börsentag","nach Todesfallmeldung"],["Ertragsanteil","private Rente"],["nachgelagert","Rürup, Riester"],["240 €", "Mindestbeitrag/Jahr"],["2,5 %", "Abschlusskosten"],["100.000 €", "vorläufiger Schutz"],["30 %", "Teilkapital Riester"]],
  src:"IHK-Lösungen S24–W25/26 · KBF 6 · Einstieg GAP II · Proximus 5 (Bedingungen und Tarife)"
},
finanz:{
  sections:[
    ["Rechtlicher Rahmen und Grundsätze",[
      "Grundlagen: Wertpapierhandelsgesetz, Geldwäschegesetz, Finanzanlagenvermittlungsverordnung, Beraterhaftung, WpHG-Fragebogen.",
      "Magisches Dreieck: Liquidität, Rentabilität, Sicherheit stehen im Zielkonflikt.",
      "Geldmarkt: Anlage bis 1 Jahr (Giro, Tages- und Festgeld, Geldmarktfonds). Kapitalmarkt: länger (Renten- und Aktienmarkt)."
    ]],
    ["Fonds",[
      "Kosten: Ausgabeaufschlag, Verwaltungsgebühren, Depotgebühren.",
      "Ausschüttend zahlt Erträge aus, thesaurierend legt sie wieder an.",
      "Cost-Average-Effekt: Ein fester Betrag in regelmäßigen Abständen führt zu einem günstigeren Durchschnittspreis als der Kauf einer festen Stückzahl.",
      "Dachfonds investieren in Anteile anderer Fonds.",
      "Anteilspreis = Fondsvermögen ÷ Anzahl Anteile. Ausgabepreis = Anteilspreis + Ausgabeaufschlag.",
      "ESG: Environment, Social, Governance. Ethic Invest beachtet zusätzlich den UN Global Compact.",
      "Risikoklassen SRRI von 1 (gering) bis 7 (hoch)."
    ]],
    ["PROXIMUS-Fonds",[
      "Cash Invest: Geldmarktfonds, SRRI 1, kein Ausgabeaufschlag, 0,25 % laufende Kosten, thesaurierend, Benchmark EURIBOR.",
      "Bond Invest: Rentenfonds mit Unternehmensanleihen in Euro, SRRI 3, mäßig schwankend.",
      "Global Invest: weltweiter Aktienfonds (1/5 Deutschland, 2/5 Euro-Ausland, 2/5 Nicht-Euro), SRRI 6.",
      "Real Invest: offener Immobilienfonds, Mindesthaltefrist 24 Monate, Rückgabefrist 12 Monate.",
      "Euro Indexx 49 Invest: passiver ETF auf die 49 größten Unternehmen der Eurozone, kein Ausgabeaufschlag, 0,20 % Kosten."
    ]],
    ["Anleihen und Aktien",[
      "Steigen die Marktzinsen, fallen die Kurse bestehender Anleihen, und umgekehrt. Der Effekt ist umso stärker, je länger die Restlaufzeit ist.",
      "Wer bis zum Laufzeitende hält, hat keinen Kursverlust, da der Emittent an die Anleihebedingungen gebunden ist.",
      "Bonität: AAA (z. B. Bundesanleihe) hat das geringste Ausfallrisiko.",
      "Ursachen für Kursschwankungen: Konjunktur, Staatsdefizite, Wirtschaftskrisen, unternehmensspezifische Ereignisse.",
      "Wert des Bezugsrechts = (alter Kurs − Emissionskurs) ÷ (Bezugsverhältnis + 1)."
    ]],
    ["Proximus-Fonds im Detail (KID, S. 474–528)", ["Bond Invest: SRRI 3, Ausgabeaufschlag 3,00 %, laufende Kosten 0,86 %, ausschüttend, Anlagehorizont ab 4 Jahren (S. 474 f.).", "Balance Invest: Mischfonds aus Staatsanleihen und Aktien, SRRI 5, AA 3,40 %, 1,25 %, ausschüttend, ab 5 Jahren (S. 482).", "Strategic Invest: Dachfonds aus Aktien- und Rentenfonds, SRRI 4, AA 2,00 %, 2,25 %, thesaurierend, ab 4 Jahren (S. 486).", "Global Invest: SRRI 6, AA 4,25 %, 2,01 %, thesaurierend, ab 7 Jahren (S. 478).", "Ethic Invest: nachhaltiger Aktienfonds, SRRI 5, AA 3,80 %, 1,65 %, thesaurierend, ab 6 Jahren (S. 490).", "Cash Invest: dazu erfolgsabhängige Gebühr von 25 % der Rendite über dem EURIBOR, auch für sehr kurze Anlagedauer geeignet (S. 501).", "Real Invest: AA 5,50 %, 0,92 %, ganz oder teilweise ausschüttend, ab 4 Jahren, Liquiditätsrisiko wegen Halte- und Rückgabefrist (S. 512).", "Euro Indexx 49 Invest: ETF mit voller Replikation, SRRI 6, thesaurierend, ab 6 Jahren (S. 526).", "Kein Proximus-Fonds hat einen Rücknahmeabschlag. Die Wertentwicklung im KID ist ohne Ausgabeaufschlag gerechnet.", "Fondsgebundene Rente S 32: sicherheitsorientiert (Bond, 2 %), renditeorientiert (Balance, 4 %), chancenorientiert (Global, 6 %) (S. 314)."]]
  ],
  keys:[["SRRI 1","Cash Invest"],["SRRI 3","Bond Invest"],["SRRI 6","Global Invest"],["24 / 12 Mon.","Real Invest Halte- / Rückgabefrist"],["≤ 1 Jahr","Geldmarkt"],["5,50 %", "AA Real Invest"],["4,25 %", "AA Global Invest"],["0,20 %", "Kosten Indexx 49"],["SRRI 4", "Strategic Invest"]],
  src:"IHK-Lösungen S24, W24/25, S25, W25/26 · Übersicht der Proximus Fonds · Einstieg GAP II · Proximus 5 (Bedingungen und Tarife)"
},
einkommen:{
  sections:[
    ["Private Unfallversicherung (PUV)",[
      "Leistet ab 1 % Invalidität, rund um die Uhr und weltweit. PUV-Leistungen werden nicht mit der gesetzlichen Unfallversicherung verrechnet.",
      "Gesetzliche UV: ab 20 % MdE, nur Arbeitsunfall, Wegeunfall, Berufskrankheit.",
      "Gliedertaxe aus den Aufgaben: ganzes Bein 70 %, ein Auge 50 %. Teilverlust anteilig, z. B. 40 % Beeinträchtigung des Beins = 28 %.",
      "Progression U 350: bis 25 % einfach, 26 bis 50 % dreifach, ab 51 % fünffach. U 500: bis 25 % einfach, 26 bis 50 % fünffach, über 50 % siebenfach. U 225: zweifach bzw. dreifach (Proximus 5, S. 329).",
      "Mitwirkung von Krankheiten ab 25 % kürzt alle Leistungen entsprechend.",
      "Todesfallleistung, wenn die Person innerhalb eines Jahres an den Unfallfolgen stirbt.",
      "Soforthilfe in % der VS, z. B. Schlüsselbein 20 %, Wirbelsäule 50 %, Oberschenkelhals 75 %, Schädelhirntrauma 2. Grades 20 %, Kiefer/Jochbein 30 %. Insgesamt höchstens 100 %.",
      "Kinder unter 14: Rooming-in in Höhe des KHT, Neubemessung bis 5 Jahre (PX, Stand 2026). Neugeborene 6 Monate beitragsfrei, plus 6 Monate bei Anzeige.",
      "Kosmetische OP bis zur vereinbarten Summe, Such-, Bergungs- und Rettungskosten bis 25.000 € beitragsfrei.",
      "Mit 67 Wechsel in Tarif 50: Invalidität ohne Progression, Krankentagegeld entfällt, KHT auf 25 € gekürzt. Kündigungsrecht 1 Monat nach Zugang.",
      "Steuer: einmalige Leistungen steuerfrei, Unfallrente mit Ertragsanteil."
    ]],
    ["Berufsunfähigkeit (BU)",[
      "BU liegt vor, wenn der zuletzt ausgeübte Beruf voraussichtlich mindestens 6 Monate zu mindestens 50 % nicht ausgeübt werden kann.",
      "Anspruch auf Rente und Beitragsbefreiung mit Ablauf des Monats, in dem die BU eingetreten ist.",
      "Meldung später als 3 Monate: Anspruch erst ab Beginn des Monats der Mitteilung.",
      "Tarif S 35: 43 % Bonusrente auf die garantierte Rente, Anfangshilfe von 3 garantierten Monatsrenten.",
      "Unterlagen: Geburtsurkunde, Ursache der BU, Liste aller Behandler und Arbeitgeber, ärztliche Berichte, Berufsbeschreibung, Einkommensnachweis.",
      "BU-Rente der 3. Schicht wird mit dem Ertragsanteil versteuert."
    ]],
    ["Erwerbsminderungsrente (gesetzlich)",[
      "Maßstab ist jede Tätigkeit am allgemeinen Arbeitsmarkt, nicht der Beruf.",
      "Voll erwerbsgemindert unter 3 Stunden täglich, teilweise 3 bis unter 6 Stunden.",
      "Voraussetzung: 5 Jahre Wartezeit und 36 Pflichtbeitragsmonate in den letzten 5 Jahren."
    ]],
    ["Risiko-LV im Todesfall",[
      "Unterlagen anfordern, Bezugsrecht prüfen (z. B. Tochter statt Ehemann), Abtretung an die Bank beachten.",
      "Versicherungssumme plus Unfalltod-Zusatzversicherung. Mit dem Tod endet der Vertrag."
    ]],
    ["Unfall nach Proximus 5 (AUB 2022, S. 326–342)", ["Invalidität heißt dauerhaft, also voraussichtlich über 3 Jahre. Eintritt und ärztliche Feststellung innerhalb von 24 Monaten, Geltendmachung ebenfalls innerhalb von 24 Monaten (S. 328).", "Als Unfall gelten auch erhöhte Kraftanstrengung (nicht Meniskus und Bandscheibe), Oberschenkelhalsbruch jeder Ursache, Zeckenstiche, Impfschäden, Tauchschäden und Ertrinken (S. 327).", "Gliedertaxe: Arm 70 %, Hand 55 %, Daumen 20 %, Zeigefinger 10 %, Fuß 40 %, Auge 50 %, Gehör auf einem Ohr 30 %, Niere 20 %, Geruch 10 %. Vorinvalidität wird abgezogen, mehrere Körperteile höchstens 100 % (S. 329).", "Unfallrente ab 50 % Invalidität, ab 90 % doppelt (nicht im Tarif 50), rückwirkend ab dem Unfallmonat (S. 329 f.).", "Tagegeld nach dem Grad der Arbeitsunfähigkeit, längstens 1 Jahr. KHT längstens 3 Jahre, bei ambulanter OP 7 Tage (S. 330 f.).", "Alkohol: Bewusstseinsstörung liegt unwiderlegbar vor ab 1,1 ‰ am Steuer, 1,6 ‰ auf dem Fahrrad und 2,0 ‰ in allen anderen Fällen (S. 333).", "Weitere Ausschlüsse: Bandscheibe und Hirnblutung (außer der Unfall war zu über 50 % Ursache), psychische Reaktionen, Bauch- und Unterleibsbrüche, Piloten und Gleitschirmflieger mit Erlaubnispflicht, Motorrennen (S. 334).", "Nach dem Unfall: unverzüglich zum Arzt, Unfalltod innerhalb von 48 Stunden melden. Der Versicherer erklärt sich binnen 1 Monat (Invalidität 3 Monate), zahlt binnen 14 Tagen und übernimmt Arztkosten bis 100 € je Leistungsart (S. 335 f.).", "Kindertarif: Nach dem Versicherungsjahr, in dem das Kind 18 wird, Umstellung auf Erwachsene. Berufswechsel unverzüglich melden: neue VS = VS × alter ÷ neuer Prämiensatz (S. 334 f.).", "Tarif: Gefahrengruppe A (kaufmännisch, Schüler, Studenten) und B (handwerklich, +50 %). Tagegeld ab dem 1. Tag nur für Selbstständige, ab dem 43. Tag auch für Arbeitnehmer. Junge-Leute-Nachlass 20 % bis 25, ab 3 Personen 15 %, 3 Jahre Laufzeit 10 % (S. 340 f.).", "Prämie je 1.000 € Invalidität, Tarif 30 A/B: einfach 1,32/1,98 €, U 225 2,16/3,24 €, U 350 2,70/4,05 €, U 500 2,94/4,41 €. Mindestabschluss 20.000 € Invalidität oder 200 € Rente (S. 342)."]],
    ["BU und Risiko-LV nach Proximus 5 (S. 254–317)", ["BU liegt auch vor, wenn 6 Monate ununterbrochen BU bestand: Die Fortdauer gilt dann als BU (S. 262).", "Proximus verzichtet auf die abstrakte Verweisung. Es zählt nur eine tatsächlich ausgeübte andere Tätigkeit, die der bisherigen Lebensstellung entspricht (S. 262).", "Bis zur Entscheidung zahlt der Kunde die Beiträge weiter, bei Anerkennung werden sie erstattet. Rente monatlich im Voraus, Schutz weltweit (S. 261).", "BU durch Pflegebedürftigkeit: 1 Pflegepunkt 40 %, 2 Punkte 70 %, ab 3 Punkten 100 % der Rente (S. 261).", "Wiedereingliederungshilfe: 6 Monatsrenten, wenn nach mindestens 2 Jahren BU die Leistung endet (S. 262).", "Ausbauoption ohne Gesundheitsprüfung binnen 6 Monaten nach Heirat, Geburt, Studienabschluss, Gehaltsplus von 10 % u. a.: bis +100 % der Rente, höchstens 30.000 € im Jahr und 60 % des Bruttoeinkommens, bis zum 50. Geburtstag (S. 262).", "Tarif S 35: kaufmännische Berufe Normaltarif, akademische −20 %, handwerkliche +30 %, Beamte mit Dienstunfähigkeitsklausel +50 % (S. 317).", "Risiko-LV: Nichtraucher hat 12 Monate keinen Tabak unter Feuer konsumiert. Wer Raucher wird, muss es melden. Ohne Meldung wird die VS nach 2 Monaten im Verhältnis gekürzt (S. 254).", "Unfalltod-Zusatzversicherung: Tod innerhalb eines Jahres nach dem Unfall (S. 303)."]]
  ],
  keys:[["1 %","PUV ab Invalidität"],["20 %","gesetzliche UV ab MdE"],["70 %","Bein (Gliedertaxe)"],["50 %","Auge"],["25 %","Mitwirkung kürzt"],["1 Jahr","Tod nach Unfall"],["25.000 €","Bergungskosten"],["50 %","BU-Grad"],["3 Mon.","BU-Meldefrist"],["43 %","Bonusrente S 35"],["3 h / 6 h","EMR voll / teilweise"],["24 Mon.", "Invalidität eintreten und melden"],["1,1 / 1,6 / 2,0 ‰", "Kfz / Rad / sonst"],["48 h", "Unfalltod melden"],["+50 %", "Gefahrengruppe B"]],
  src:"KBF 6 Lösung (2026) · IHK-Lösungen S24–W25/26 · Lernzusammenfassung PUV & BU · Proximus 5 (Bedingungen und Tarife)"
},
rw:{
  sections:[
    ["Buchführung der Agentur",[
      "Aktivtausch (z. B. Barkauf eines Autos), Passivtausch (Umschuldung), Aktiv-Passiv-Mehrung (Darlehen aufs Konto), Aktiv-Passiv-Minderung (Tilgung per Bank).",
      "Bestandskonten schließen über die Bilanz ab, Erfolgskonten über die GuV, Privat und GuV über das Eigenkapital.",
      "Entschädigung und Regulierungsaufwand schließen über „Forderungen gegen Direktion“ ab. Für den Generalagenten sind sie kein Aufwand.",
      "Zentrales Direktinkasso: Provisionsgutschrift = Provisionsertrag und Forderung gegen Direktion. Die Überweisung ist ein Aktivtausch. Provision an Untervermittler = Provisionsaufwand und Verbindlichkeit.",
      "Kassendifferenz: Ist mehr in der Kasse als gebucht, Kassendifferenz-Ertrag. Fehlt Geld, Kassendifferenz-Aufwand.",
      "Gehaltsvorschuss oder Darlehen an Mitarbeiter: Forderung gegen AN, Aktivtausch, kein Aufwand.",
      "Hypothekenzinsen und Grundsteuer gehören in den Haus- und Grundstücksaufwand, nicht in den Zinsaufwand."
    ]],
    ["Anlagen, Abgrenzung, Rückstellungen",[
      "Bis 250 € netto: sofort Aufwand. GWG bis 800 €: 100 % Abschreibung am 31.12. (Alternative 1). Sammelposten 250 bis 1.000 €: 5 Jahre je 20 % (Alternative 2). Darüber linear und monatsgenau. Computer dürfen sofort voll abgeschrieben werden.",
      "Verkauf von Anlagevermögen: Restbuchwert ermitteln. Darunter verkauft = außerordentlicher Aufwand, darüber = außerordentlicher Ertrag.",
      "ARA: Aufwand im alten Jahr bezahlt, gehört ins neue. PRA: Ertrag im alten Jahr erhalten. Sonstige Verbindlichkeit / Forderung: Aufwand / Ertrag des alten Jahres erst im neuen bezahlt.",
      "Rückstellung: Aufwand geschätzt im alten Jahr. Zahlung gleich hoch: nur Auflösung (Aktiv-Passiv-Minderung). Zahlung niedriger: außerordentlicher Ertrag. Höher: außerordentlicher Aufwand."
    ]],
    ["Kosten- und Leistungsrechnung",[
      "Aufwand ist der gesamte Werteverzehr, Kosten der betriebsbedingte.",
      "Neutraler Aufwand gehört nicht in die KLR: betriebsfremd (Spenden, Einkommensteuer), außerordentlich (Schäden, Verkauf unter Buchwert), periodenfremd (Nachzahlungen).",
      "Gesamtkosten = Grundkosten + kalkulatorische Kosten. Anderskosten: kalkulatorische Abschreibung. Zusatzkosten: kalkulatorischer Unternehmerlohn, Zinsen, Miete.",
      "Der kalkulatorische Unternehmerlohn mindert das Betriebsergebnis, aber nicht den steuerlichen Gewinn.",
      "Leistungen = Provisionserträge. Betriebsergebnis = Leistungen − Gesamtkosten. Unternehmensergebnis = alle Erträge − alle Aufwendungen.",
      "Kostenarten (welche?), Kostenstellen (wo?), Kostenträger (wofür?). Variable vs. fixe Kosten, Einzel- vs. Gemeinkosten."
    ]],
    ["Kennzahlen",[
      "Schadenquote = Schadenaufwand × 100 ÷ Beiträge. Verwaltungskostenquote = Verwaltungskosten × 100 ÷ Beiträge. Combined Ratio = (Schaden + Kosten) × 100 ÷ Beiträge.",
      "Stornoquote, Zuwachsrate = Zuwachs × 100 ÷ Anfangsbestand, Schadenhäufigkeit = Schäden × 100 ÷ Verträge, Schadendurchschnitt = Aufwand ÷ Anzahl Schäden.",
      "Liquidität 1. Grades = flüssige Mittel × 100 ÷ kurzfristiges FK. 2. Grades zusätzlich kurzfristige Forderungen.",
      "Anlagendeckung 1 = EK × 100 ÷ AV. Anlagendeckung 2 = (EK + langfristiges FK) × 100 ÷ AV, 100 % ist die goldene Bilanzregel.",
      "EK-Rentabilität = (Gewinn − Unternehmerlohn − EK-Verzinsung) × 100 ÷ EK."
    ]],
    ["Gehaltsabrechnung 2026",[
      "KV: (14,6 % + Zusatzbeitrag) ÷ 2, z. B. 8,55 % bei 2,5 % Zusatzbeitrag. RV 9,3 %, AV 1,3 %.",
      "PV: Hälfte von 3,6 %. Kinderlose ab 23 zahlen 0,6 Punkte mehr, ab dem 2. Kind 0,25 Punkte weniger je Kind.",
      "BBG RV/AV 8.450 € im Monat, KV/PV 5.812,50 €. Kirchensteuer in Bayern 8 % der Lohnsteuer.",
      "VWL bis 40 € und nicht steuerfreie Zuschüsse erhöhen das steuer- und SV-pflichtige Einkommen."
    ]]
  ],
  keys:[["20 Pkt.","RW in der GAP II"],["250 €","Sofortaufwand netto"],["800 €","GWG Alt. 1"],["1.000 €","Sammelposten Alt. 2"],["100 %","goldene Bilanzregel"],["8,55 %","KV-Anteil AN bei 2,5 %"],["9,3 %","RV-Anteil"],["+0,6","PV kinderlos ab 23"]],
  src:"RW-Skript 2026 · Lernzusammenfassung KLR · IHK-Lösungen S24–W25/26"
},
wiso:{
  sections:[
    ["Recht und Unternehmen",[
      "Die AG ist eine juristische Person des privaten Rechts und damit rechtsfähig.",
      "Ein Schreibfehler (Erklärungsirrtum) macht den Vertrag nicht nichtig. Er ist wirksam, aber anfechtbar.",
      "Mieter ist Besitzer (tatsächliche Gewalt), Vermieter bleibt Eigentümer (rechtliche Gewalt).",
      "AGB sind vorformulierte Bedingungen. Sie werden Vertragsbestandteil, soweit keine Rechtsvorschriften wie das BGB entgegenstehen.",
      "Bei einem Mangel hat der Käufer vorrangig das Recht auf Nacherfüllung.",
      "Prokura darf z. B. Grundstücke erwerben, aber nicht die Bilanz unterschreiben oder das Geschäft aufgeben. Gesamtprokura heißt: nur gemeinsam.",
      "Kündigung ist ein einseitiges, empfangsbedürftiges Rechtsgeschäft. Eine Bestellung auf eine Werbeanzeige braucht noch eine Auftragsbestätigung.",
      "GmbH-Gewinn ohne Regelung nach Geschäftsanteilen. In der OHG haftet jeder Gesellschafter unmittelbar und unbeschränkt, Beschränkungen im Innenverhältnis gelten nach außen nicht."
    ]],
    ["Markt und Wirtschaftspolitik",[
      "Gleichgewichtspreis: Angebot = Nachfrage, dort ist die abgesetzte Menge am höchsten. Unter dem Gleichgewicht herrscht Nachfrageüberhang (Verkäufermarkt).",
      "Lohnquote = Anteil der Arbeitnehmerentgelte am Volkseinkommen. Sparquote = Sparen der privaten Haushalte am verfügbaren Einkommen.",
      "Aufschwung: steigende Kapazitätsauslastung, sinkende Arbeitslosigkeit. Überhitzung gefährdet die Preisniveaustabilität.",
      "EZB erhöht die Geldmenge durch Leitzinssenkung oder Kauf von Wertpapieren. Höhere Mindestreserve senkt sie.",
      "Der Staat steuert über Einnahmen- und Ausgabenpolitik, z. B. Investitionen in Infrastruktur."
    ]],
    ["Arbeitsrecht und Ausbildung",[
      "Betriebsrat: wahlberechtigt ab 16 Jahren (ohne leitende Angestellte), wählbar ab 18 mit 6 Monaten Betriebszugehörigkeit. 201 bis 400 Wahlberechtigte = 9 Mitglieder.",
      "Mindesturlaub 24 Werktage. Wesentliche Vertragsbedingungen schriftlich nach Nachweisgesetz.",
      "Probezeit in der Ausbildung ist Pflicht (1 bis 4 Monate). Im Arbeitsverhältnis optional, höchstens 6 Monate mit 2 Wochen Kündigungsfrist.",
      "Kündigungsfrist ohne Probezeit: 4 Wochen zum 15. oder Monatsende, ab 2 Jahren Betriebszugehörigkeit länger.",
      "Azubi darf nach der Probezeit nur aus wichtigem Grund oder bei Berufsaufgabe kündigen, nicht wegen mehr Geld beim Konkurrenten.",
      "Jugendarbeitsschutz: 12 Stunden Ruhezeit, keine Akkordarbeit. Ohne Nachuntersuchung spätestens 14 Monate nach Beginn darf der Jugendliche nicht weiterbeschäftigt werden.",
      "Entgeltfortzahlung bis 6 Wochen. Kündigungsschutzklage vor dem Arbeitsgericht.",
      "Streik erst nach Ablauf des Tarifvertrags (Friedenspflicht). Abweichung vom Tarifvertrag nur zugunsten der Arbeitnehmer.",
      "Beiträge zur Berufsgenossenschaft zahlt der Arbeitgeber allein. Die BG kontrolliert die Unfallverhütungsvorschriften."
    ]],
    ["Organisation, Sicherheit, Nachhaltigkeit",[
      "Stabsstelle: Leitungshilfsstelle ohne Weisungsbefugnis. Management by Objectives: Führung durch Zielvereinbarung.",
      "Bei Räumung keine Aufzüge benutzen. Sanitätsräume dienen nicht dem Brandschutz.",
      "Unmittelbarer Umweltschutz: Intranet statt Papier, effizientere Geräte. Ökostrom senkt nicht den Verbrauch.",
      "Digitalisierung: optimierte Abläufe, weniger Zeitaufwand, nahezu unbegrenzter Informationszugang für Kunden."
    ]]
  ],
  keys:[["16 J.","wahlberechtigt BR"],["18 J. + 6 Mon.","wählbar BR"],["24 Werktage","Mindesturlaub"],["6 Wochen","Entgeltfortzahlung"],["12 h","Ruhezeit Jugendliche"],["14 Mon.","Nachuntersuchung spätestens"],["30 Aufgaben","60 Minuten"]],
  src:"WiSo-Lösungen W24/25 und W25/26 · Einstieg GAP II"
}
};

/* ---------- Karteikarten ---------- */
const CARDS = [
 // Mobilität
 ["mobil","Was regelt § 5 PflVG?","Kontrahierungszwang in der Kfz-Haftpflicht. Der Versicherer muss annehmen (mindestens zu den Mindestsummen). Ablehnung nur schriftlich innerhalb von 2 Wochen, sonst gilt der Antrag als angenommen."],
 ["mobil","Wann darf der Versicherer einen KH-Antrag ablehnen?","Wenn er selbst einen Vorvertrag des Kunden nach einem Schadenfall gekündigt hat (§ 5 Abs. 4 PflVG). Ablehnung schriftlich innerhalb von 2 Wochen nach Eingang."],
 ["mobil","Wie endet die vorläufige Deckung?","Hauptvertrag kommt zustande (Erstbeitrag gezahlt) · Erstbeitrag wird nicht gezahlt · Kündigung mit 2 Wochen Frist · Widerruf des Kunden."],
 ["mobil","SFR nach einer Unterbrechung von 6 bis 12 Monaten?","Einstufung wie vor der Unterbrechung, keine Besserstufung."],
 ["mobil","SFR nach einer Unterbrechung von mehr als 12 Monaten?","Für jedes weitere angefangene Kalenderjahr seit der Unterbrechung wird ein schadenfreies Jahr abgezogen. Nach über 7 Jahren verfällt der SFR."],
 ["mobil","Voraussetzungen für die Übernahme des SFR von den Eltern?","Elternteil · Fahrzeug überwiegend vom Kind gefahren · gleiche Fahrzeuggruppe · schriftliche Erklärung beider mit vollständiger Abtretung · Führerscheinkopie. Übernommen wird höchstens so viel, wie das Kind seit Führerscheinerwerb erfahren konnte."],
 ["mobil","Sondereinstufung SF 1 über die Eltern: Bedingungen?","Ein Elternteil hat einen Pkw beim selben Versicherer in mindestens SF 1 und besitzt seit mindestens 1 Jahr den Führerschein. Beitragssatz 52 %."],
 ["mobil","Was gilt für Campingfahrzeuge beim SFR?","Keine Sondereinstufung (SF 0 = 100 %), höchstens SF 10 (45 %), keine Typ- und Regionalklassen."],
 ["mobil","Was umfasst die Ruheversicherung?","Kfz-Haftpflicht und Teilkasko, beitragsfrei, ab 2 Wochen Stilllegung. Wiederanmeldung innerhalb von 18 Monaten, sonst endet der Vertrag."],
 ["mobil","Rückkauf eines Kfz-Schadens: Frist?","Innerhalb von 6 Monaten nach Regulierung. Bis 500 € Schaden muss der Versicherer den Kunden darauf hinweisen."],
 ["mobil","Teilkasko oder Vollkasko: Kratzer durch Unbekannte?","Vollkasko (mut- oder böswillige Handlung Dritter). Mit SB und Rückstufung in der VK."],
 ["mobil","Vollkasko bei Alkohol?","Ab 1,1 Promille leistungsfrei. KH zahlt dem Geschädigten und nimmt beim Fahrer Regress bis 5.000 €. Der KH-SFR wird belastet."],
 ["mobil","Ölverlust auf dem Parkplatz: wer zahlt was?","KH zahlt die Reinigung der verunreinigten Fläche. Abschleppen nur mit Schutzbrief."],
 ["mobil","Was ist bei der Reiserücktrittsversicherung versichert?","Stornokosten, z. B. wenn die Unterkunft unbewohnbar wird oder ein unverschiebbarer Termin (soziales Jahr) früher beginnt und niemand sonst die Kosten trägt."],
 ["mobil","Was ist im Reisegepäck nicht versichert?","Bargeld, Fahrkarten, Fahrräder (dafür Hausrat mit Fahrradklausel), Sehhilfen und liegen gelassene Sachen."],
 // Freizeit
 ["freizeit","Verschuldenshaftung, vermutetes Verschulden, Gefährdungshaftung: wer beweist was?","§ 823: Geschädigter beweist Verschulden.\nVermutet (Nutztier § 833 S. 2, Aufsicht § 832): Schädiger muss Unschuld beweisen.\nGefährdung (Luxustier § 833 S. 1, Kfz, Öltank): Haftung ohne Verschulden, keine Entlastung."],
 ["freizeit","Deliktfähigkeit nach § 828 BGB?","Unter 7: nicht deliktfähig. Unter 10: keine Haftung für Unfälle mit Kfz im Straßenverkehr. 7 bis 17: bedingt deliktfähig, haftet bei Einsichtsfähigkeit."],
 ["freizeit","Bis wann sind Kinder in der PHV der Eltern mitversichert?","Unverheiratet und bis zum Ende der Erstausbildung. Danach eigene PHV."],
 ["freizeit","Ist ein Reitpferd in der PHV versichert?","Nein. Pferde brauchen eine eigene Tierhalter-Haftpflicht. Eigenschäden am Pferd sind nie gedeckt."],
 ["freizeit","Wann brauchen Bauherren eine eigene Bauherren-Haftpflicht?","Wenn die Bausumme über 200.000 € liegt (PX)."],
 ["freizeit","Wie lange gilt die PHV im Ausland?","Bei vorübergehendem Auslandsaufenthalt bis zu 2 Jahre, weltweit."],
 ["freizeit","Rechtsschutz: Falschparken und Blitzer?","Falschparken ist ausgeschlossen. Geschwindigkeitsverstöße fallen unter den Ordnungswidrigkeiten-RS."],
 ["freizeit","Wann ist der Rechtsschutzfall im Beratungs-RS Erbrecht?","Mit dem Ereignis, das die Rechtslage ändert, also dem Erbfall. Vorsorgliche Beratung ist nicht versichert."],
 ["freizeit","Rechtsschutz bei einer Reise nach Südamerika?","Außerhalb des Geltungsbereichs nur bei Reisen bis 12 Wochen und bis 100.000 €. Schadenersatz-RS ohne Wartezeit, Mietwagen über Vertrags- und Sachenrecht."],
 // Wohnen
 ["wohnen","Grenze der Außenversicherung in der Hausrat?","10 % der VS inklusive Vorsorge, höchstens 10.000 €."],
 ["wohnen","Entschädigungsgrenzen Bargeld und Schmuck?","Bargeld 1.500 €, Schmuck 20.000 €. Im Wertschutzschrank Wertsachen bis 20 % der VS inklusive Vorsorge."],
 ["wohnen","Wann ist der Brandbegriff erfüllt?","Wenn das Feuer seinen bestimmungsgemäßen Herd verlassen hat. Löschwasser- und Sprinklerschäden sind Folgeschäden und mitversichert."],
 ["wohnen","Formel Unterversicherung?","Entschädigung = Schaden × Versicherungssumme ÷ Versicherungswert."],
 ["wohnen","Klauseln 7264 und 7363 in der Wohngebäude?","7264: Grundstücksbestandteile wie Carport und Zaun. 7363: Aufräumen umgestürzter Bäume bis 2.000 €."],
 ["wohnen","Wer zahlt Parkett, Fensterscheibe, Zaun?","Die Wohngebäudeversicherung, weil es Gebäude- bzw. Grundstücksbestandteile sind."],
 ["wohnen","Versicherungsteuer Hausrat und Wohngebäude mit Feuer?","Hausrat 16,15 %, Wohngebäude mit Feuer 16,34 %. Glas und Gebäude ohne Feuer 19 %, nur Feuer 13,20 %."],
 // Gesundheit
 ["gesund","JAEG 2026?","6.450 € im Monat, 77.400 € im Jahr."],
 ["gesund","Neugeborene in der PKV: Bedingungen?","Ein Elternteil seit mindestens 3 Monaten versichert, Anmeldung innerhalb von 2 Monaten rückwirkend. Dann ohne Gesundheitsprüfung, Risikozuschläge und Wartezeit, höchstens wie der Elternteil."],
 ["gesund","Entfällt die Wartezeit bei einem Unfall?","Die allgemeine ja. Die besondere Wartezeit von 8 Monaten (z. B. Zahnersatz) nein."],
 ["gesund","Krankheitskosten im außereuropäischen Ausland?","Versichert in den ersten 2 Monaten eines vorübergehenden Aufenthalts. Länger nur, wenn die Rückreise die Gesundheit gefährden würde."],
 ["gesund","Prämienverzug in der PKV: Ablauf?","Qualifizierte Mahnung mit 2 Wochen Frist. Danach Leistungsfreiheit, bei kündbaren Tarifen außerordentliche Kündigung möglich."],
 ["gesund","Pflegegeld bei vorübergehender Hilfsbedürftigkeit von 3 Monaten?","Nein. Die Einschränkung muss voraussichtlich länger als 6 Monate dauern und Medicproof muss einen Pflegegrad feststellen."],
 ["gesund","Pflege-Bahr (GEPV)?","Staatliche Förderung 5 € im Monat, Wartezeit 5 Jahre. Ergänzend PET mit 3 Jahren Wartezeit."],
 ["gesund","Arbeitslos mit 57, seit 10 Jahren PKV: zurück in die GKV?","Nein. Über 55 und länger als 5 Jahre privat versichert: keine Versicherungspflicht, kein Wechsel. Auch nicht in die soziale Pflegeversicherung."],
 // Vorsorge
 ["vorsorge","Die 3 Schichten der Altersvorsorge?","1. Basis: GRV, Rürup. 2. Zusatz: Riester, bAV. 3. Privat: Kapital-LV, Risiko-LV, private Rente."],
 ["vorsorge","Besteuerung Rürup vs. private Rente?","Rürup: Beiträge absetzbar, Rente nachgelagert voll steuerpflichtig (Kohorte). Private Rente: Beiträge aus versteuertem Geld, nur Ertragsanteil steuerpflichtig."],
 ["vorsorge","Was darf man mit einer Basisrente nicht?","Vererben, übertragen, beleihen, veräußern, kapitalisieren. Kündigung führt nur zur Beitragsfreistellung. Rente ab 62."],
 ["vorsorge","Widerrufliches vs. unwiderrufliches Bezugsrecht?","Widerruflich: jederzeit änderbar. Unwiderruflich: nur mit Zustimmung des Bezugsberechtigten. Beides in Textform, wirksam ab Zugang."],
 ["vorsorge","Selbsttötung in der Lebensversicherung?","In den ersten 3 Jahren nur Rückkaufswert. Bei Erhöhung neue Frist für den Erhöhungsbetrag. Unfalltod-Zusatz zahlt nie."],
 ["vorsorge","Wann entstehen Bewertungsreserven?","Wenn der Marktwert der Kapitalanlagen den Buchwert übersteigt. Sie werden verursachungsorientiert zugeordnet und sind nicht garantiert."],
 // Finanz
 ["finanz","Cost-Average-Effekt?","Regelmäßig ein fester Betrag statt einer festen Stückzahl: man kauft bei niedrigen Kursen mehr Anteile und erreicht einen günstigeren Durchschnittspreis."],
 ["finanz","Was ist ein Dachfonds?","Ein Fonds, der in Anteile anderer Investmentfonds investiert."],
 ["finanz","Zinsen steigen: was passiert mit Anleihekursen?","Sie fallen, umso stärker, je länger die Restlaufzeit. Wer bis zum Ende hält, hat keinen Kursverlust."],
 ["finanz","Wofür steht ESG?","Environment (Umwelt), Social (Soziales), Governance (Unternehmensführung)."],
 ["finanz","Magisches Dreieck der Geldanlage?","Liquidität, Rentabilität, Sicherheit, die im Zielkonflikt stehen."],
 ["finanz","Risikoklassen der PROXIMUS-Fonds?","Cash Invest 1 · Bond Invest 3 · Global Invest 6 · Euro Indexx 49 Invest 6. Skala SRRI 1 bis 7."],
 ["finanz","Formel Wert des Bezugsrechts?","(alter Kurs − Emissionskurs) ÷ (Bezugsverhältnis + 1)."],
 // Einkommen
 ["einkommen","Progression U 350?","Bis 25 % einfach, 26 bis 50 % dreifach, ab 51 % fünffach. Beispiel 70 %: 25 + 75 + 100 = 200 %."],
 ["einkommen","Gliedertaxe Bein und Auge (aus den Aufgaben)?","Ganzes Bein 70 %, ein Auge 50 %. Teilbeeinträchtigung anteilig, z. B. 30 % des Beins = 21 %."],
 ["einkommen","PUV vs. gesetzliche UV?","PUV ab 1 % Invalidität, 24 h weltweit, keine Verrechnung. GUV ab 20 % MdE, nur Arbeits- und Wegeunfall und Berufskrankheit."],
 ["einkommen","Wann wird die Todesfallleistung der PUV fällig?","Wenn die Person innerhalb eines Jahres nach dem Unfall an dessen Folgen stirbt."],
 ["einkommen","Was bekommt eine Mutter, die ihr 12-jähriges Kind im Krankenhaus begleitet?","Rooming-in in Höhe des KHT des Kindes, weil es unter 14 ist."],
 ["einkommen","Ab wann zahlt die BU?","Mit Ablauf des Monats, in dem die BU eingetreten ist. Bei Meldung nach über 3 Monaten erst ab Beginn des Monats der Mitteilung."],
 ["einkommen","Leistungen Tarif S 35 bei BU?","Garantierte Rente plus 43 % Bonusrente, Beitragsbefreiung und Anfangshilfe von 3 garantierten Monatsrenten."],
 ["einkommen","Erwerbsminderungsrente: voll vs. teilweise?","Voll: unter 3 Stunden täglich arbeitsfähig. Teilweise: 3 bis unter 6 Stunden. Voraussetzung 5 Jahre Wartezeit und 36 Pflichtbeiträge in den letzten 5 Jahren."],
 // RW
 ["rw","Vier Arten der Bilanzveränderung?","Aktivtausch · Passivtausch · Aktiv-Passiv-Mehrung (Bilanzverlängerung) · Aktiv-Passiv-Minderung (Bilanzverkürzung)."],
 ["rw","Grundkosten, Anderskosten, Zusatzkosten?","Grundkosten = Aufwand in gleicher Höhe. Anderskosten = anderer Wert als in der Fibu (kalk. AfA). Zusatzkosten = kein Aufwand in der Fibu (kalk. Unternehmerlohn, Zinsen, Miete)."],
 ["rw","Betriebsergebnis vs. Unternehmensergebnis?","Betriebsergebnis = Leistungen (Provisionserträge) − Gesamtkosten. Unternehmensergebnis = alle Erträge − alle Aufwendungen laut GuV."],
 ["rw","Abschreibungsregeln für Anschaffungen?","Bis 250 € netto Sofortaufwand. GWG bis 800 € (100 % am 31.12.) oder Sammelposten 250–1.000 € (5 Jahre à 20 %). Darüber linear und monatsgenau."],
 ["rw","Combined Ratio?","(Schadenaufwand + Kosten) × 100 ÷ Beiträge."],
 ["rw","Wohin gehören Entschädigung und Regulierungsaufwand beim GA?","Auf Forderungen gegen Direktion. Für den GA sind sie kein Aufwand."],
 ["rw","ARA, PRA, sonstige Forderung, sonstige Verbindlichkeit?","ARA: Aufwand vorausbezahlt. PRA: Ertrag vorab erhalten. Sonst. Verb.: Aufwand des alten Jahres noch nicht bezahlt. Sonst. Ford.: Ertrag des alten Jahres noch nicht erhalten."],
 ["rw","Goldene Bilanzregel?","Anlagendeckung 2 = (EK + langfristiges FK) × 100 ÷ AV mindestens 100 %."],
 // WiSo
 ["wiso","Wer ist bei der Betriebsratswahl wahlberechtigt und wählbar?","Wahlberechtigt: Arbeitnehmer ab 16 (ohne leitende Angestellte). Wählbar: ab 18 und 6 Monate im Betrieb."],
 ["wiso","Rangfolge der Mängelrechte?","Zuerst Nacherfüllung. Erst danach Rücktritt, Minderung oder Schadenersatz."],
 ["wiso","Was darf ein Prokurist nicht?","Bilanz und Steuererklärungen unterschreiben, Geschäft aufgeben, Grundstücke verkaufen oder belasten (ohne besondere Befugnis), Prokura erteilen."],
 ["wiso","Wie kündigt die EZB eine Geldmengenerhöhung an?","Leitzins senken oder Wertpapiere von Banken kaufen. Mindestreserve erhöhen oder Wertpapiere verkaufen senkt die Geldmenge."],
 ["wiso","Kündigungsfrist eines Arbeitnehmers mit 18 Monaten Betriebszugehörigkeit?","4 Wochen zum 15. oder zum Monatsende (§ 622 Abs. 1 BGB)."],
 ["wiso","Wichtigste Jugendarbeitsschutz-Regeln?","12 Stunden Ruhezeit, keine Akkordarbeit, Nachuntersuchung im ersten Jahr (ohne Bescheinigung nach 14 Monaten Beschäftigungsverbot)."],
 // Proximus 5
 ["mobil", "Sondereinstufung SF ½: Voraussetzung?", "Pkw ohne übernommenen Schadenverlauf und Führerschein seit mindestens 3 Jahren. Beitragssatz 65 % KH, 60 % VK (AKB I.2.2.1, Proximus 5, S. 125)."],
 ["mobil", "Sondereinstufung SF 3 beim Zweitwagen: Bedingungen?", "Pkw des VN oder Partners mindestens in SF 3, Führerschein seit mindestens 1 Jahr, nur VN und Partner fahren, beide mindestens 23 Jahre (AKB I.2.2.3, Proximus 5, S. 125 f.)."],
 ["mobil", "Wie hoch ist der KH-Regress bei Obliegenheitsverletzungen?", "Vor dem Schaden (z. B. Alkohol) bis 5.000 €. Nach dem Schaden bis 2.500 €, bei Unfallflucht bis 5.000 € (Proximus 5, AKB D und E)."],
 ["mobil", "Wann gibt es in der Kasko die Neupreisentschädigung?", "Totalschaden oder Verlust innerhalb von 12 Monaten nach Erstzulassung beim Erstbesitzer, oder Reparatur ab 80 % des Neupreises innerhalb von 18 Monaten (Proximus 5, AKB A.2.6)."],
 ["mobil", "Rabattschutz bei Proximus?", "Ab SF 4 in KH und VK, 1 Schaden je 24 Monate ohne Rückstufung, 25 % Zuschlag (Proximus 5, AKB)."],
 ["mobil", "Schutzbrief ab 50 km Entfernung: Übernachtung oder Mietwagen?", "Übernachtung bis 3 × 50 € je Person oder Mietwagen bis 7 Tage × 50 €. Pannenhilfe und Abschleppen bis 300 € (Proximus 5, AKB A.3)."],
 ["mobil", "Bis wann muss eine Reiserücktrittsversicherung abgeschlossen werden?", "Mehr als 30 Tage vor Reiseantritt. Bei kürzerem Abstand spätestens 3 Tage nach der Buchung (Proximus 5, S. 451)."],
 ["mobil", "Wer sind Risikopersonen in der Reiserücktrittsversicherung?", "Mitreisende einer gemeinsamen Buchung (bis 6 Personen, Familienprodukt 7) und Angehörige wie Partner, Kinder, Eltern, Großeltern, Schwiegereltern (Proximus 5, S. 455)."],
 ["mobil", "Selbstbehalt in der Reiserücktrittsversicherung?", "Wenn vereinbart: 20 % des Schadens, mindestens 25 € je Person (Proximus 5, S. 456)."],
 ["mobil", "Gepäckdiebstahl aus dem Auto: wann voll versichert?", "Tagsüber von 6 bis 22 Uhr, in abgeschlossener Garage oder bei Fahrtunterbrechung bis 2 Stunden. Sonst bis 10 % der VS, höchstens 400 € (Proximus 5, S. 461)."],
 ["mobil", "Reise-Tarif: Zuschläge für Paare und Jahresverträge?", "Paare und Familien +15 % auf den Einzelpreis, Jahresvertrag +20 %. Beispiel 23 € × 1,15 × 1,20 = 31,74 € (Proximus 5, S. 463 f.)."],
 ["freizeit", "Versicherungssummen der Proximus-PHV?", "Alternative A 15 Mio. €, Alternative B 30 Mio. € pauschal, doppelte Jahresmaximierung (Proximus 5, PHV)."],
 ["freizeit", "Volljähriges Kind in der Familien-PHV: wie lange?", "Unverheiratet, in Schule oder einer innerhalb von 12 Monaten anschließenden Erstausbildung, auch Bachelor mit direkt anschließendem Master (Proximus 5, PHV)."],
 ["freizeit", "PHV-Grenzen für geliehene Sachen und Schlüssel?", "Gemietete oder geliehene bewegliche Sachen bis 15.000 € mit 100 € SB. Schlüsselverlust bis 100.000 €, nicht Tresor-, Möbel- oder Kfz-Schlüssel (Proximus 5, PHV)."],
 ["freizeit", "Deliktunfähige Kinder und Gefälligkeitsschäden in der PHV?", "Proximus zahlt auf Wunsch bis 100.000 € je Fall und 200.000 € je Jahr (Proximus 5, PHV)."],
 ["freizeit", "Welche RS-Leistungsarten haben keine Wartezeit?", "Schadenersatz-, Straf-, OWi- und Opfer-RS. Sonst 3 Monate, außer bei lückenloser Vorversicherung (Proximus 5, ARB)."],
 ["freizeit", "RS-Leistungsgrenzen bei Proximus?", "VS 1 Mio. € je Fall, Strafkaution bis 200.000 € als Darlehen, Mediation 1.500 €, reine Beratung 250 €, weltweit 100.000 € bis 12 Wochen (Proximus 5, ARB)."],
 ["freizeit", "Wann besteht beim Vorwurf einer Vorsatztat Straf-RS?", "Nur bei Vergehen, die auch fahrlässig begehbar sind: rückwirkend, wenn keine Verurteilung wegen Vorsatz. Verbrechen und reine Vorsatzdelikte (Diebstahl, Betrug) nie (Proximus 5, ARB)."],
 ["wohnen", "Grenzen für Wertsachen außerhalb des Wertschutzschranks?", "Bargeld 1.500 €, Urkunden und Sparbücher 3.000 €, Schmuck 20.000 €. Insgesamt 20 % der VS (Proximus 5, VHB)."],
 ["wohnen", "Hotelkosten in der Hausrat?", "Bis 100 Tage, je Tag höchstens 1 ‰ der VS (Proximus 5, VHB)."],
 ["wohnen", "Voraussetzungen der Fahrradklausel PK 7110?", "Bis 1 % der VS, verkehrsübliches Schloss (Rahmenschloss reicht nicht), Polizeianzeige, Rad nicht binnen 3 Wochen wieder aufgetaucht (Proximus 5, VHB)."],
 ["wohnen", "Wann gilt eine Wohnung als Gefahrerhöhung?", "Wenn sie länger als 60 Tage unbewohnt und unbeaufsichtigt ist (Proximus 5, VHB)."],
 ["wohnen", "Wie wird die Wohngebäude-Prämie berechnet?", "VS 1914 × Prämiensatz × Anpassungsfaktor. Neuwertanteil nur bei Wiederherstellung binnen 3 Jahren (Proximus 5, VGB)."],
 ["gesund", "Besondere Wartezeiten in der Krankheitskostenversicherung?", "8 Monate für Entbindung, Psychotherapie, Zahnbehandlung, Zahnersatz und KFO. Allgemein 3 Monate (Proximus 5, MB/KK § 3, S. 349)."],
 ["gesund", "KT-Tarife bei Proximus?", "KT 43 für Arbeitnehmer (bei GKV nur Lücke Netto minus Krankengeld), KT 8/15/22 für Selbstständige, max. 260 € je Tag, Aufnahme bis 60 (Proximus 5, S. 435)."],
 ["gesund", "Wann ist man arbeitsunfähig im Sinne der MB/KT?", "Wenn man den Beruf vorübergehend in keiner Weise ausüben kann, ihn nicht ausübt und keiner anderen Erwerbstätigkeit nachgeht (Proximus 5, S. 358)."],
 ["gesund", "Wie berechnet man die Erschwerungsdauer nach den Annahmerichtlinien?", "Rezidivfrist minus beschwerdefreie Jahre (bis 6 Monate ab-, ab 7 Monaten aufrunden). Beginn 1.7. bis 1.12.: +1 Jahr (Proximus 5, S. 423)."],
 ["gesund", "Regeln für Risikozuschläge und Leistungsausschlüsse?", "RiZ erst nach 4 beschwerdefreien Monaten. Kein LA in der substitutiven KV. In Zusatztarifen höchstens 4 LA, sonst Ablehnung (Proximus 5, S. 423)."],
 ["gesund", "PPV-Wartezeit?", "2 Jahre Versicherung innerhalb der letzten 10 Jahre vor dem Antrag. Kinder erfüllen sie über ein Elternteil (Proximus 5, S. 367)."],
 ["vorsorge", "Mindestbeiträge in der Lebensversicherung?", "240 € im Jahr, fondsgebunden 300 €, Einmalbeitrag 5.000 € (Proximus 5, S. 309)."],
 ["vorsorge", "Stückkosten bei Proximus Leben?", "24 € jährlich, 12 € halbjährlich, 6 € vierteljährlich, 2 € monatlich (Proximus 5, S. 309)."],
 ["vorsorge", "Vorläufiger Versicherungsschutz in der LV?", "Todesfallkapital bis 100.000 €, ab Antragseingang, längstens 2 Monate, versicherte Person 7 bis 64 Jahre (Proximus 5, S. 306)."],
 ["vorsorge", "Riester-Rente S 20: Kapital und Tod?", "Bis 30 % Teilkapital zu Rentenbeginn. Tod vor Rentenbeginn: Deckungskapital wird gezahlt (Proximus 5, S. 184)."],
 ["vorsorge", "Dynamik: wann entfallen die Erhöhungen?", "Bei Widerspruch bis Ende des ersten Monats oder Nichtzahlung binnen 2 Monaten. Nach 3 Ausfällen in Folge keine weiteren. Fristen laufen nicht neu (Proximus 5, S. 308)."],
 ["finanz", "Kosten und SRRI der Proximus-Fonds?", "Cash 1 / 0 % AA, Bond 3 / 3,00 %, Strategic 4 / 2,00 %, Balance 5 / 3,40 %, Ethic 5 / 3,80 %, Global 6 / 4,25 %, Indexx 49 6 / 0 %, Real 5,50 % AA (Proximus 5, S. 474–528)."],
 ["finanz", "Welche Proximus-Fonds schütten aus?", "Bond Invest, Balance Invest, Real Invest (ganz oder teilweise). Die anderen thesaurieren (Proximus 5, KID)."],
 ["einkommen", "Fristen für die Invaliditätsleistung?", "Invalidität innerhalb von 24 Monaten eingetreten und ärztlich festgestellt, innerhalb von 24 Monaten geltend gemacht. Dauerhaft heißt über 3 Jahre (Proximus 5, S. 328)."],
 ["einkommen", "Progression U 225, U 350, U 500?", "Bis 25 % einfach. 26–50 %: 2-, 3- bzw. 5-fach. Über 50 %: 3-, 5- bzw. 7-fach (Proximus 5, S. 329)."],
 ["einkommen", "Promillegrenzen in der Unfallversicherung?", "Unwiderlegbare Bewusstseinsstörung ab 1,1 ‰ am Steuer, 1,6 ‰ auf dem Rad, 2,0 ‰ sonst (Proximus 5, S. 333)."],
 ["einkommen", "Gefahrengruppen in der Unfallversicherung?", "A: kaufmännisch, Gesundheitswesen, Schüler, Studenten. B: körperlich oder handwerklich, +50 %. Maßgeblich ist der ausgeübte Beruf (Proximus 5, S. 340)."],
 ["einkommen", "Nachlässe in der Unfallversicherung?", "Junge Leute (Tarif 30, unter 25) 20 %, ab 3 Personen 15 %, 3 Jahre Laufzeit 10 %, jährliche Zahlung 5 % (Proximus 5, S. 341)."],
 ["einkommen", "BU-Rente bei Pflegebedürftigkeit?", "1 Pflegepunkt 40 %, 2 Punkte 70 %, ab 3 Punkten 100 % der versicherten Rente (Proximus 5, S. 261)."],
 ["einkommen", "Ausbauoption in der BU?", "Ohne Gesundheitsprüfung binnen 6 Monaten nach Heirat, Geburt, Abschluss, Gehaltsplus von 10 % u. a.: +100 %, max. 30.000 € im Jahr und 60 % des Bruttos, bis 50 (Proximus 5, S. 262)."],
 ["einkommen", "Berufsgruppen im BU-Tarif S 35?", "Kaufmännisch Normaltarif, akademisch −20 %, handwerklich +30 %, Beamte mit Dienstunfähigkeit +50 % (Proximus 5, S. 317)."]
];

/* ---------- Quiz ---------- */
const QUIZ = [
 // Mobilität
 {t:"mobil",q:"Ein Kfz-Haftpflichtantrag geht am 14.03. ein. Der Versicherer meldet sich nicht. Was gilt am 29.03.?",o:["Der Antrag ist noch offen, bis die Police kommt","Der Antrag gilt als angenommen","Der Antrag gilt als abgelehnt","Der Kunde muss den Antrag erneut stellen"],c:1,e:"Ablehnung nur schriftlich innerhalb von 2 Wochen (§ 5 Abs. 3 PflVG). Danach greift die Annahmefiktion.",s:"KBF 3, Aufgabe 1"},
 {t:"mobil",q:"Wann darf die PROXIMUS einen Kfz-Haftpflichtantrag ablehnen?",o:["Wenn ein anderer Versicherer vom Vorvertrag zurückgetreten ist","Wenn der Kunde jünger als 23 ist","Wenn die PROXIMUS selbst einen Vorvertrag nach einem Schadenfall gekündigt hat","Nie, es gilt immer Kontrahierungszwang"],c:2,e:"Ausnahme vom Kontrahierungszwang nach § 5 Abs. 4 PflVG. Der Rücktritt eines anderen Versicherers zählt nicht, dann muss mit Mindestsummen angenommen werden.",s:"KBF 3, Aufgaben 11 und 13"},
 {t:"mobil",q:"Ein Vertrag war vom 01.06.2025 bis 07.01.2026 unterbrochen (gut 7 Monate). Wie wird eingestuft?",o:["Als hätte es keine Unterbrechung gegeben","In die SF-Klasse vor der Unterbrechung, ohne Besserstufung","Ein schadenfreies Jahr wird abgezogen","Neueinstufung in SF 0"],c:1,e:"Über 6 bis 12 Monate: Einstufung wie vor der Unterbrechung (Ziffer I.6.3.1 b).",s:"IHK W25/26 · KBF 3, Aufgabe 3"},
 {t:"mobil",q:"Nach wie vielen Jahren Unterbrechung verfällt der Schadenfreiheitsrabatt?",o:["Nach mehr als 1 Jahr","Nach mehr als 3 Jahren","Nach mehr als 7 Jahren","Nie"],c:2,e:"Über 7 Jahre: SFR verfällt, Neueinstufung (Ziffer I.6.3.1 d).",s:"KBF 3, Aufgabe 8"},
 {t:"mobil",q:"Wie lange hat ein Kunde nach der Stilllegung Zeit, sein Fahrzeug wieder anzumelden, bevor der Vertrag endet?",o:["6 Monate","12 Monate","18 Monate","24 Monate"],c:2,e:"Innerhalb von 18 Monaten ab Stilllegung, sonst endet der Vertrag ohne Kündigung (Ziffer H.1.7).",s:"KBF 3, Aufgabe 8"},
 {t:"mobil",q:"Unbekannte zerkratzen das Auto auf dem Parkplatz. Welche Versicherung zahlt?",o:["Teilkasko","Vollkasko","Kfz-Haftpflicht","Schutzbrief"],c:1,e:"Mut- oder böswillige Handlungen Dritter sind Vollkasko (Ziffer A.2.3.3). SB wird abgezogen, VK wird zurückgestuft.",s:"KBF 3, Aufgabe 19"},
 {t:"mobil",q:"Eine Fahrerin weicht einem Reh aus und landet an der Leitplanke, ohne das Reh zu berühren. Wie wird ihr Auto reguliert?",o:["Teilkasko, weil Wildschaden","Vollkasko, weil es keinen Zusammenstoß gab","Gar nicht","Kfz-Haftpflicht"],c:1,e:"Teilkasko setzt einen Zusammenstoß mit dem Tier voraus. Ohne Kontakt ist es ein Vollkaskoschaden, der SFR in VK und KH wird belastet (Leitplanke über KH).",s:"IHK S25"},
 {t:"mobil",q:"Ein Fahrer verursacht mit 1,3 Promille einen Unfall. Was stimmt?",o:["Vollkasko zahlt, KH auch","Vollkasko ist leistungsfrei, KH zahlt dem Opfer und nimmt bis 5.000 € Regress","Weder KH noch VK zahlen","KH zahlt nicht, das Opfer muss klagen"],c:1,e:"Ab 1,1 Promille Leistungsfreiheit in der VK. KH schützt das Opfer, Regress beim Fahrer höchstens 5.000 €.",s:"IHK W25/26"},
 {t:"mobil",q:"Bis zu welcher Schadenhöhe muss der Versicherer auf die Möglichkeit des Rückkaufs hinweisen?",o:["250 €","500 €","1.000 €","2.500 €"],c:1,e:"Rückkauf innerhalb von 6 Monaten nach Regulierung. Bis 500 € besteht Hinweispflicht (Ziffer I.5.1).",s:"KBF 3, Aufgabe 18"},
 {t:"mobil",q:"Welche SF-Klasse ist für ein Campingfahrzeug höchstens möglich?",o:["SF 5","SF 10","SF 25","SF 35"],c:1,e:"Höchstens SF 10 mit 45 % in der KH. Keine Typ- und Regionalklassen.",s:"KBF 3, Aufgabe 17"},
 {t:"mobil",q:"Wann besteht vorläufige Deckung in der Kasko?",o:["Immer mit der eVB","Nur nach ausdrücklicher Zusage","Ab Zahlung des Erstbeitrags automatisch","Nie, Kasko gibt es nur mit Police"],c:1,e:"Die eVB deckt die KH (und den Schutzbrief ab Zulassung). Für Kasko braucht es eine ausdrückliche Zusage (Ziffer B.2.2).",s:"KBF 3, Aufgabe 10"},
 {t:"mobil",q:"Ein Auto verliert Öl auf dem Flughafenparkplatz und muss abgeschleppt werden. Was zahlt die Kfz-Haftpflicht?",o:["Abschleppen und Reinigung","Nur die Reinigung der verunreinigten Fläche","Nur das Abschleppen","Nichts"],c:1,e:"KH zahlt den Schaden an der Fläche (A.5.1.1). Für das Abschleppen ist ein Schutzbrief nötig.",s:"KBF 3, Aufgabe 4 · IHK S25"},
 {t:"mobil",q:"Ein Kunde fährt mit dem Auto nach Marokko. Was ist zu tun?",o:["Nichts, Marokko gehört zum Geltungsbereich","Deckung besonders vereinbaren und in der Internationalen Versicherungskarte vermerken","Einen Auslandsschutzbrief abschließen, sonst nichts","Eine Reiseversicherung abschließen"],c:1,e:"Voller Schutz gilt in Europa. Außereuropäische Gebiete müssen vereinbart und auf der Versicherungskarte vermerkt werden (A.1.4.2).",s:"KBF 3, Aufgabe 22"},
 {t:"mobil",q:"Welcher Zuschlag gilt für einen Reiseversicherungs-Jahresvertrag?",o:["10 %","15 %","20 %","25 %"],c:2,e:"Beispiel: Rücktritt 427 € + 20 % = 512,40 €, Gepäck 75 € + 20 % = 90 €, dann 5 % Nachlass jährliche Zahlung und 19 % VSt.",s:"KBF 3, Aufgabe 2"},
 {t:"mobil",q:"Ein Koffer kommt verspätet an. Wie viel zahlt die Reisegepäckversicherung bei 1.500 € VS?",o:["Nichts","150 €","750 €","1.500 €"],c:1,e:"Nicht fristgerecht zugestelltes Gepäck ist mit 10 % der VS versichert.",s:"IHK S25"},
 {t:"mobil",q:"Ein Mountainbike wird auf der Reise vom Träger gestohlen. Wo ist es versichert?",o:["Reisegepäckversicherung","Kfz-Teilkasko","Hausratversicherung mit Fahrraddiebstahl-Klausel","Kfz-Haftpflicht"],c:2,e:"Der Fahrradträger ist als Fahrzeugteil mitversichert, das Rad nicht. Reisegepäck schließt Fahrräder aus.",s:"KBF 3, Aufgabe 22 · IHK W24/25"},
 {t:"mobil",q:"Bei welcher Rechnung bekommt der Kunde nach einem TK-Wildschaden die Mehrwertsteuer erstattet?",o:["Beim Kostenvoranschlag","Bei konkreter Reparatur mit Rechnung","Nie","Immer"],c:1,e:"Nach Kostenvoranschlag wird netto gezahlt, bei konkreter Reparatur brutto. Kein SFR-Einfluss, SB 150 €.",s:"IHK S24"},
 // Freizeit
 {t:"freizeit",q:"Ein 9-Jähriger rennt auf die Straße, ein Auto weicht aus und rammt einen Stromkasten. Haftet das Kind?",o:["Ja, ab 7 ist man deliktfähig","Nein, unter 10 keine Haftung für Unfälle mit Kfz im Straßenverkehr","Ja, aber nur bis 5.000 €","Nur, wenn die Eltern zustimmen"],c:1,e:"§ 828 Abs. 2 BGB. Ohne Aufsichtspflichtverletzung haftet auch der Vater nicht, die PHV wehrt die Ansprüche ab.",s:"IHK W25/26"},
 {t:"freizeit",q:"Welche Haftung trifft den Halter eines Hundes (Luxustier)?",o:["Verschuldenshaftung nach § 823","Haftung aus vermutetem Verschulden","Gefährdungshaftung nach § 833 S. 1","Keine Haftung"],c:2,e:"Haftung auch ohne Verschulden, keine Entlastung möglich. Nutztiere: vermutetes Verschulden (§ 833 S. 2).",s:"Einstieg GAP II"},
 {t:"freizeit",q:"Die Ehefrau beschädigt mit dem Krankenfahrstuhl ihr eigenes Handy und die Hose eines Fremden. Was zahlt die PHV?",o:["Beides","Nur die Hose","Nur das Handy","Nichts"],c:1,e:"Krankenfahrstühle sind mitversichert. Das eigene Handy ist ein Eigenschaden. Die neue Hose wird zum Neuwert ersetzt.",s:"IHK W25/26"},
 {t:"freizeit",q:"Ein 22-Jähriger hat seine Erstausbildung abgeschlossen. Wie ist er haftpflichtversichert?",o:["Weiter über die Eltern, bis 25","Weiter über die Eltern, solange er zu Hause wohnt","Gar nicht mehr, er braucht eine eigene PHV","Über die Arbeitgeber-Haftpflicht"],c:2,e:"Mitversicherung nur unverheiratet und bis zum Ende der Erstausbildung. Angebot Single-PHV.",s:"IHK W25/26"},
 {t:"freizeit",q:"Gemietete Ski gehen beim Sturz kaputt. Wie reguliert die PHV?",o:["Gar nicht, Mietsachen sind ausgeschlossen","Voll ohne Abzug","Mit 100 € Selbstbeteiligung","Nur zum Zeitwert ohne SB"],c:2,e:"Schäden an gemieteten Sachen sind eingeschlossen, mit 100 € SB.",s:"IHK S24"},
 {t:"freizeit",q:"Eine Familie baut ein Haus für 350.000 €. Was braucht sie zusätzlich zur PHV?",o:["Nichts","Eine Bauherren-Haftpflichtversicherung","Eine Gewässerschaden-Haftpflicht","Eine Rechtsschutzversicherung"],c:1,e:"Ab einer Bausumme über 200.000 € ist eine eigene Bauherren-Haftpflicht nötig (PX).",s:"IHK S25"},
 {t:"freizeit",q:"Eine Kundin bekommt Strafzettel fürs Falschparken. Was zahlt der Verkehrs-Rechtsschutz?",o:["Alles","Nur den Anwalt","Nichts, Falschparken ist ausgeschlossen","Nur bei Ersttätern"],c:2,e:"Halt- und Parkverstöße sind ausgeschlossen (Ziffer 3.2.16). Tempoverstöße zahlt der Ordnungswidrigkeiten-RS.",s:"KBF 3, Aufgabe 24"},
 {t:"freizeit",q:"Ein Kunde will sich vorsorglich zum Erbrecht beraten lassen, der Erbfall ist nicht eingetreten. Rechtsschutz?",o:["Ja, über Beratungs-RS","Nein, Rechtsschutzfall ist erst das Ereignis, das die Rechtslage ändert","Ja, aber mit 250 € SB","Nur im Familientarif"],c:1,e:"Im Erbrecht ist das der Tod des Erblassers. Vorsorgliche Beratung ist nicht gedeckt.",s:"IHK S25"},
 {t:"freizeit",q:"Ein Ehepaar mietet in Chile ein Auto. Was gilt im Verkehrs-Rechtsschutz?",o:["Voller Schutz weltweit","Kein Schutz","Schutz nur bei Reisen bis 12 Wochen und bis 100.000 €","Schutz nur bis 10.000 €"],c:2,e:"Südamerika liegt außerhalb des Geltungsbereichs (Ziffer 5.2). Schadenersatz-RS hat keine Wartezeit.",s:"KBF 3, Aufgabe 25"},
 {t:"freizeit",q:"Herr Kaiser wird in Ungarn wegen eines Verkehrsdelikts festgehalten. Was übernimmt der Rechtsschutz?",o:["Nichts im Ausland","Strafkaution, Anwalt am Gericht in Ungarn und Korrespondenzanwalt am Wohnort","Nur einen deutschen Anwalt","Nur die Strafe"],c:1,e:"Straf-RS für verkehrsrechtliche Vergehen, im europäischen Ausland bis 1 Mio. €.",s:"IHK W25/26"},
 // Wohnen
 {t:"wohnen",q:"Nach einem Küchenbrand ist der Parkettboden der eigenen Wohnung beschädigt. Wer zahlt ihn?",o:["Hausratversicherung","Wohngebäudeversicherung","Glasversicherung","Privathaftpflicht"],c:1,e:"Parkett ist Gebäudebestandteil. Couch und Tisch zahlt die Hausrat, Sprinklerschäden sind Brand-Folgeschäden.",s:"IHK W25/26"},
 {t:"wohnen",q:"Wie hoch ist die Außenversicherung in der Hausrat begrenzt?",o:["5 % der VS, max. 5.000 €","10 % der VS inkl. Vorsorge, max. 10.000 €","20 % der VS, max. 20.000 €","Unbegrenzt"],c:1,e:"Ein Student ohne eigenen Hausstand ist darüber unabhängig von der Dauer versichert.",s:"IHK S25"},
 {t:"wohnen",q:"Bei einem Einbruch ins Wohnhaus wird Bargeld gestohlen. Bis zu welcher Grenze wird es ersetzt?",o:["500 €","1.000 €","1.500 €","5.000 €"],c:2,e:"Besondere Entschädigungsgrenze Bargeld 1.500 €, Schmuck 20.000 €. Bargeld aus den Geschäftsräumen ist nicht versichert.",s:"IHK W24/25"},
 {t:"wohnen",q:"Ein Sturm zerstört die Terrassenmöbel. Wann zahlt die Hausrat?",o:["Immer","Nie","Nur mit Klausel PK 7215","Nur mit Glasversicherung"],c:2,e:"Möbel draußen sind keine versicherte Sache. Die Klausel PK 7215 schließt Naturgefahren außerhalb von Gebäuden ein, abzüglich SB.",s:"IHK S24"},
 {t:"wohnen",q:"Ein Brandschaden beträgt 27.300 €. VS 17.500 Mark 1914, Versicherungswert 19.900 Mark 1914. Entschädigung für die Sachen?",o:["27.300,00 €","24.007,54 €","21.000,00 €","17.500,00 €"],c:1,e:"Unterversicherung: 27.300 × 17.500 ÷ 19.900 = 24.007,54 €.",s:"IHK S25"},
 {t:"wohnen",q:"Eine Überschwemmung entwurzelt Bäume, die auf den Carport fallen. Was zahlt die Wohngebäude?",o:["Bäume und Carport komplett","Carport (Klausel 7264) und das Wegräumen der Bäume vom Carport, nicht die Bäume selbst","Nur die Bäume","Nichts"],c:1,e:"Bäume sind trotz Klausel 7363 nicht versichert, weil die Überschwemmung sie entwurzelt hat. SB 500 € wird abgezogen.",s:"IHK W25/26"},
 {t:"wohnen",q:"Eine Fensterscheibe zerbricht ohne versicherte Gefahr. Welche Versicherung leistet?",o:["Hausrat","Glasversicherung als Allgefahrenversicherung","Wohngebäude","Keine"],c:1,e:"Die Glasversicherung leistet, wenn keine andere Versicherung leistet, inklusive Notverglasung und Aufräumkosten.",s:"IHK W25/26"},
 {t:"wohnen",q:"Welche Versicherungsteuer gilt für die Hausratversicherung?",o:["13,20 %","16,15 %","16,34 %","19,00 %"],c:1,e:"Wohngebäude mit Feuer 16,34 %, nur Feuer 13,20 %, Glas 19 %.",s:"Deckblatt IHK-Prüfung"},
 // Gesundheit
 {t:"gesund",q:"Unter welcher Bedingung wird ein Neugeborenes ohne Wartezeit in der PKV versichert?",o:["Ein Elternteil ist seit 3 Monaten versichert, Anmeldung innerhalb von 2 Monaten","Anmeldung innerhalb von 6 Monaten","Beide Eltern sind privat versichert","Das Kind ist gesund"],c:0,e:"Rückwirkend ab Geburt, ohne Risikozuschläge, Schutz nicht höher als beim Elternteil.",s:"IHK S25"},
 {t:"gesund",q:"Ein Kunde ist seit April versichert und bricht sich bei einem Unfall im Mai einen Zahn. Was wird erstattet?",o:["Alles, weil Unfall","Krankenhaus ja, Zahnersatz erst nach Ablauf der 8-monatigen besonderen Wartezeit","Nichts, Wartezeit läuft","Nur der Zahnersatz"],c:1,e:"Die allgemeine Wartezeit entfällt bei Unfällen, die besondere nicht.",s:"IHK S25 · IHK S24"},
 {t:"gesund",q:"Ein Kunde ist von Juli bis Oktober beruflich in Mexiko. Für welche Behandlungen leistet die Krankheitskostenversicherung?",o:["Für alle","Nur in Juli und August","Nur im Oktober","Für keine"],c:1,e:"Außereuropäisch: die ersten 2 Monate eines vorübergehenden Aufenthalts. Keine Verlängerung, da die Rückreise möglich war.",s:"IHK W25/26"},
 {t:"gesund",q:"Ein Arzt wird ab 01.07. wegen Übertherapie ausgeschlossen. Ab wann gilt das für schwebende Behandlungen?",o:["Sofort ab 01.07.","Ab 01.10., also 3 Monate nach Benachrichtigung","Ab 01.01. des Folgejahres","Gar nicht"],c:1,e:"Beispiel: 20 Termine, 6 nach dem 01.10. Erstattet 14 × 79,15 € = 1.108,10 €, davon 50 % = 554,05 €.",s:"IHK W25/26"},
 {t:"gesund",q:"Ein Kunde ist 57, seit 10 Jahren in der PKV und wird arbeitslos. Was gilt?",o:["Er wird GKV-pflichtig","Er wird nicht versicherungspflichtig und kann nicht in die GKV wechseln","Er kann frei wählen","Seine PKV ruht"],c:1,e:"Über 55 und länger als 5 Jahre privat versichert. Beiträge senken über Tarifwechsel, KT anpassen.",s:"IHK W25/26"},
 {t:"gesund",q:"Wie hoch ist die JAEG 2026 im Jahr?",o:["69.750 €","73.800 €","77.400 €","101.400 €"],c:2,e:"6.450 € im Monat. 69.750 € ist die BBG KV, 101.400 € die BBG RV.",s:"RW-Skript 2026"},
 {t:"gesund",q:"Eine Kundin ist nach einem Überfall 3 Monate arbeitsunfähig und braucht Hilfe im Haushalt. Bekommt sie Pflegegeld?",o:["Ja, Pflegegrad 1","Ja, wegen geistiger Einschränkung","Nein, die Einschränkung muss länger als 6 Monate bestehen und ein Pflegegrad festgestellt sein","Nur aus dem KT"],c:2,e:"Die PPV leistet grundsätzlich auch bei geistigen Einschränkungen, aber erst ab über 6 Monaten und nach Medicproof-Gutachten.",s:"IHK W25/26"},
 {t:"gesund",q:"Wie viel zahlt die Pflegeversicherung für eine Maßnahme zur Wohnumfeldverbesserung?",o:["1.000 €","2.500 €","4.000 €","unbegrenzt"],c:2,e:"Bis 4.000 € je Maßnahme. Entscheidung innerhalb von 3 Wochen, Hilfsmittel vorrangig leihweise.",s:"IHK S25"},
 {t:"gesund",q:"Eine Kundin hat nach qualifizierter Mahnung am 04.04. nicht gezahlt und liegt am 20.04. im Krankenhaus. Was gilt?",o:["Volle Leistung","Leistungsfreiheit, weil die 2-Wochen-Frist abgelaufen ist","Leistung zu 50 %","Leistung erst nach Zahlung"],c:1,e:"Zahlungsfrist 2 Wochen bis 18.04. Ab 19.04. Leistungsfreiheit, bei kündbaren Tarifen außerordentliche Kündigung.",s:"IHK S24"},
 {t:"gesund",q:"Welche Förderung gibt es für die Pflege-Bahr-Versicherung (GEPV)?",o:["5 € im Monat","10 € im Monat","60 € im Jahr pro Pflegegrad","keine"],c:0,e:"Wartezeit 5 Jahre. Ergänzend Tarif PET mit 3 Jahren Wartezeit.",s:"IHK S24"},
 {t:"gesund",q:"Wie hoch ist der Beihilfeanspruch einer Beamtin mit 2 Kindern?",o:["50 %","70 %","80 %","100 %"],c:1,e:"Mit 2 Kindern steigt die Beihilfe auf 70 %, der private Schutz wird auf 30 % reduziert. Kinder: 80 % Beihilfe.",s:"IHK S25"},
 // Vorsorge
 {t:"vorsorge",q:"Wie wird die Rente aus einer privaten Rentenversicherung (3. Schicht) besteuert?",o:["Voll","Nachgelagert nach Kohorte","Mit dem Ertragsanteil","Gar nicht"],c:2,e:"Beiträge aus versteuertem Einkommen. Rürup und Riester werden nachgelagert besteuert.",s:"IHK W25/26"},
 {t:"vorsorge",q:"Welche Aussage zur Basisrente (Rürup) stimmt?",o:["Sie ist beleihbar","Sie kann kapitalisiert werden","Sie ist nicht vererbbar und nicht übertragbar","Rentenbeginn ab 60 möglich"],c:2,e:"Außerdem nicht beleihbar, nicht veräußerbar, nicht kapitalisierbar. Mindestrentenalter 62.",s:"IHK W24/25"},
 {t:"vorsorge",q:"In welche Schicht gehört die Riester-Rente?",o:["1. Schicht","2. Schicht","3. Schicht","Keine"],c:1,e:"2. Schicht mit der bAV. 1. Schicht: GRV und Rürup.",s:"Einstieg GAP II"},
 {t:"vorsorge",q:"Ein Kunde will sein unwiderrufliches Bezugsrecht auf den Bruder ändern. Was ist nötig?",o:["Nur seine Erklärung","Die schriftliche Zustimmung der bisherigen Bezugsberechtigten","Ein Notar","Das geht nicht"],c:1,e:"Unwiderruflich heißt: nur mit Zustimmung. Der Änderungswunsch des VN muss in Schriftform vorliegen.",s:"IHK S25"},
 {t:"vorsorge",q:"Der Versicherte nimmt sich im zweiten Versicherungsjahr das Leben. Was wird gezahlt?",o:["Die volle Summe","Der Rückkaufswert","Die Unfalltod-Zusatzleistung","Nichts"],c:1,e:"Selbsttötung innerhalb der ersten 3 Jahre: Rückkaufswert. Die Unfalltod-Zusatzversicherung schließt Selbsttötung aus.",s:"IHK S25"},
 {t:"vorsorge",q:"Zu welchem Zeitpunkt wird das Deckungskapital einer fondsgebundenen Versicherung im Todesfall bewertet?",o:["Am Todestag","Am 2. Börsentag nach Eingang der Todesfallmeldung","Zum Monatsende","Zum Ende des Versicherungsjahres"],c:1,e:"Beispiel: 98,3 Anteile × 220,66 € = 21.690,88 €.",s:"IHK W25/26"},
 {t:"vorsorge",q:"Wann entstehen Bewertungsreserven?",o:["Wenn der Buchwert den Marktwert übersteigt","Wenn der Marktwert der Kapitalanlagen den Buchwert übersteigt","Bei jeder Beitragszahlung","Wenn der Kunde kündigt"],c:1,e:"Sie werden jährlich ermittelt, verursachungsorientiert zugeordnet und sind nicht garantiert.",s:"IHK S25"},
 {t:"vorsorge",q:"Tarifbeitrag 1.176 € ergibt 210,08 € garantierte Rente. Wie hoch ist die garantierte Rente bei 4.976 € Beitrag?",o:["888,91 €","1.050,40 €","1.821,53 €","421,00 €"],c:0,e:"Dreisatz: 210,08 × 4.976 ÷ 1.176 = 888,91 €.",s:"IHK W25/26"},
 {t:"vorsorge",q:"Eine Risiko-LV ist mit Beitragsverrechnung versichert. Gibt es im Todesfall zusätzliche Überschüsse?",o:["Ja, die Ansammlung","Nein, die Überschüsse wurden mit den Beiträgen verrechnet","Ja, die Bewertungsreserven","Nur bei Unfalltod"],c:1,e:"Beitragsverrechnung senkt laufend den Beitrag. Im Todesfall wird nur die Versicherungssumme gezahlt.",s:"KBF 6, Aufgabe 6"},
 // Finanz
 {t:"finanz",q:"Was beschreibt den Cost-Average-Effekt richtig?",o:["Einmalanlage ist immer günstiger als Sparplan","Ein fester Betrag in regelmäßigen Abständen führt zu einem günstigeren Durchschnittspreis als eine feste Stückzahl","Fondskosten sinken mit der Laufzeit","Der Ausgabeaufschlag entfällt beim Sparplan"],c:1,e:"Bei niedrigen Kursen kauft man mit demselben Betrag mehr Anteile.",s:"IHK W24/25"},
 {t:"finanz",q:"In welche Risikoklasse ist der PROXIMUS Global Invest eingestuft?",o:["1","3","5","6"],c:3,e:"Weltweiter Aktienfonds, starke Schwankungen. Bond Invest ist Klasse 3, Cash Invest Klasse 1.",s:"IHK W24/25 · W25/26"},
 {t:"finanz",q:"Die Marktzinsen steigen. Was passiert mit den Kursen bestehender Anleihen?",o:["Sie steigen","Sie fallen","Sie bleiben gleich","Sie steigen nur bei langer Restlaufzeit"],c:1,e:"Der Effekt ist umso stärker, je länger die Restlaufzeit. Wer bis zum Ende hält, verliert nichts.",s:"IHK S25"},
 {t:"finanz",q:"Fondsvermögen 47,8 Mio. €, 954.091,80 Anteile, Ausgabeaufschlag 3,80 %. Wie viele Anteile bekommt man für 40.000 €?",o:["798,40","769,23","800,00","735,00"],c:1,e:"Anteilspreis 47.800.000 ÷ 954.091,80 = 50,10 €. Ausgabepreis 50,10 + 1,90 = 52,00 €. 40.000 ÷ 52 = 769,23 Anteile.",s:"IHK S24"},
 {t:"finanz",q:"Kurs 73,10 €, Emissionskurs 59 €, Bezugsverhältnis 4:1. Wert des Bezugsrechts?",o:["2,82 €","3,53 €","14,10 €","70,28 €"],c:0,e:"(73,10 − 59,00) ÷ (4 + 1) = 2,82 €. Rechnerischer Kurs danach 70,28 €.",s:"IHK W24/25"},
 {t:"finanz",q:"Welche Mindesthaltefrist gilt für den offenen Immobilienfonds Real Invest?",o:["Keine","12 Monate","24 Monate","5 Jahre"],c:2,e:"Mindesthaltefrist 24 Monate, Rückgabefrist 12 Monate.",s:"Übersicht der Proximus Fonds"},
 {t:"finanz",q:"Welche Anlage hat das geringste Ausfallrisiko?",o:["Aktie mit Rating A+","Mischfonds mit AA","Bundesanleihe mit AAA","Alle gleich"],c:2,e:"AAA ist die höchste Bonität, dafür die geringste Rendite. Alle drei sind börsentäglich verkäuflich.",s:"IHK W25/26"},
 {t:"finanz",q:"Was macht ein Dachfonds?",o:["Er investiert in Immobilien","Er investiert in Anteile anderer Investmentfonds","Er bildet einen Index ab","Er legt nur in Geldmarkttitel an"],c:1,e:"Beispiel: Strategic Invest mit Aktien- und Rentenfonds.",s:"IHK W24/25"},
 {t:"finanz",q:"Wofür steht das G in ESG?",o:["Growth","Governance","Green","Guarantee"],c:1,e:"Environment, Social, Governance. Ethic Invest beachtet zusätzlich den UN Global Compact.",s:"IHK S24"},
 // Einkommen
 {t:"einkommen",q:"Invaliditätsgrad 70 %, Progression U 350, Grundsumme 40.000 €. Leistung?",o:["28.000 €","56.000 €","80.000 €","140.000 €"],c:2,e:"25 % × 1 + 25 % × 3 + 20 % × 5 = 200 %. 200 % × 40.000 € = 80.000 €.",s:"KBF 6, Aufgabe 4 · IHK W25/26"},
 {t:"einkommen",q:"Invaliditätsgrad 35 %, Progression U 500, Grundsumme 50.000 €. Leistung?",o:["17.500 €","37.500 €","50.000 €","87.500 €"],c:1,e:"25 % × 1 + 10 % × 5 = 75 %. 75 % × 50.000 € = 37.500 €.",s:"KBF 6, Aufgabe 7"},
 {t:"einkommen",q:"Das rechte Bein bleibt zu 40 % beeinträchtigt. Welcher Invaliditätsgrad ergibt sich?",o:["40 %","28 %","70 %","21 %"],c:1,e:"Gliedertaxe Bein 70 %, davon 40 % = 28 %.",s:"KBF 6, Aufgabe 1"},
 {t:"einkommen",q:"Ab wie viel Prozent Mitwirkung einer Krankheit werden die PUV-Leistungen gekürzt?",o:["10 %","25 %","50 %","Nie"],c:1,e:"Beispiel: 42 % Invalidität − 25 % Mitwirkung = 31,5 %. KT und KHT werden ebenfalls um 25 % gekürzt.",s:"IHK W24/25"},
 {t:"einkommen",q:"Eine Mutter begleitet ihre 12-jährige Tochter 7 Tage im Krankenhaus. KHT des Kindes 25 €. Was bekommt sie?",o:["Nichts","175 € Rooming-in","350 €","25 €"],c:1,e:"Kinder unter 14: Begleitperson erhält Unterbringungskosten in Höhe des KHT, 7 × 25 €.",s:"KBF 6, Aufgabe 7"},
 {t:"einkommen",q:"Wann wird die Todesfallleistung der PUV fällig?",o:["Bei Tod innerhalb von 3 Monaten","Bei Tod infolge des Unfalls innerhalb eines Jahres","Bei jedem Tod während der Laufzeit","Nur bei Unfalltod im Straßenverkehr"],c:1,e:"Zusätzlich zahlt die PUV das KHT für die Tage im Krankenhaus an die Hinterbliebenen.",s:"KBF 6, Aufgabe 4"},
 {t:"einkommen",q:"BU ist im Februar eingetreten, gemeldet wird sie im November. Ab wann zahlt die BU?",o:["Ab März","Ab Februar","Ab 01.11., Beginn des Monats der Mitteilung","Ab Dezember"],c:2,e:"Meldung später als 3 Monate nach Eintritt: Anspruch erst ab Beginn des Monats der Mitteilung. Beitragsbefreiung ebenfalls ab dann.",s:"KBF 6, Aufgabe 5 · IHK W25/26"},
 {t:"einkommen",q:"Garantierte BU-Rente 912,31 €, Tarif S 35. Wie hoch ist die Monatsrente inklusive Bonus?",o:["912,31 €","1.140,39 €","1.304,60 €","2.736,93 €"],c:2,e:"912,31 € × 1,43 = 1.304,60 €. Dazu einmalig Anfangshilfe 3 × 912,31 € = 2.736,93 €.",s:"KBF 6, Aufgabe 5"},
 {t:"einkommen",q:"Ab welchem Grad leistet die gesetzliche Unfallversicherung?",o:["1 %","10 %","20 %","50 %"],c:2,e:"GUV ab 20 % MdE, nur Arbeits- und Wegeunfall und Berufskrankheit. PUV ab 1 %.",s:"Einstieg GAP II"},
 {t:"einkommen",q:"Wann ist jemand voll erwerbsgemindert?",o:["Unter 3 Stunden täglich arbeitsfähig","Unter 6 Stunden","Wenn er seinen Beruf nicht mehr ausüben kann","Ab 50 % BU"],c:0,e:"Teilweise: 3 bis unter 6 Stunden. Maßstab ist jede Tätigkeit am allgemeinen Arbeitsmarkt.",s:"Lernzusammenfassung PUV & BU"},
 {t:"einkommen",q:"Risiko-LV 300.000 € plus Unfalltod-Zusatz 75.000 €, Abtretung an die Bank, Restschuld 42.522 €. Was erhält die Ehefrau?",o:["375.000 €","332.478 €","257.478 €","300.000 €"],c:1,e:"375.000 − 42.522 = 332.478 €. Der Vertrag endet mit dem Tod.",s:"KBF 6, Aufgabe 2"},
 {t:"einkommen",q:"Ein Kunde der PUV wird 67. Was ändert sich im Tarif?",o:["Nichts","Wechsel in Tarif 50: Invalidität ohne Progression, KT entfällt, KHT auf 25 €","Der Vertrag endet automatisch","Nur der Beitrag steigt"],c:1,e:"Wahlrecht: Prämie beibehalten mit neuen Summen oder Summen beibehalten mit neuer Prämie. Kündigung innerhalb 1 Monats möglich.",s:"IHK W25/26"},
 // RW
 {t:"rw",q:"Die Agentur gewährt einer Mitarbeiterin ein Darlehen von 500 € per Bank. Auswirkung?",o:["Aufwand 500 €, Gewinn sinkt","Aktivtausch, keine Auswirkung auf die GuV","Aktiv-Passiv-Minderung","Passivtausch"],c:1,e:"Forderungen gegen AN steigen, Bank sinkt. Die Bilanzsumme bleibt gleich.",s:"IHK W25/26"},
 {t:"rw",q:"Eine Rückstellung von 4.140 € wird im neuen Jahr genau in dieser Höhe bezahlt. Was passiert?",o:["Außerordentlicher Ertrag","Außerordentlicher Aufwand","Keine GuV-Wirkung, Aktiv-Passiv-Minderung","Aktivtausch"],c:2,e:"Rückstellung und Bank sinken um 4.140 €. Wäre die Zahlung niedriger, entstünde ein ao. Ertrag.",s:"IHK S25"},
 {t:"rw",q:"Pkw: AK 20.000 €, 5 Jahre linear, nach 3 Jahren für 9.000 € verkauft. Folge?",o:["1.000 € außerordentlicher Ertrag","1.000 € außerordentlicher Aufwand","Kein Erfolg","9.000 € Ertrag"],c:0,e:"Restbuchwert 20.000 − 3 × 4.000 = 8.000 €. Verkauf darüber = ao. Ertrag.",s:"RW-Skript 2026"},
 {t:"rw",q:"Wie wird der kalkulatorische Unternehmerlohn erfasst?",o:["Als Grundkosten","Als Anderskosten","Als Zusatzkosten","Als neutraler Aufwand"],c:2,e:"Er mindert das Betriebsergebnis, aber nicht den steuerlichen Gewinn, weil er in der Fibu kein Aufwand ist.",s:"IHK W24/25"},
 {t:"rw",q:"Zu welcher Kostenart gehört die kalkulatorische Abschreibung?",o:["Grundkosten","Anderskosten","Zusatzkosten","Neutraler Aufwand"],c:1,e:"Gleicher Sachverhalt wie in der Fibu, aber anderer Wert.",s:"RW-Skript 2026"},
 {t:"rw",q:"Aufwendungen für Versicherungsfälle 492, Beitragseinnahmen 618,5 (Mio. €). Schadenquote?",o:["5,29 %","62,90 %","79,55 %","125,71 %"],c:2,e:"492 × 100 ÷ 618,5 = 79,55 %. Verwaltungskostenquote mit 32,7: 5,29 %.",s:"IHK W25/26"},
 {t:"rw",q:"Beitragsbestand steigt von 242.423 € auf 273.212 €. Zuwachsrate?",o:["11,27 %","12,70 %","30,79 %","88,73 %"],c:1,e:"(273.212 − 242.423) × 100 ÷ 242.423 = 12,70 %.",s:"IHK W24/25"},
 {t:"rw",q:"Stromtarif 1: 0,325 €/kWh + 144 € Grundgebühr. Tarif 2: 0,305 €/kWh + 240 €. Ab welchem Verbrauch sind beide gleich teuer?",o:["4.000 kWh","4.800 kWh","5.000 kWh","7.200 kWh"],c:1,e:"0,325x + 144 = 0,305x + 240 → 0,02x = 96 → x = 4.800 kWh.",s:"IHK W25/26"},
 {t:"rw",q:"Laut Inventur sind 50 € mehr in der Kasse als gebucht. Was ist zu buchen?",o:["Kassendifferenz-Aufwand","Kassendifferenz-Ertrag","Privateinlage","Nichts"],c:1,e:"Vermutlich fehlt ein Einnahmebeleg. Erfolgswirksame Korrektur über den Ertrag.",s:"RW-Skript 2026"},
 {t:"rw",q:"Der GA zahlt im Auftrag des VU eine Entschädigung an einen Kunden. Wie wirkt das?",o:["Aufwand beim GA","Forderungen gegen Direktion steigen, kein Aufwand","Verbindlichkeit beim GA","Provisionsaufwand"],c:1,e:"Entschädigung und Regulierungsaufwand schließen über Forderungen gegen Direktion ab.",s:"RW-Skript 2026"},
 {t:"rw",q:"Im Dezember wird die Miete für Dezember, Januar und Februar überwiesen. Was bucht der Mieter am 31.12.?",o:["Sonstige Verbindlichkeit","Aktive Rechnungsabgrenzung für 2 Monate","Passive Rechnungsabgrenzung","Rückstellung"],c:1,e:"Aufwand im alten Jahr bezahlt, gehört ins neue: ARA. Beim Vermieter wäre es eine PRA.",s:"RW-Skript 2026"},
 {t:"rw",q:"Wie hoch ist der KV-Anteil des Arbeitnehmers bei 2,5 % Zusatzbeitrag?",o:["7,3 %","8,55 %","14,6 %","17,1 %"],c:1,e:"(14,6 % + 2,5 %) ÷ 2 = 8,55 %.",s:"RW-Skript 2026"},
 {t:"rw",q:"Was besagt die Liquidität 1. Grades?",o:["Anteil des EK am Gesamtkapital","Anteil der flüssigen Mittel am kurzfristigen Fremdkapital","Deckung des AV durch EK","Verhältnis von Gewinn zu EK"],c:1,e:"Über 100 %: kurzfristige Verbindlichkeiten sind durch flüssige Mittel gedeckt.",s:"IHK S24"},
 {t:"rw",q:"Wohin gehören die Zinsen für eine Hypothek auf das Agenturgebäude?",o:["Zinsaufwand","Haus- und Grundstücksaufwand","Mietaufwand","Verwaltungsaufwand"],c:1,e:"Zusammen mit Grundsteuer, Gebäudeversicherung und Abschreibung auf das Gebäude.",s:"RW-Skript 2026"},
 // WiSo
 {t:"wiso",q:"Frau Krause bestellt durch einen Schreibfehler 200.000 statt 20.000 Blatt. Was gilt?",o:["Vertrag nichtig","Vertrag unwirksam","Vertrag wirksam, Anfechtung möglich","Vertrag wirksam, keine Anfechtung"],c:2,e:"Erklärungsirrtum: wirksam, aber anfechtbar.",s:"WiSo W25/26"},
 {t:"wiso",q:"Die PROXIMUS mietet eine Lagerhalle. Wer ist Besitzer, wer Eigentümer?",o:["PROXIMUS ist beides","PROXIMUS Besitzer (tatsächliche Gewalt), Vermieter Eigentümer (rechtliche Gewalt)","Vermieter ist beides","PROXIMUS Eigentümer nach Grundbucheintrag"],c:1,e:"Besitz = tatsächliche, Eigentum = rechtliche Verfügungsgewalt.",s:"WiSo W24/25 · W25/26"},
 {t:"wiso",q:"Ein gekaufter Herd ist defekt, der Mangel wurde sofort gerügt. Welches Recht hat der Käufer zunächst?",o:["Minderung","Rücktritt","Nacherfüllung","Schadenersatz"],c:2,e:"Nacherfüllung hat Vorrang.",s:"WiSo W25/26"},
 {t:"wiso",q:"Welche Tätigkeit darf in einer Agentur nur der Prokurist vornehmen (nicht der Handlungsbevollmächtigte)?",o:["Geschäftsaufgabe","Standardbriefe unterschreiben","Bilanz unterschreiben","Ein Grundstück erwerben"],c:3,e:"Grundstückserwerb ist mit Prokura möglich. Bilanz und Geschäftsaufgabe bleiben dem Inhaber vorbehalten.",s:"WiSo W25/26"},
 {t:"wiso",q:"Bei 140 € werden 800 Stück nachgefragt und 800 angeboten. Bei 80 € stehen 1.200 Nachfrage nur 300 Angebot gegenüber. Was liegt bei 80 € vor?",o:["Marktgleichgewicht","Angebotsüberhang","Nachfrageüberhang","Käufermarkt"],c:2,e:"Gleichgewichtspreis ist 140 €. Darunter übersteigt die Nachfrage das Angebot.",s:"WiSo W25/26"},
 {t:"wiso",q:"Welche Maßnahme der EZB erhöht die Geldmenge?",o:["Mindestreservesatz erhöhen","Wertpapiere an Banken verkaufen","Hauptrefinanzierungssatz senken","Einlagezins erhöhen"],c:2,e:"Ebenso: Wertpapiere von Banken kaufen.",s:"WiSo W24/25 · W25/26"},
 {t:"wiso",q:"245 Beschäftigte, davon 4 leitende Angestellte, alle anderen mindestens 16. Wie viele sind für den Betriebsrat wahlberechtigt?",o:["245","241","224","212"],c:1,e:"Leitende Angestellte zählen nicht. 224 Angestellte + 17 Azubis = 241. Das ergibt 9 Betriebsratsmitglieder.",s:"WiSo W25/26"},
 {t:"wiso",q:"Welche Klausel im Arbeitsvertrag verstößt gegen das Gesetz?",o:["Gehalt am 28. des Monats","Verschwiegenheit über Betriebsgeheimnisse","19 Werktage Urlaub im Jahr","Meldung der Arbeitsunfähigkeit"],c:2,e:"Der gesetzliche Mindesturlaub beträgt 24 Werktage.",s:"WiSo W25/26"},
 {t:"wiso",q:"Worin unterscheidet sich die Probezeit in der Ausbildung vom Arbeitsverhältnis?",o:["Gar nicht","In der Ausbildung ist sie Pflicht (mind. 1 Monat), im Arbeitsverhältnis optional","Ausbildung max. 3 Monate, Arbeitsverhältnis 12","Kündigung in der Ausbildung nur mit Grund"],c:1,e:"Ausbildung: 1 bis 4 Monate. Arbeitsverhältnis: höchstens 6 Monate mit 2 Wochen Frist.",s:"WiSo W25/26"},
 {t:"wiso",q:"Welche Beendigung eines Ausbildungsverhältnisses ist nicht zulässig?",o:["Nach bestandener Prüfung","Fristlos in der Probezeit","Aus wichtigem Grund nach der Probezeit","Kündigung des Azubis ohne Grund nach der Probezeit, weil er woanders mehr verdient"],c:3,e:"Nach der Probezeit kann der Azubi nur aus wichtigem Grund oder bei Aufgabe der Ausbildung kündigen.",s:"WiSo W25/26"},
 {t:"wiso",q:"Eine Mitarbeiterin (18 Monate im Betrieb) soll zum 31.03.2025 gekündigt werden. Spätester Zugang der Kündigung?",o:["28.02.2025","03.03.2025","15.03.2025","01.02.2025"],c:1,e:"Unter 2 Jahren: 4 Wochen zum 15. oder Monatsende. 31.03. minus 28 Tage = 03.03.2025.",s:"WiSo W24/25"},
 {t:"wiso",q:"Wer zahlt die Beiträge zur Berufsgenossenschaft?",o:["Arbeitnehmer und Arbeitgeber je zur Hälfte","Der Arbeitgeber allein","Der Arbeitnehmer allein","Der Staat"],c:1,e:"Eine bessere Gefahrenklasse ändert deshalb nichts an der Gehaltsabrechnung.",s:"WiSo W25/26"},
 {t:"wiso",q:"Wann dürfen Arbeitnehmer streiken?",o:["Jederzeit während der Verhandlungen","Erst nach Ablauf des alten Tarifvertrags","Erst nach 95 % Beteiligung an der Urabstimmung","Erst nach dem Schlichterspruch"],c:1,e:"Während der Laufzeit gilt die Friedenspflicht.",s:"WiSo W25/26"},
 {t:"wiso",q:"Was kennzeichnet eine Stabsstelle?",o:["Sie entscheidet über Fachfragen","Leitungshilfsstelle ohne Weisungsbefugnis","Sie ist die Personalabteilung","Sie vertritt den Betriebsrat"],c:1,e:"Sie berät die Leitung, z. B. zur Digitalisierung im Vertrieb.",s:"WiSo W25/26"},
 {t:"wiso",q:"Welche Maßnahme trägt unmittelbar zum Umweltschutz bei?",o:["Aushänge zur Mülltrennung","Kredit für eine Kläranlage","Portable Klimageräte","Informationen über das Intranet statt Papierrundschreiben"],c:3,e:"Papier wird direkt eingespart.",s:"WiSo W25/26"},
 {t:"wiso",q:"Wie hoch ist der Gewinnanteil eines GmbH-Gesellschafters mit 24.000 € von 120.000 € Einlagen bei 62.000 € Gewinn?",o:["20.666,67 €","12.400,00 €","15.500,00 €","24.000,00 €"],c:1,e:"Gesetzlich nach Geschäftsanteilen: 24/120 × 62.000 € = 12.400 €.",s:"WiSo W24/25"},
 // Proximus 5
 {t:"mobil",q:"Tim hat seit 4 Jahren einen Führerschein und versichert sein erstes Auto ohne übernommenen Schadenverlauf. Einstufung?",o:["SF 0", "SF ½", "SF 1", "SF 3"],c:1,e:"Sonderersteinstufung SF ½ ab 3 Jahren Führerschein (AKB I.2.2.1), Beitragssatz 65 %.",s:"Proximus 5, S. 125"},
 {t:"mobil",q:"Ein Ehepaar (beide 30, Führerschein seit 10 Jahren) hat einen Pkw in SF 3. Der Zweitwagen wird nur von beiden gefahren. Einstufung?",o:["SF ½", "SF 1", "SF 3", "SF 4"],c:2,e:"Erstwagen mindestens SF 3, Führerschein ≥ 1 Jahr, beide ≥ 23, nur sie fahren (AKB I.2.2.3).",s:"Proximus 5, S. 125 f."},
 {t:"mobil",q:"Reise am 10.05. gebucht, Abreise am 25.05. Bis wann kann die Reiserücktrittsversicherung noch abgeschlossen werden?",o:["Bis zum Reiseantritt", "Bis zum 13.05.", "Bis zum 17.05.", "Gar nicht mehr"],c:1,e:"Unter 30 Tagen bis Reiseantritt nur, wenn der Vertrag spätestens 3 Tage nach Buchung geschlossen wird.",s:"Proximus 5, S. 451"},
 {t:"mobil",q:"Ein Paar bucht eine Reise für 500 € und will einen Jahresvertrag Reiserücktritt mit SB. Prämie ohne VSt?",o:["26,45 €", "27,60 €", "31,74 €", "34,50 €"],c:2,e:"23 € × 1,15 (Paar) × 1,20 (Jahresvertrag) = 31,74 €.",s:"Proximus 5, S. 463 f."},
 {t:"mobil",q:"Um 23 Uhr wird Reisegepäck aus dem Auto auf einem öffentlichen Parkplatz gestohlen. VS 3.000 €, Schaden 1.200 €. Entschädigung?",o:["0 €", "300 €", "400 €", "1.200 €"],c:1,e:"Nachts und ohne Garage nur 10 % der VS, höchstens 400 €: 10 % von 3.000 € = 300 €.",s:"Proximus 5, S. 461"},
 {t:"mobil",q:"Stornokosten 100 € für eine Person, Selbstbehalt ist vereinbart. Eigenanteil des Kunden?",o:["20 €", "25 €", "50 €", "0 €"],c:1,e:"20 % = 20 €, mindestens aber 25 € je Person.",s:"Proximus 5, S. 456"},
 {t:"mobil",q:"Nach einem Unfall begeht der Fahrer Unfallflucht. Wie hoch darf der KH-Regress höchstens sein?",o:["2.500 €", "5.000 €", "10.000 €", "unbegrenzt"],c:1,e:"Bei besonders schwerwiegender vorsätzlicher Verletzung nach dem Schaden bis 5.000 €, sonst 2.500 €.",s:"Proximus 5, AKB E"},
 {t:"mobil",q:"Panne 300 km von zu Hause, das Auto ist erst nach 4 Tagen fertig. Was zahlt der Schutzbrief für einen Mietwagen?",o:["3 Tage × 50 €", "Bis 7 Tage × 50 €, hier 4 Tage", "300 € pauschal", "Nichts"],c:1,e:"Mietwagen statt Übernachtung, höchstens 7 Tage zu je 50 €.",s:"Proximus 5, AKB A.3"},
 {t:"freizeit",q:"Lena (20) macht im Juni 2026 Abitur und beginnt erst im Oktober 2027 eine Ausbildung. Ist sie dann über die Familien-PHV versichert?",o:["Ja, sie ist unverheiratet", "Nein, die Ausbildung beginnt nicht innerhalb von 12 Monaten", "Ja, bis 25", "Nur mit Zuschlag"],c:1,e:"Mitversichert ist nur eine sich innerhalb von 12 Monaten anschließende Erstausbildung.",s:"Proximus 5, PHV"},
 {t:"freizeit",q:"Eine geliehene Kamera (Zeitwert 800 €) fällt herunter. Was zahlt die Proximus-PHV?",o:["0 €", "700 €", "800 €", "15.000 €"],c:1,e:"Geliehene bewegliche Sachen bis 15.000 €, SB 100 €.",s:"Proximus 5, PHV"},
 {t:"freizeit",q:"Welche Drohne ist in der Proximus-PHV mitversichert?",o:["Bis 250 g", "Bis 2 kg", "Bis 5 kg", "Keine"],c:0,e:"Drohnen bis 250 g. Modelle ohne Motor bis 5 kg.",s:"Proximus 5, PHV"},
 {t:"freizeit",q:"Ein Mietstreit entsteht 6 Wochen nach Beginn des Wohnungs-RS (keine Vorversicherung). Besteht Schutz?",o:["Ja, sofort", "Nein, Wartezeit 3 Monate", "Ja, aber nur Beratung", "Nein, Mietrecht ist ausgeschlossen"],c:1,e:"Wohnungs-RS hat 3 Monate Wartezeit.",s:"Proximus 5, ARB"},
 {t:"freizeit",q:"Der Kunde fordert 10.000 € und schließt einen Vergleich über 8.000 €. Welcher Kostenanteil wird übernommen?",o:["0 %", "20 %", "80 %", "100 %"],c:1,e:"Kosten nur im Verhältnis des Unterliegens: 2.000 von 10.000 € = 20 %.",s:"Proximus 5, ARB"},
 {t:"freizeit",q:"Einem Kunden wird Diebstahl vorgeworfen. Leistet der Straf-RS?",o:["Ja, voll", "Nein, Diebstahl ist nur vorsätzlich begehbar", "Nur bei Freispruch rückwirkend", "Nur Beratung bis 250 €"],c:1,e:"Reine Vorsatzdelikte wie Diebstahl oder Betrug sind nie versichert.",s:"Proximus 5, ARB"},
 {t:"wohnen",q:"Ein Sparbuch liegt in der Schublade. Bis zu welchem Betrag ist es versichert?",o:["1.500 €", "3.000 €", "20.000 €", "20 % der VS"],c:1,e:"Urkunden und Sparbücher außerhalb des Wertschutzschranks bis 3.000 €.",s:"Proximus 5, VHB"},
 {t:"wohnen",q:"Hausrat-VS 60.000 €. Nach einem Brand wohnt die Familie 10 Tage im Hotel für 90 € pro Nacht. Ersatz?",o:["900 €", "600 €", "6.000 €", "0 €"],c:1,e:"Höchstens 1 ‰ der VS je Tag = 60 € × 10 Tage = 600 €.",s:"Proximus 5, VHB"},
 {t:"wohnen",q:"Welche VS braucht eine 80-m²-Wohnung für den Unterversicherungsverzicht?",o:["40.000 €", "52.000 €", "65.000 €", "80.000 €"],c:1,e:"650 € × 80 m² = 52.000 €.",s:"Proximus 5, VHB PK 7712"},
 {t:"wohnen",q:"Ab wann ist eine leer stehende, unbeaufsichtigte Wohnung eine Gefahrerhöhung?",o:["Nach 30 Tagen", "Nach mehr als 60 Tagen", "Nach 90 Tagen", "Nie"],c:1,e:"Länger als 60 Tage unbewohnt und unbeaufsichtigt.",s:"Proximus 5, VHB"},
 {t:"wohnen",q:"Bis wann gibt es den Neubaunachlass von 20 % in der Wohngebäudeversicherung?",o:["5 Jahre ab Bezug", "Bis Ende des VJ, in dem das Gebäude 10 Jahre alt wird", "Immer", "Nur im ersten Jahr"],c:1,e:"Neubaunachlass 20 % bis zum Ende des Versicherungsjahres mit 10 Jahren Gebäudealter.",s:"Proximus 5, VGB-Tarif"},
 {t:"gesund",q:"Rezidivfrist 4 Jahre, der Antragsteller ist seit 1 Jahr und 8 Monaten beschwerdefrei, Versicherungsbeginn 01.09. Erschwerungsdauer?",o:["2 Jahre", "3 Jahre", "4 Jahre", "Keine"],c:1,e:"1 J. 8 Mon. wird auf 2 Jahre aufgerundet: 4 − 2 = 2. Beginn zwischen 1.7. und 1.12.: +1 Jahr = 3 Jahre.",s:"Proximus 5, S. 423"},
 {t:"gesund",q:"Wie lange ist die Wartezeit in der privaten Pflegepflichtversicherung?",o:["3 Monate", "2 Jahre innerhalb der letzten 10 Jahre", "5 Jahre", "Keine"],c:1,e:"Beim ersten Leistungsantrag 2 Jahre Versicherung in den letzten 10 Jahren.",s:"Proximus 5, S. 367"},
 {t:"gesund",q:"Für eine Zahnzusatzversicherung wären 5 Leistungsausschlüsse nötig. Was passiert?",o:["Annahme mit 5 LA", "Annahme mit Risikozuschlag", "Ablehnung", "Annahme nach Wartezeit"],c:2,e:"In Zusatztarifen höchstens 4 Leistungsausschlüsse, sonst Ablehnung.",s:"Proximus 5, S. 423"},
 {t:"gesund",q:"Ein GKV-versicherter Arbeitnehmer will seine Einkommenslücke absichern. Welcher KT-Tarif passt?",o:["KT 8", "KT 15", "KT 22", "KT 43"],c:3,e:"KT 43 für Arbeitnehmer, versichert die Differenz zwischen Netto und Krankengeld.",s:"Proximus 5, S. 435"},
 {t:"gesund",q:"Wie hoch ist der Gesamtbeitrag in der GEPV (Pflege-Bahr) mindestens?",o:["5 €", "10 €", "15 €", "20 €"],c:2,e:"Eigenanteil mindestens 10 € plus 5 € Zulage.",s:"Proximus 5, S. 383"},
 {t:"gesund",q:"Selbstbehalt im Vollversicherungstarif A1 für Erwachsene und Kinder?",o:["0 / 0 €", "500 / 250 €", "1.000 / 500 €", "1.200 / 600 €"],c:1,e:"A0 ohne, A1 500/250 €, A2 1.000/500 €.",s:"Proximus 5, S. 426"},
 {t:"vorsorge",q:"Mindestbeitrag für eine fondsgebundene Versicherung mit laufender Zahlung?",o:["120 € im Jahr", "240 € im Jahr", "300 € im Jahr", "5.000 € einmalig"],c:2,e:"Sonst 240 € im Jahr, Einmalbeitrag 5.000 €.",s:"Proximus 5, S. 309"},
 {t:"vorsorge",q:"Wie viel Kapital darf sich eine Kundin zum Beginn ihrer Riester-Rente (S 20) höchstens auszahlen lassen?",o:["0 %", "30 %", "50 %", "100 %"],c:1,e:"Teilkapitalauszahlung bis 30 % des Kapitals zu Rentenbeginn.",s:"Proximus 5, S. 184"},
 {t:"vorsorge",q:"Antrag auf eine Risiko-LV über 300.000 €. Zwei Wochen nach Antragseingang stirbt die Person bei einem Unfall. Leistung aus dem vorläufigen Schutz?",o:["Nichts", "100.000 €", "150.000 €", "300.000 €"],c:1,e:"Vorläufiger Schutz höchstens 100.000 €.",s:"Proximus 5, S. 306"},
 {t:"vorsorge",q:"Ein Kunde hat der Dynamik-Erhöhung dreimal hintereinander widersprochen. Folge?",o:["Der Vertrag endet", "Es erfolgt keine weitere Erhöhung", "Die Erhöhung wird nachgeholt", "Gesundheitsprüfung nötig"],c:1,e:"Nach 3 entfallenen Erhöhungen in Folge gibt es keine weiteren.",s:"Proximus 5, S. 308"},
 {t:"vorsorge",q:"Ein Kunde will sich seine Basisrente (S 10) zum Rentenbeginn auszahlen lassen. Geht das?",o:["Ja, voll", "Ja, bis 30 %", "Nein, nur lebenslange Rente (außer Kleinbetragsrente)", "Ja, nach 12 Jahren"],c:2,e:"Eine einmalige Leistung statt der Rente kann nicht verlangt werden.",s:"Proximus 5, S. 174"},
 {t:"finanz",q:"Welcher Proximus-Fonds hat den höchsten Ausgabeaufschlag?",o:["Global Invest", "Ethic Invest", "Real Invest", "Balance Invest"],c:2,e:"Real Invest 5,50 %, Global 4,25 %, Ethic 3,80 %, Balance 3,40 %.",s:"Proximus 5, S. 512"},
 {t:"finanz",q:"Eine Kundin will ausschüttend und ausgewogen (Anleihen und Aktien) für 5 Jahre anlegen. Welcher Fonds passt?",o:["Global Invest", "Balance Invest", "Strategic Invest", "Cash Invest"],c:1,e:"Balance Invest: Mischfonds, SRRI 5, ausschüttend, ab 5 Jahren.",s:"Proximus 5, S. 482"},
 {t:"finanz",q:"Ein Kunde zahlt 10.000 € in den Global Invest (AA 4,25 %). Wie viel wird tatsächlich angelegt?",o:["9.575,00 €", "9.592,33 €", "10.000,00 €", "10.425,00 €"],c:1,e:"Ausgabepreis = Anteilwert × 1,0425. 10.000 € ÷ 1,0425 = 9.592,33 €.",s:"Proximus 5, S. 478"},
 {t:"finanz",q:"Was ist der Proximus Strategic Invest?",o:["Geldmarktfonds", "Offener Immobilienfonds", "Dachfonds", "ETF"],c:2,e:"Er investiert variabel in Aktien- und Rentenfonds, SRRI 4.",s:"Proximus 5, S. 486"},
 {t:"einkommen",q:"Einfache Invaliditätsleistung, VS 100.000 €. Die rechte Hand ist vollständig funktionsunfähig. Leistung?",o:["40.000 €", "55.000 €", "70.000 €", "100.000 €"],c:1,e:"Gliedertaxe Hand 55 %.",s:"Proximus 5, S. 329"},
 {t:"einkommen",q:"Progression U 225, VS 100.000 €, Invaliditätsgrad 60 %. Leistung?",o:["60.000 €", "105.000 €", "135.000 €", "225.000 €"],c:1,e:"25 % × 1 + 25 % × 2 + 10 % × 3 = 105 %.",s:"Proximus 5, S. 329"},
 {t:"einkommen",q:"Progression U 350, VS 50.000 €, Invaliditätsgrad 70 %. Leistung?",o:["35.000 €", "100.000 €", "120.000 €", "175.000 €"],c:1,e:"25 % × 1 + 25 % × 3 + 20 % × 5 = 200 % von 50.000 €.",s:"Proximus 5, S. 329"},
 {t:"einkommen",q:"Ein Radfahrer stürzt mit 1,7 ‰. Leistet die Unfallversicherung?",o:["Ja, voll", "Ja, gekürzt", "Nein, Bewusstseinsstörung ab 1,6 ‰ auf dem Rad", "Nur die Soforthilfe"],c:2,e:"Unwiderlegbare alkoholbedingte Bewusstseinsstörung ab 1,6 ‰ beim Radfahren.",s:"Proximus 5, S. 333"},
 {t:"einkommen",q:"Krankheiten haben zu 20 % an den Unfallfolgen mitgewirkt. Folge?",o:["Kürzung um 20 %", "Keine Kürzung", "Keine Leistung", "Kürzung um 25 %"],c:1,e:"Unter 25 % Mitwirkungsanteil wird nicht gemindert.",s:"Proximus 5, S. 333"},
 {t:"einkommen",q:"Tarif 30, Gruppe A, Invalidität 100.000 € mit U 225, jährliche Zahlung. Jahresprämie inklusive 19 % VSt?",o:["216,00 €", "244,19 €", "257,04 €", "205,20 €"],c:1,e:"100 × 2,16 € = 216 €, −5 % = 205,20 €, × 1,19 = 244,19 €.",s:"Proximus 5, S. 341 f."},
 {t:"einkommen",q:"Ein angestellter Kfz-Mechaniker will ein Unfall-Tagegeld. Ab welchem Tag ist das möglich?",o:["Ab dem 1. Tag", "Ab dem 15. Tag", "Ab dem 43. Tag", "Gar nicht"],c:2,e:"Arbeitnehmer nur ab dem 43. Tag. Ab 1. Tag nur Selbstständige, ab 15. Tag auch Hausfrauen/-männer.",s:"Proximus 5, S. 340"},
 {t:"einkommen",q:"Ein BU-Versicherter ist pflegebedürftig mit 2 Pflegepunkten, ohne sonstige BU. Rente?",o:["40 %", "70 %", "100 %", "Keine"],c:1,e:"1 Punkt 40 %, 2 Punkte 70 %, ab 3 Punkten 100 %.",s:"Proximus 5, S. 261"},
 {t:"einkommen",q:"Wie viel BU-Rente kann ein Angestellter über die Ausbauoption höchstens absichern?",o:["12.000 € im Jahr", "30.000 € im Jahr", "60.000 € im Jahr", "Unbegrenzt"],c:1,e:"Bis +100 % der ursprünglichen Rente, höchstens 30.000 € im Jahr und 60 % des Bruttoeinkommens (Beamte 12.000 €).",s:"Proximus 5, S. 262"},
 {t:"einkommen",q:"Ein Dachdecker fragt nach dem BU-Tarif S 35. Was gilt?",o:["Normaltarif", "20 % Abschlag", "30 % Zuschlag", "50 % Zuschlag"],c:2,e:"Handwerkliche Berufe +30 %, akademische −20 %, Beamte mit DU-Klausel +50 %.",s:"Proximus 5, S. 317"}
];

