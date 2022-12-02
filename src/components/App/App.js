import React, { Component } from "react";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ItemPage from "../ItemPage/ItemPage";
import { items } from "../../data/data";
import DatePicker from "react-datepicker";
import moment from "moment";
import CustSlider from "../CustSlider/CustSlider";

class App extends Component {
  constructor(props) {
    //hier im constructor werden die daten für die suchfunktion initialisiert
    super(props);
    this.state = {
      selectedTab: "",
      destCity: "",
      destCountry: "",
      deptDate: "",
      retDate: "",
      passengerCount: 1,
      items: items,
    };

    this.handleChangedestCountry = this.handleChangedestCountry.bind(this);
    this.handleChangedestCity = this.handleChangedestCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePassengerCountChange =
      this.handlePassengerCountChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleChangeSlider = this.handleChangeSlider.bind(this);
    this.findByMatchingProperties = this.findByMatchingProperties.bind(this);
    this.filterByPrice = this.filterByPrice.bind(this);

    //mit moment haben wir einen funktionierenden kalender zur suche hinzugefügt
    moment.updateLocale("de", {
      calendar: {
        sameElse: "Do MMM YYYY",
      },
    });
  }

  //diese funktion kontrolliert den zustand des sliders, also den Wert des Preis auf dem Schieber
  handleChangeSlider(obj) {
    this.setState({
      sliderRangeObj: obj,
    });

    const objToMatch = {
      destCity: this.state.destCity,
      destCountry: this.state.destCountry,
    };

    //hier ist die logik zum filtern von daten
    let filteredData = this.findByMatchingProperties(items, objToMatch);
    filteredData = filteredData.filter(this.filterByPrice);

    this.setState({
      items: filteredData,
    });
  }

  //logik zum filtern nach preis, es wird der state des sliders betrachtet und nach oberem und unterem limit gefiltert 
  filterByPrice(item) {
    return (
      item.price >= this.state.sliderRangeObj.lowerBound &&
      item.price <= this.state.sliderRangeObj.upperBound
    );
  }

  //hier wird gehandelt, wenn die Zielstadt geändert wird
  handleChangedestCity(event) {
    const objToMatch = {
      destCity: event.target.value,
    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);
    if (filteredData.length !== 0) {
      this.setState({
        destCity: event.target.value,
        items: filteredData,
      });
    }
  }

  //hier wird gehandelt, wenn das Zielland geändert wird
  handleChangedestCountry(event) {
    const destCountry = event.target.value ? event.target.value : "";
    const objToMatch = {
      destCity: this.state.destCity,
      destCountry: destCountry,
    };

    //hier werden die gefilterten daten gespeichert
    const filteredData = this.findByMatchingProperties(items, objToMatch);

    //falls welche vorhanden sind bzw oben gespeichert wurden, werden sie in den state geschrieben
    if (filteredData.length !== 0) {
      this.setState({
        destCountry: event.target.value,
        items: filteredData,
      });
    }
  }

  //hier wird ein neues seiten laden verhindert, wenn auf suchen geklickt wird
  handleSubmit(event) {
    event.preventDefault();
  }

  handleSelect(index, last) {
    this.setState({
      selectedTab: index,
    });
  }

  //hier wird die anzahl der reisenden geändert
  handlePassengerCountChange(event) {
    this.setState({ passengerCount: event.target.value });
  }

  //hier das reisedatum
  handleStartDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  findByMatchingProperties(arrObj, matchingObj) {
    return arrObj.filter(function (entry) {
      return Object.keys(matchingObj).every(function (key) {
        return (
          entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0
        );
      });
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date,
    });
  }

  //das ist eine render-method um die suchanfrage der person oben anzuzeigen
  render() {
    var destCity = this.state.destCity ? this.state.destCity : "";
    var destCountry = this.state.destCountry ? this.state.destCountry : "";
    var headerElem = "";
    var startDate = this.state.startDate
      ? "Depart: " + this.state.startDate.toString().slice(4, 15)
      : "";
    if (!!destCity && !!destCountry) {
      headerElem = (
        <div>
          <h5>
            {" "}
            {this.state.destCountry} > {this.state.destCity}{" "}
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
            <Tabs onSelect={this.handleSelect}>
              <TabList>
                <Tab>Reise-Suche</Tab>
              </TabList>

              <TabPanel>
                <div className="Item">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      className="row"
                      type="text"
                      value={this.state.destCountry}
                      onChange={this.handleChangedestCountry}
                      placeholder="Ziel-Land"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.destCity}
                      onChange={this.handleChangedestCity}
                      placeholder="Ziel-Stadt"
                    />
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Anreise Datum"
                    />
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Abreise Datum"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.passengerCount}
                      onChange={this.handlePassengerCountChange}
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
                <CustSlider onChange={this.handleChangeSlider} />
              </div>
            </div>
          </div>
          <div className="two-thirds column">
            <div className="header">
              <div className="Item-left">{headerElem}</div>
              <div className="Item-right">{startDate}</div>
            </div>
            <main>
              <ItemPage
                items={this.state.items}
                onAddToCart={this.handleAddToCart}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
