import React, { Component } from "react";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ItemPage from "../ItemPage/ItemPage";
import { artikel } from "../../data/data";
import DatePicker from "react-datepicker";
import moment from "moment";
import CustSlider from "../CustSlider/CustSlider";

class App extends Component {
  constructor(props) {
    //hier im constructor werden die daten für die suchfunktion initialisiert
    super(props);
    this.state = {
      ausgewaehlterTab: "",
      zielStadt: "",
      zielLand: "",
      abreiseDatum: "",
      rueckkehrDatum: "",
      passagierAnzahl: 1,
      artikel: artikel,
    };

    this.zielLandBearbeiter = this.zielLandBearbeiter.bind(this);
    this.zielStadtBearbeiter = this.zielStadtBearbeiter.bind(this);
    this.formAbschicken = this.formAbschicken.bind(this);
    this.auswahlBearbeiten = this.auswahlBearbeiten.bind(this);
    this.passagierAnzahlBearbeiter =
      this.passagierAnzahlBearbeiter.bind(this);
    this.startDatumBearbeiter = this.startDatumBearbeiter.bind(this);
    this.endDatumBearbeiter = this.endDatumBearbeiter.bind(this);
    this.sliderBearbeiter = this.sliderBearbeiter.bind(this);
    this.durchPassendeKategorienFinden = this.durchPassendeKategorienFinden.bind(this);
    this.nachPreisFiltern = this.nachPreisFiltern.bind(this);

    //mit moment haben wir einen funktionierenden kalender zur suche hinzugefügt
    moment.updateLocale("de", {
      calendar: {
        sameElse: "Do MMM YYYY",
      },
    });
  }

  //diese funktion kontrolliert den zustand des sliders, also den Wert des Preis auf dem Schieber
  sliderBearbeiter(obj) {
    this.setState({
      sliderRangeObj: obj,
    });

    const objektZumMatchen = {
      zielStadt: this.state.zielStadt,
      zielLand: this.state.zielLand,
    };

    //hier ist die logik zum filtern von daten
    let gefilterteDatne = this.durchPassendeKategorienFinden(artikel, objektZumMatchen);
    gefilterteDatne = gefilterteDatne.filter(this.nachPreisFiltern);

    this.setState({
      artikel: gefilterteDatne,
    });
  }

  //logik zum filtern nach preis, es wird der state des sliders betrachtet und nach oberem und unterem limit gefiltert 
  nachPreisFiltern(item) {
    return (
      item.price >= this.state.sliderRangeObj.untereGrenze &&
      item.price <= this.state.sliderRangeObj.obereGrenze
    );
  }

  //hier wird gehandelt, wenn die Zielstadt geändert wird
  zielStadtBearbeiter(event) {
    const objektZumMatchen = {
      zielStadt: event.target.value,
    };

    const gefilterteDatne = this.durchPassendeKategorienFinden(artikel, objektZumMatchen);
    if (gefilterteDatne.length !== 0) {
      this.setState({
        zielStadt: event.target.value,
        artikel: gefilterteDatne,
      });
    }
  }

  //hier wird gehandelt, wenn das Zielland geändert wird
  zielLandBearbeiter(event) {
    const zielLand = event.target.value ? event.target.value : "";
    const objektZumMatchen = {
      zielStadt: this.state.zielStadt,
      zielLand: zielLand,
    };

    //hier werden die gefilterten daten gespeichert
    const gefilterteDatne = this.durchPassendeKategorienFinden(artikel, objektZumMatchen);

    //falls welche vorhanden sind bzw oben gespeichert wurden, werden sie in den state geschrieben
    if (gefilterteDatne.length !== 0) {
      this.setState({
        zielLand: event.target.value,
        artikel: gefilterteDatne,
      });
    }
  }

  //hier wird ein neues seiten laden verhindert, wenn auf suchen geklickt wird
  formAbschicken(event) {
    event.preventDefault();
  }

  auswahlBearbeiten(index, last) {
    this.setState({
      ausgewaehlterTab: index,
    });
  }

  //hier wird die anzahl der reisenden geändert
  passagierAnzahlBearbeiter(event) {
    this.setState({ passagierAnzahl: event.target.value });
  }

  //hier das reisedatum
  startDatumBearbeiter(date) {
    this.setState({
      startDatum: date,
    });
  }

  durchPassendeKategorienFinden(arrObj, matchingObj) {
    return arrObj.filter(function (entry) {
      return Object.keys(matchingObj).every(function (key) {
        return (
          entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0
        );
      });
    });
  }

  endDatumBearbeiter(date) {
    this.setState({
      endDate: date,
    });
  }

  //das ist eine render-method um die suchanfrage der person oben anzuzeigen
  render() {
    var zielStadt = this.state.zielStadt ? this.state.zielStadt : "";
    var zielLand = this.state.zielLand ? this.state.zielLand : "";
    var headerElement = "";
    var startDatum = this.state.startDatum
      ? "Depart: " + this.state.startDatum.toString().slice(4, 15)
      : "";
    if (!!zielStadt && !!zielLand) {
      headerElement = (
        <div>
          <h5>
            {" "}
            {this.state.zielLand} > {this.state.zielStadt}{" "}
          </h5>
        </div>
      );
    }

    //hier returnen wir mit react den jsx content der suchfunktion + das ItemPage component an das via props die gefilterten suchdaten übergeben werden
    return (
      <div className="App">
        <div className="App-header">
          <h2>Ihr Digitales Reisebüro</h2>
        </div>
        <div className="container">
          <div className="one-third column">
            <Tabs onSelect={this.auswahlBearbeiten}>
              <TabList>
                <Tab>Reise-Suche</Tab>
              </TabList>

              <TabPanel>
                <div className="Item">
                  <form onSubmit={this.formAbschicken}>
                    <input
                      className="row"
                      type="text"
                      value={this.state.zielLand}
                      onChange={this.zielLandBearbeiter}
                      placeholder="Ziel-Land"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.zielStadt}
                      onChange={this.zielStadtBearbeiter}
                      placeholder="Ziel-Stadt"
                    />
                    <DatePicker
                      selected={this.state.startDatum}
                      onChange={this.startDatumBearbeiter}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Anreise Datum"
                    />
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.endDatumBearbeiter}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Abreise Datum"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.passagierAnzahl}
                      onChange={this.passagierAnzahlBearbeiter}
                    />
                    <input className="row" type="submit" value="Suchen" />
                  </form>
                </div>
              </TabPanel>
            </Tabs>
            <div>
              <div className="label">
                <label>
                  <h5>Preissegment</h5>
                </label>
                <CustSlider onChange={this.sliderBearbeiter} />
              </div>
            </div>
          </div>
          <div className="two-thirds column">
            <div className="header">
              <div className="Item-left">{headerElement}</div>
              <div className="Item-right">{startDatum}</div>
            </div>
            <main>
              <ItemPage
                artikel={this.state.artikel}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
