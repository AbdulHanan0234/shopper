import { useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import carticon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { getTotalCartItems } = useContext(ShopContext);
  const menuref = useRef();

  const dropdown_toggle = (e) => {
    menuref.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const getMenu = () => {
    if (path.includes("/men")) return "men";
    if (path.includes("/women")) return "women";
    if (path.includes("/kids")) return "kids";
    if (path === "/" || path === "" || path.endsWith("/shopper")) return "shop";
    return "";
  };

  const menu = getMenu();

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shopper</p>
      </div>
      <img
        onClick={dropdown_toggle}
        src={nav_dropdown}
        className="nav-dropdown"
        alt=""
      />

      <ul ref={menuref} className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>

        <li>
          <Link to="/men" className="nav-link">
            Men
          </Link>
          {menu === "men" ? <hr /> : <></>}
        </li>

        <li>
          <Link to="/women" className="nav-link">
            Women
          </Link>
          {menu === "women" ? <hr /> : <></>}
        </li>

        <li>
          <Link to="/kids" className="nav-link">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" className="nav-link">
          <img src={carticon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
