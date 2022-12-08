//hier speichern wir die Reisedaten in einem einfachen javascript array, hätten wir eine Datenbank, würden wir die Daten in JSON speichern und dann über eine API abrufen
let artikel = [
  {
    id: 0,
    preis: 4500,
    zielStadt: 'Barcelona',
    zielLand: 'Spanien',
    abreiseDatumZeit: '10.00 AM',
    rueckkehrDatumZeit: '12.00 PM',
    flightNumber: 'AI-202',
    bildUrl: "https://media.cntraveler.com/photos/591f1c7d1f187a2af3dedef0/16:9/w_2580,c_limit/barcelona-park-guell-GettyImages-512152500.jpg",
    url: "https://www.tui.de"
  },
  {
    id: 1,
    preis: 4500,
    zielStadt: 'Paris',
    zielLand: 'Frankreich',
    abreiseDatumZeit: '30.09.22',
    rueckkehrDatumZeit: '06.10.22',
    flightNumber: 'AI-203',
    bildUrl: ""
  },
  {
    id: 2,
    preis: 3500,
    zielStadt: 'Rom',
    zielLand: 'Italien',
    abreiseDatumZeit: '02.10.22',
    rueckkehrDatumZeit: '09.10.22',
    flightNumber: 'AI-204',
    bildUrl: ""
  },
  {
    id: 3,
    preis: 3500,
    zielStadt: 'Lissabon',
    zielLand: 'Portugal',
    abreiseDatumZeit: '15.12.22',
    rueckkehrDatumZeit: '21.12.22',
    flightNumber: 'AI-205'
  },
  {
    id: 4,
    preis: 5000,
    zielStadt: 'Berlin',
    zielLand: 'Deutschland',
    abreiseDatumZeit: '22.10.22',
    rueckkehrDatumZeit: '00.10.22',
    flightNumber: '6E-900'
  },
  {
    id: 5,
    preis: 5000,
    zielStadt: 'Prag',
    zielLand: 'Tschechien',
    abreiseDatumZeit: '12.10.22',
    rueckkehrDatumZeit: '19.00 AM',
    flightNumber: '6E-901'
  },
  {
    id: 6,
    preis: 4000,
    zielStadt: 'Split',
    zielLand: 'Kroatien',
    abreiseDatumZeit: '04.10.22',
    rueckkehrDatumZeit: '11.10.22',
    flightNumber: '6E-902'
  },
  {
    id: 7,
    preis: 4000,
    zielStadt: 'Cannes',
    zielLand: 'Frankreich',
    abreiseDatumZeit: '21.10.22',
    rueckkehrDatumZeit: '29.10.22',
    flightNumber: '6E-903'
  },
  {
    id: 8,
    preis: 6500,
    zielStadt: 'London',
    zielLand: 'England',
    abreiseDatumZeit: '23.10.22',
    rueckkehrDatumZeit: '31.10.22',
    flightNumber: '6E-904'
  },
  {
    id: 9,
    preis: 6500,
    zielStadt: 'Paris',
    zielLand: 'Frankreich',
    abreiseDatumZeit: '23.10.22',
    rueckkehrDatumZeit: '31.10.22',
    flightNumber: '6E-904'
  },
];

export {artikel};
//Jil Janine Laurent