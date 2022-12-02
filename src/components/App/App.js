

import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ItemPage from '../ItemPage/ItemPage';
import {items} from '../../data/data';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CustSlider from '../CustSlider/CustSlider';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedTab: '',
        travelDestination: '',
        deptDate: '',
        retDate: '',
        passengerCount: 1,
        items: items
      };

      this.handleChangetravelDestination = this.handleChangetravelDestination.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handlePassengerCountChange = this.handlePassengerCountChange.bind(this);
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);
      this.handleChangeSlider = this.handleChangeSlider.bind(this);
      this.findByMatchingProperties = this.findByMatchingProperties.bind(this);
      this.filterByPrice = this.filterByPrice.bind(this);

      moment.updateLocale('en', {
        calendar : {
            sameElse : 'Do MMM YYYY'
        }
      });
  }

  handleChangeSlider(obj) {

    this.setState({
        sliderRangeObj: obj
    });

    const objToMatch = {
      travelDestination: this.state.travelDestination
    };

    let filteredData = this.findByMatchingProperties(items, objToMatch);
    filteredData = filteredData.filter(this.filterByPrice);

    this.setState({
        items: filteredData
    });
  }

  filterByPrice (item) {
      return (item.price >= this.state.sliderRangeObj.lowerBound && item.price <= this.state.sliderRangeObj.upperBound);
  }

  handleChangetravelDestination(event) {
      const objToMatch = {
        travelDestination: event.target.value
      };

      const filteredData = this.findByMatchingProperties(items, objToMatch);
      if( filteredData.length !== 0 ) {
        this.setState({
          travelDestination: event.target.value,
          items: filteredData
        });
      }
  }

  handleSubmit(event) {
    alert("Results filtered");
    event.preventDefault();
  }

  handleSelect(index, last) {
    this.setState({
      selectedTab: index
    });
  }

  handlePassengerCountChange(event) {
      this.setState({passengerCount: event.target.value});
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  findByMatchingProperties(arrObj, matchingObj) {
      return arrObj.filter(function (entry) {
          return Object.keys(matchingObj).every(function (key) {
              return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
          });
      });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  render() {

    var travelDestination = this.state.travelDestination ? this.state.travelDestination : "";
    var headerElem = "";
    var startDate = this.state.startDate ? "Depart: "+this.state.startDate.toString().slice(4, 15) : "";

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
                        <input className="row" type="text" value={this.state.travelDestination} onChange={this.handleChangetravelDestination} placeholder="Traum-Stadt" />
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            minDate={moment()}
                            maxDate={moment().add(90, "days")}
                                placeholderText="Anreise Datum" />
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            minDate={moment()}
                            maxDate={moment().add(90, "days")}
                                placeholderText="Abreise Datum" />
                        <input className="row" type="text" value={this.state.passengerCount} onChange={this.handlePassengerCountChange} />
                      <input className="row" type="submit" value="Suchen"  />
                    </form>
                  </div>
                </TabPanel>
              </Tabs>
              <div>
                <div className="label">
                  <label><h5>Preissegment</h5></label>
                  <CustSlider onChange={this.handleChangeSlider} />
                </div>
              </div>

          </div>
          <div className="two-thirds column">
            <div className="header">
                <div className="Item-left">
                  {headerElem}
                </div>
                <div className="Item-right">
                  {startDate}
                </div>
            </div>
            <main>
            <ItemPage
              items={this.state.items}
              onAddToCart={this.handleAddToCart} />
    	      </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
