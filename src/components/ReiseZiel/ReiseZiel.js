
import React from 'react';
import './ReiseZiel.css';

//in diesem component werden einfach die daten von der ItemPage übergeben und die Reiseziele angezeigt
const ReiseZiel = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
        <h5>{item.price}€ pro Woche</h5>
        <div className="Item-price">{item.zielStadt}, {item.zielLand}</div>
        <div className="Item-description">Vom: {item.abreiseDatumZeit}</div>
        <div className="Item-description">Bis: {item.rueckkehrDatumZeit}</div>
    </div>

    <div className="Item-right">
      <div className="Item-image" >
        <img src={item.imageUrl}className="Item-logo" alt="logo" />
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
