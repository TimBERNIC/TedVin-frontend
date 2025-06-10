import React from "react";
import "../fixedNav/FixedNav.css";

const FixedNav = () => {
  return (
    <div className="container">
      <div className="fixed-bottom-nav">
        <ul>
          <h3>Vinted</h3>
          <li>À propos de Vinted</li>
          <li>Carrière</li>
          <li>Le développement durable</li>
          <li>Presse</li>
          <li>Publicités</li>
          <li>Accessibilité</li>
        </ul>
        <ul>
          <h3>Découvrir</h3>
          <li>Comment ça marche ?</li>
          <li>Vérification de l'article</li>
          <li>Applications mobiles</li>
          <li>Tableau de bord</li>
          <li>Vinted Pro</li>
          <li>Guide Vinted Pro</li>
        </ul>
        <ul>
          <h3>Aide</h3>
          <li>Centre d'aide</li>
          <li>Vendre</li>
          <li>Acheter</li>
          <li>Confiance et sécurité</li>
        </ul>
      </div>
    </div>
  );
};

export default FixedNav;
