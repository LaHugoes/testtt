
import React from 'react';
import './Item.css';
import logo from './ItemLogo.svg';

let Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
        <h5>{item.price}€ pro Woche</h5>
        <div className="Item-price">{item.originCity} </div>
        <div className="Item-description">Vom: {item.deptDateTime}</div>
        <div className="Item-description">Bis: {item.retDateTime}</div>
    </div>

    <div className="Item-right">
      <div className="Item-image" >
        <img src={logo} className="Item-logo" alt="logo" />
      </div>
      <button className="Item-book" onClick={item.onClickHandler} type="submit">
        Mehr Infos
      </button>
      {children}
    </div>
  </div>
)

Item.onClickHandler =  (event) => {
  alert("Flight booked successfully :)")
  event.preventDefault();
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.node
};

export default Item;
