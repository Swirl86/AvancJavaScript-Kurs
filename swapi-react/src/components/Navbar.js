import React from "react";
import starWarsIconL from "../img/star-wars-icon-left.png";
import starWarsIconR from "../img/star-wars-icon-right.jpg";

const Navbar = () => {
    return (
        <div className="Navbar">
            <img className="Navbar-img-left" src={starWarsIconL} alt="logo" />
            <h1 className="Navbar-title">Star Wars - SWAPI</h1>
            <img className="Navbar-img-right" src={starWarsIconR} alt="logo" />
        </div>
    );
};

export default Navbar;
