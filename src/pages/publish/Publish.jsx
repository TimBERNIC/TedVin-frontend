import { useState } from "react";
import "../publish/Publish.css";
import axios from "axios";

import { useNavigate, Navigate } from "react-router-dom";

const Publish = ({ token, isVisible, setIsVisible }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState(null);

  return (
    <main className="form-box container">
      <h3>Vend ton article</h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);

          for (let i = 0; i < picture.length; i++) {
            formData.append("picture", picture[i]);
          }
          // for (let pairKeyValue of formData.entries()) {
          //   console.log(pairKeyValue[0] + ", " + pairKeyValue[1]);
          // }
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response);
            navigate("/publish/valid");
          } catch (error) {
            console.log(error.response);
            error.response.status === 401 && navigate("/signup");
            setIsVisible(!isVisible);
          }
        }}>
        <div className="box">
          <div className="picture-box">
            <div className="picture-box2">
              {picture ? (
                <div className="preview-box">
                  <img src={preview} alt="photo-déposée" />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setPicture(null);
                    }}>
                    x
                  </button>
                </div>
              ) : (
                <>
                  <label htmlFor="pictures" className="pictures-label">
                    <span>+</span> Ajoute une photo{" "}
                  </label>
                  <input
                    type="file"
                    id="pictures"
                    className="display"
                    multiple={true}
                    onChange={(event) => {
                      const pictureTab = [];
                      const previewTab = [];
                      for (let i = 0; i < event.target.files.length; i++) {
                        pictureTab.push(event.target.files[i]);
                        previewTab.push(
                          URL.createObjectURL(event.target.files[i])
                        );
                      }
                      setPicture(pictureTab);
                      setPreview(previewTab);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box2 title-box">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              placeholder="ex : Robe bleue d'été"
            />
          </div>
          <div className="box2 description-box">
            <label htmlFor="description">Décris ton article</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              placeholder="ex : portée pendant une été seulement, robe longue"
            />
          </div>
        </div>
        <div className="box details-box">
          <div className="box2 brand-box">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              placeholder="ex : H&M"
            />
          </div>

          <div className="box2 size-box">
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
              placeholder="ex : L/40/12"
            />
          </div>

          <div className="box2 color-box">
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
              placeholder="ex : Bleu ciel"
            />
          </div>
          <div className="box2 condition-box">
            <label htmlFor="condition">Etat</label>
            <input
              type="text"
              id="condition"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              placeholder="ex : Très bon état sans accroc"
            />
          </div>
          <div className="box2 city-box">
            <label htmlFor="city">Lieu</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              placeholder="ex : Lyon"
            />
          </div>
        </div>
        <div className="box">
          <div className="box2 price-box">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              placeholder="0,00€"
            />
          </div>
          <div className="checkbox-box">
            <input type="checkbox" id="trade-accepted" />
            <label htmlFor="trade-accepted">
              Je suis intéressé(e) par les échanges
            </label>
          </div>
        </div>
        <div className="button-box">
          <button className="add-button">Ajouter</button>
        </div>
      </form>
    </main>
  );
};

export default Publish;
