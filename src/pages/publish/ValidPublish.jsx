import { useNavigate } from "react-router-dom";
import "./ValidPublish.css";

const ValidPublish = () => {
  const navigate = useNavigate();
  return (
    <div className="validate-box">
      <div> Merci à vous! Votre offre à bien été déposée.</div>
      <button
        onClick={() => {
          navigate("/");
        }}>
        Retour à la page d'accueil
      </button>
    </div>
  );
};

export default ValidPublish;
