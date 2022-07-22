import React, { useContext, useRef, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import PathContext from "../../context/PathContext";
import "./AddFile.css";
const AddFile = () => {
  const [file, setFile] = useState({});
  const form = useRef(null);
  const { path, setPath } = useContext(PathContext);

  const submit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(e.target[0].form[0].files[0]);
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    console.log("🚀 ~ file: AddFile.js ~ line 15 ~ submit ~ strPath", strPath);
    const data = new FormData(form.current);
    console.log(data);
    const requestOption = {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data"
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    };
    fetch(`http://localhost:3600/files/addFile?path=${strPath}`, requestOption)
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  return (
    <div className="file addFile">
      <form
        ref={form}
        onSubmit={submit}
        className="formAddFile"
        action="/stats"
        enctype="multipart/form-data"
        method="post"
      >
        <label htmlFor="inputTag" className="labelAddFile">
          <AiOutlineFileAdd />
          <div>Choose File</div>
          <input
            name="file"
            key={"file"}
            className="inputAddFile"
            id="inputTag"
            type="file"
            accept=" .js, .json , .html, .css " //, .jpg , .png , .ts , .doc , audio/* , video/* , image/* "
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <span className="addFile_fileName">{file.name}</span>
        </label>
        <button type="submit">Add file</button>
      </form>
    </div>
  );
};

export default AddFile;
