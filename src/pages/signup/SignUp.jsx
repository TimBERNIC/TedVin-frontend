import { useState } from "react";
import "../signup/SignUp.css";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = ({
  isVisible,
  setIsVisible,
  setToken,
  register,
  setRegister,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPicture, setAvatarPicture] = useState(null);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const sendFormLogin = async () => {
    try {
      const response = await axios.post(
        "https://site--tedvin-backend--cp75xnbbqn97.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
        setError(false);
        Cookies.set("token", response.data.token, { expires: 7 });
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(true);
      console.log(error.response);
    }
  };

  const sendFormSignup = async () => {
    try {
      const response = await axios.post(
        "https://site--tedvin-backend--cp75xnbbqn97.code.run/user/signup",
        {
          email: email,
          username: name,
          password: password,
          newsletter: newsletter,
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
        setError(false);
        Cookies.set("token", response.data.token, { expires: 7 });
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(true);
      console.log(error.response);
    }
  };

  return (
    <main className="signup-root">
      <div className="signup-box">
        <button
          onClick={() => {
            setIsVisible(false);
            navigate("/");
          }}
          className="close-signup-button">
          X
        </button>

        {register ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendFormLogin();
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
            {error && (
              <div className="error-box">
                Email et/ou Mot de passe invalide{" "}
              </div>
            )}
            <button>Se connecter</button>
          </form>
        ) : (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendFormSignup();
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
                {error && (
                  <div className="error-box">
                    Veuillez rentrer, un nom d'utilisateur, un email et un mot
                    de passe valide
                  </div>
                )}
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
        {!register ? (
          <div
            onClick={() => {
              setRegister(!register);
            }}
            className="switch-form-box">
            Tu as déjà un compte? Connecte-toi!
          </div>
        ) : (
          <div
            onClick={() => {
              setRegister(!register);
            }}
            className="switch-form-box">
            Pas encore de compte? Inscris-toi!
          </div>
        )}
      </div>
    </main>
  );
};

export default SignUp;
