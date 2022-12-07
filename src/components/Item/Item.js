
import React from 'react';
import './Item.css';

//in diesem component werden einfach die daten von der ItemPage übergeben und die Reiseziele angezeigt
const ReiseZiel = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
        <h5>{item.price}€ pro Woche</h5>
        <div className="Item-price">{item.zielStadt}, {item.zielLand}</div>
        <div className="Item-description">Vom: {item.abreiseDatumTime}</div>
        <div className="Item-description">Bis: {item.rueckkehrDatumTime}</div>
    </div>

    <div className="Item-right">
      <div className="Item-image" >
        <img className="Item-logo" alt="logo" />
      </div>
      {children}
    </div>
  </div>
)

ReiseZiel.propTypes = {
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.node
};

export default ReiseZiel;
