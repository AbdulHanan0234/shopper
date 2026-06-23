import "./NewCollections.css";
import new_collections from "./../Assets/new_collections";
import { Item } from "./../Item/Item";

export const NewCollections = () => {
  return (
      <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <div>
          <hr />
        </div>
        <div className="collections">
          {new_collections.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                image={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
        </div>
      </div>
  );
};
