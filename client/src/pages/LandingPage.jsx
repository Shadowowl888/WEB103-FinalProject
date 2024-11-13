import React from "react";
import "../App.css";
import "../css/LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div id="landingPage">
      <div id="landingText">
        <h1>Get Cooking! </h1>
        <p>Simple ways to discover new, tasty recipes</p>
        <Link to="/signup">
          <button>Start Cooking!</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
