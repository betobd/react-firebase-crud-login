import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { nanoid } from "nanoid";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [url, setUrl] = useState("");
const [newOriginId, setNewOriginId] = useState()

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p> Loading Data...</p>;
  if (error) return <p> Loading ...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newOriginId){
      await updateData(newOriginId, url)
      setNewOriginId("")
      setUrl("")
      return
    }
    await addData(url);
    setUrl("");
  };

  const handleDeleteData = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleEditData = async (item) => {
    setUrl(item.origin)
    setNewOriginId(item.nanoid)
    await updateData(item.nanoid, item.origin);
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: https://www.google.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {
            <button type="submit"> {newOriginId ? "Edit  URL" : "Add URL"} </button> 
        }
        
      </form>
      {data.map((item) => (
        <div key={item.nanoid}>
          <h3> {item.origin}</h3>
          <button onClick={() => handleDeleteData(item.nanoid)}>Delete</button>
          <button onClick={() => handleEditData(item)}> Edit </button>
        </div>
      ))}
    </>
  );
};

export default Home;
