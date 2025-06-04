import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import vintedLogo from "./assets/img/logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data.offers);
      setIsloading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      <Router>
        <header>
          <div className="container">
            <div className="first-header-line">
              <div className="vintedLogo-div">
                <img src={vintedLogo} alt="" />
              </div>
              <div className="principal-input-box">
                <select type="Articles" className="article-selector">
                  <option value="">Articles</option>
                  <option value="">Membres</option>
                  <option value="">Centre d'aide</option>
                </select>
                <input type="text" className="principal-input" />
              </div>
              <div>
                <button className="connection-button">
                  S'inscrire | Se connecter
                </button>
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
            <Link className="nav-button">Femmes</Link>
            <Link className="nav-button">Hommes</Link>
            <Link className="nav-button">Articles de créateurs</Link>
            <Link className="nav-button">Enfants</Link>
            <Link className="nav-button">Maison</Link>
            <Link className="nav-button">Electronique</Link>
            <Link className="nav-button">Divertissement</Link>
            <Link className="nav-button">Sport</Link>
            <Link className="nav-button">Animaux</Link>
            <Link className="nav-button">A propos</Link>
            <Link className="nav-button">Notre plateforme</Link>
          </nav>
        </header>
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home data={data} />}></Route>
                <Route path="/item/:id" element={<Offer data={data} />}></Route>
              </Routes>
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
          </main>
        )}
        <footer>
          <div className="container"></div>
          <div className="footer-div-top">
            <div>
              <a className="logo-partenaire"></a>
              <a className="logo-partenaire"></a>
              <a className="logo-partenaire"></a>
            </div>
            <div>
              <a className="ios-link"></a>
              <a className="android-link"></a>
            </div>
          </div>
          <div className="footer-div-center">
            <Link>Politique de Confidentialité</Link>
            <Link>Politique de cookies</Link>
            <Link>Paramètres des cookies</Link>
            <Link>Termes et conditions</Link>
            <Link>Notre plateforme</Link>
            <Link>Termes et conditions de Vinted Pro</Link>
          </div>
          <div className="footer-div-bottom"></div>
        </footer>
      </Router>
    </>
  );
}

export default App;
