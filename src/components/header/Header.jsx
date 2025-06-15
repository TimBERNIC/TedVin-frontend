import { Link, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import vintedLogo from "../../assets/img/logo.svg";
import "../header/Header.css";
import Cookies from "js-cookie";

const Header = ({
  isVisible,
  setIsVisible,
  token,
  setToken,
  setRegister,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  searchingWord,
  setSearchingWord,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container">
          <div className="first-header-line">
            <Link to="/" className="vintedLogo-div">
              <img src={vintedLogo} alt="logoVinted" />
            </Link>
            <div className="principal-input-box">
              <div type="Articles" className="article-selector">
                🔎
              </div>
              <input
                type="text"
                className="principal-input"
                value={searchingWord}
                onChange={(event) => {
                  setSearchingWord(event.target.value);
                }}
              />
            </div>
            <div className="button-box">
              {token ? (
                <button
                  onClick={() => {
                    setRegister(false);
                    setToken(null);
                    Cookies.remove("token");
                    navigate("/");
                    setIsVisible(false);
                  }}
                  className="deconnection-button">
                  Se déconnecter
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsVisible(true);
                  }}
                  to="/signup"
                  className="connection-button">
                  S'inscrire | Se connecter
                </button>
              )}
              <button
                className="selling-button"
                onClick={() => {
                  if (token) {
                    navigate("/publish");
                  } else {
                    navigate("/signup", { state: { from: "/publish" } });
                    setIsVisible(!isVisible);
                  }
                }}>
                Vendre tes articles
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
