import React, { useContext, useRef, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import PathContext from "../../context/PathContext";
import "./AddFile.css";
const AddFile = () => {
  const [file, setFile] = useState({});
  const form = useRef(null);
  const { path, setPath } = useContext(PathContext);

  const submit = async (e) => {
    e.preventDefault();
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    console.log("🚀 ~ file: AddFile.js ~ line 15 ~ submit ~ strPath", strPath);
    const form = new FormData();
    form.append("file", file);
    console.log(form);
    const requestOption = {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    };
    const response = await fetch(
      `http://localhost:3600/files/addFile?path=${strPath}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setPath([...path]);
    }
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
            accept=" .js, .json , .html, .css ,.svg,.pdf,.png,.jpg" //  .ts , .doc , audio/* , video/* , image/* "
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
