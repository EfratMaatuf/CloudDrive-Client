import React, { useContext, useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import PathContext from "../../context/PathContext";
import "./AddFolder.css";
const AddFolder = () => {
  const { path, setPath } = useContext(PathContext);
  const [newFolderName, setNewFolderName] = useState();
  const [input, setInput] = useState(false);

  const addFolder = async (e) => {
    e.preventDefault();
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    if (!newFolderName) {
      console.log("empty folder name");
      return;
    }
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:3600/folders/create?folderPath=${strPath}/${newFolderName}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setInput(false);
      setPath([...path]);
    }
  };

  return (
    <div className="folder" onClick={(e) => setInput(true)}>
      <div onClick={() => setInput(false)}>
        <AiFillFolderAdd />
      </div>
      {input ? (
        <form onSubmit={addFolder} className="formAddFolder">
          <input
            className="addFolderInput"
            type="text"
            placeholder="new folder"
            onInput={(e) => setNewFolderName(e.target.value)}
          />
          <div type="submit">change</div>
        </form>
      ) : (
        <>
          <div>Add folder </div>
        </>
      )}
    </div>
  );
};

export default AddFolder;
