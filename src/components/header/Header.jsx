import { Link, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import vintedLogo from "../../assets/img/logo.svg";
import "../header/Header.css";
import Cookies from "js-cookie";
import Switch from "react-switch";
import { useState } from "react";

const Header = ({
  isVisible,
  setIsVisible,
  token,
  setToken,
  setRegister,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchingWord,
  setSearchingWord,
}) => {
  const navigate = useNavigate();

  //matérial design switch
  class MaterialDesignSwitch extends Component {
    constructor() {
      super();
      this.state = { checked: false };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
      this.setState({ checked });
    }

    render() {
      return (
        <div className="switch-bloc">
          <label htmlFor="material-switch">
            <span>Trier par prix : </span>
            <Switch
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={25}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </label>
        </div>
      );
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="first-header-line">
            <Link to="/" className="vintedLogo-div">
              <img src={vintedLogo} alt="logoVinted" />
            </Link>
            <div className="principal-input-box">
              <select type="Articles" className="article-selector">
                <option value="">Articles</option>
                <option value="">Membres</option>
                <option value="">Centre d'aide</option>
              </select>
              <input
                type="text"
                className="principal-input"
                value={searchingWord}
                onChange={(event) => {
                  setSearchingWord(event.target.value);
                }}
              />
            </div>
            <div>
              {token ? (
                <button
                  onClick={() => {
                    setRegister(false);
                    setToken(null);
                    Cookies.remove("token");
                  }}
                  className="deconnection-button">
                  Se déconnecter
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsVisible(!isVisible);
                  }}
                  to="/signup"
                  className="connection-button">
                  S'inscrire | Se connecter
                </button>
              )}
              <button className="selling-button">Vendre tes articles</button>
              <div>
                <button className="question-button">?</button>
              </div>

              <select name="language" id="">
                <option value="">Francais (French)</option>
                <option value="">English (Anglais)</option>
                <option value="">Espagñol (Espagnol)</option>
                <option value="">Nederlands (Dutch)</option>
              </select>
            </div>
          </div>
        </div>
        <nav className="router-nav">
          <div className="switch-box">
            <MaterialDesignSwitch />
          </div>
          <div className="range-box">
            <div>prix min : {minPrice}</div>
            <input
              type="range"
              name="min-price"
              placeholder="min"
              value={minPrice}
              onChange={(event) => {
                setMinPrice(event.target.value);
              }}
              min="0"
              max="500"
            />
            <div>prix max : {maxPrice}</div>
            <input
              type="range"
              name="max-price"
              placeholder="max"
              value={maxPrice}
              onChange={(event) => {
                setMaxPrice(event.target.value);
              }}
              min="0"
              max="500"
            />{" "}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
