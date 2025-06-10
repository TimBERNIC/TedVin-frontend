import React from "react";
import { Link } from "react-router-dom";
import "../footer/Footer.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-div-center">
            <Link>Politique de Confidentialité</Link>
            <Link>Politique de cookies</Link>
            <Link>Paramètres des cookies</Link>
            <Link>Termes et conditions</Link>
            <Link>Notre plateforme</Link>
            <Link>Termes et conditions de Vinted Pro</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
