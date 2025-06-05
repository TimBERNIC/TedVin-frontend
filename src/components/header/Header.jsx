import { Link, useNavigate } from "react-router-dom";
import vintedLogo from "../../assets/img/logo.svg";
import "../header/Header.css";
import Cookies from "js-cookie";

const Header = ({ isVisible, setIsVisible, token }) => {
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
              <select type="Articles" className="article-selector">
                <option value="">Articles</option>
                <option value="">Membres</option>
                <option value="">Centre d'aide</option>
              </select>
              <input type="text" className="principal-input" />
            </div>
            <div>
              {token ? (
                <button
                  onClick={() => {
                    Cookies.remove("token");
                    navigate("/");
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
    </>
  );
};

export default Header;
