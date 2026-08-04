import "./NewCollections.css";
import { Item } from "./../Item/Item";
import { useState, useEffect} from "react";

export const NewCollections = () => {

  const[new_Collection,setNew_Collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_Collection(data))
  },[])

  return (
      <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <div>
          <hr />
        </div>
        <div className="collections">
          {new_Collection.map((item, i) => {
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
