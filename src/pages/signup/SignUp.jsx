import { useState } from "react";
import "../signup/SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = ({ setIsVisible }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  const sendFormLogin = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  };

  const sendFormSignup = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: name,
          password: password,
          newsletter: newsletter,
        }
      );
      Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-root">
      <div className="signup-box">
        <button
          onClick={() => {
            setIsVisible(false);
            navigate("/");
          }}
          to="/"
          className="close-signup-button">
          X
        </button>

        {hasToken ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendFormLogin();
              navigate("/");
            }}>
            <h3>Se connecter</h3>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button>Se connecter</button>
          </form>
        ) : (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendFormSignup();
                navigate("/");
              }}
              action="">
              <h3>S'inscrire</h3>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Mot de Passe"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <div className="signup-conditions-box1">
                <div className="signup-conditions-box2">
                  <input
                    type="checkbox"
                    onClick={() => {
                      !newsletter ? setNewsletter(true) : setNewsletter(false);
                    }}
                    className="signup-checkbox"
                  />

                  <p>S'inscrire à notre newsletter</p>
                </div>
                <p>
                  En m'inscrivant je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
                </p>
              </div>
              <button>S'inscrire</button>
            </form>
          </>
        )}
        {!hasToken ? (
          <div
            onClick={() => {
              setHasToken(!hasToken);
            }}
            className="switch-form-box">
            Tu as déjà un compte? Connecte-toi!
          </div>
        ) : (
          <div
            onClick={() => {
              setHasToken(!hasToken);
            }}
            className="switch-form-box">
            Pas encore de compte? Inscris-toi!
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
