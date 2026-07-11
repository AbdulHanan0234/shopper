import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import carticon from "../Assets/cart_icon.png";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shopper</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" className="nav-link">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("men")}>
          <Link to="/men" className="nav-link">
            Men
          </Link>
          {menu === "men" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("women")}>
          <Link to="/women" className="nav-link">
            Women
          </Link>
          {menu === "women" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" className="nav-link">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/login" className="nav-link">
          <button>Login</button>
        </Link>
        <Link to="/cart" className="nav-link">
          <img src={carticon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};
