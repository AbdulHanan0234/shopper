import { useState, useEffect } from "react";
import "./RelatedProducts.css";
import { Item } from "../Item/Item";

const RelatedProducts = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category) return;
    fetch(`http://localhost:4000/relatedproducts?category=${category}`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data));
  }, [category]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;

