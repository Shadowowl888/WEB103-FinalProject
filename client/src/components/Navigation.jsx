import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../css/Navigation.css"

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h1>PlatePal🍽️</h1>
          </Link>
        </li>
      </ul>

      <ul className="nav-list">
        <li>
          <Link to="/discover">Discover Recipes</Link>
        </li>
        <li>
          <Link to="/new">Upload a new Recipe</Link>
        </li>
        <li>
          <Link to="/me">View My profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
