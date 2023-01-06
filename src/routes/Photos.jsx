import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = (id) => {
    // TODO: answer here
    async function deletePhotoById (id) {
      const res = await fetch(`http://localhost:3001/photos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setPhotos(photos.filter((photo) => photo.id !== id));
      setError(data.error);
    }
    deletePhotoById(id);
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    // fetch(`http://localhost:3001/photos?_sort=id&_order=${sort}`)
    async function fetchAllSorted () {
      const res = await fetch(`http://localhost:3001/photos?_sort=id&_order=${sort}`);
      const data = await res.json();
      // console.log(data);
      setPhotos(data);
      setLoading(false);
    }
    fetchAllSorted();
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    // fetch(`http://localhost:3001/photos?q=${submited}`)
    async function fetchSearch () {
      const res = await fetch(`http://localhost:3001/photos?q=${submited}`);
      const data = await res.json();
      console.log(data);
      setPhotos(data);
      setLoading(false);
    }
    fetchSearch();
  }, [submited])

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    async function fetchAllPhotos () {
      const res = await fetch(`http://localhost:3001/photos`);
      const data = await res.json();
      console.log(data);
      setPhotos(data);
      setLoading(false);
    }
    fetchAllPhotos();
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
