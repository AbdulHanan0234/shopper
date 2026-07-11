import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import carticon from "../Assets/cart_icon.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shopper</p>
      </div>

      <ul className="nav-menu">
        <li>
          <NavLink to="/" className="nav-link">
            {({ isActive }) => (
              <>
                Shop
                {isActive ? <hr /> : null}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/men" className="nav-link">
            {({ isActive }) => (
              <>
                Men
                {isActive ? <hr /> : null}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/women" className="nav-link">
            {({ isActive }) => (
              <>
                Women
                {isActive ? <hr /> : null}
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/kids" className="nav-link">
            {({ isActive }) => (
              <>
                Kids
                {isActive ? <hr /> : null}
              </>
            )}
          </NavLink>
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
