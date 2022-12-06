import React from "react";
import Item from "../Item/Item";
import "./ItemPage.css";

//hier werden die Reise-artikel gemapt und an das Item-Component gereicht, falls keine vorhanden sind, wird angezeigt, dass es keine artikel gibt => keine Reiseziel für die Suchanfrage
function ItemPage({ artikel }) {
  let length = artikel.length;
  if (length > 0) {
    return (
      <ul className="ItemPage-artikel">
        {artikel.map((item) => (
          <li key={item.id} className="ItemPage-item">
            <Item item={item}></Item>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="ItemPage-artikel">
        <label>
          <h5>
            Es gibt derzeit keine Reisen die auf ihre Suchanfrage zutreffen.
          </h5>
        </label>
      </ul>
    );
  }
}
ItemPage.propTypes = {
  artikel: React.PropTypes.array.isRequired,
};

export default ItemPage;
