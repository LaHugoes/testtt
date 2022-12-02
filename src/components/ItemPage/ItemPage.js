import React from "react";
import Item from "../Item/Item";
import "./ItemPage.css";

//hier werden die Reise-Items gemapt und an das Item-Component gereicht, falls keine vorhanden sind, wird angezeigt, dass es keine Items gibt => keine Reiseziel für die Suchanfrage
function ItemPage({ items }) {
  let length = items.length;
  if (length > 0) {
    return (
      <ul className="ItemPage-items">
        {items.map((item) => (
          <li key={item.id} className="ItemPage-item">
            <Item item={item}></Item>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="ItemPage-items">
        <label>
<<<<<<< HEAD
        <h5>Es gibt keine Ziele für die angegebenen Daten 🙁</h5>
=======
          <h5>
            Es gibt derzeit keine Reisen die auf ihre Suchanfrage zutreffen.
          </h5>
>>>>>>> 11216cf78e4fee2d164ee14576b56b65a5083906
        </label>
      </ul>
    );
  }
}
ItemPage.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default ItemPage;
