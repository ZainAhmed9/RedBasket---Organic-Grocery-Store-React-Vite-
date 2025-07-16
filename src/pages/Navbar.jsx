import { NavLink } from "react-router-dom";
import logo from "/images/logo.jpg";

function Navbar() {
  return (
    <nav className="navbar bg-light shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand text-danger fw-bold">
          <img src={logo} alt="Logo" width="40" height="40" /> RedBasket
        </NavLink>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/product" className="nav-link">Products</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
