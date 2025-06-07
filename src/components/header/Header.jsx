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
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchingWord,
  setSearchingWord,
  fetchData,
  sortButtonActive,
  setSortButtonActive,
}) => {
  const navigate = useNavigate();

  const FilterUrl = sortButtonActive
    ? "https://lereacteur-vinted-api.herokuapp.com/v2/offers" +
      `?sort=price-asc&title=${searchingWord}&priceMin=${minPrice}&priceMax=${maxPrice}`
    : "https://lereacteur-vinted-api.herokuapp.com/v2/offers" +
      `?sort=price-desc&title=${searchingWord}&priceMin=${minPrice}&priceMax=${maxPrice}`;

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
            <p>Prix croiss/décroiss</p>
            <input
              type="checkbox"
              value={sortButtonActive}
              onChange={() => {
                setSortButtonActive(!sortButtonActive);
                fetchData(FilterUrl);
              }}
            />
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
                fetchData(FilterUrl);
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
                fetchData(FilterUrl);
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
