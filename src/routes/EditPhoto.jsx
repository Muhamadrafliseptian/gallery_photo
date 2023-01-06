import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [href, setHref] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    fetch("http://localhost:3001/photos/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        imageUrl: imageUrl,
        captions: captions,
        href: href,
        updatedAt: Date.now(),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => navigate("/photos"));
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    async function fetchData(id) {
      const response = await fetch(`http://localhost:3001/photos/${id}`);
      const cardData = await response.json();
      setImageUrl(cardData.imageUrl);
      setCaptions(cardData.captions);
      setHref(cardData.href);
      setLoading(false);
    }
    fetchData(id);
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <label>
              href:
              <input
                className="edit-input"
                type="text"
                value={href}
                data-testid="href"
                onChange={(e) => setHref(e.target.value)}
              />
            </label>
            <input
              className="submit-btn"
              type="submit"
              value="Submit"
              data-testid="submit"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
