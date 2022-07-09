import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [newImage, setNewImage] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const addNewImage = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/images/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: newImage }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          setError(data.err);
        } else {
          setError("");
          setNewImage("");
          setImages(data);
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/images/all")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, [images]);

  return (
    <div className="App">
      <h1>Image-Uploader</h1>
      <form>
        <input type="file" />
        <input type="submit" value="Upload" onClick={addNewImage} />
      </form>
      {images.map((image, i) => {
        return (
          <figure key={i}>
            <img src={image} alt="-" />
          </figure>
        );
      })}
      <div>{error}</div>
    </div>
  );
}

export default App;
