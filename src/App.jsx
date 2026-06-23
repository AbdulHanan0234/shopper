import { Navbar } from "./Components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shop } from "./Pages/Shop";
import { ShopCatagory } from "./Pages/ShopCatagory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignup } from "./Pages/LoginSignup";

function App() {
  return (
    <>
      <BrowserRouter basename="/shopper" >
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/men" element={<ShopCatagory catagory="men" />} />
          <Route path="/women" element={<ShopCatagory catagory="women" />} />
          <Route path="/kids" element={<ShopCatagory catagory="kids" />} />
          <Route path="/product" element={<Product />} >
            <Route path=":productid" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
