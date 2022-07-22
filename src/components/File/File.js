import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDownload, AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import "./File.css";
import PopupContext from "../../context/PopupContext";
import PathContext from "../../context/PathContext";
const File = ({ fileName }) => {
  const { togglePopup, setPopupContent } = useContext(PopupContext);
  const { path, setPath } = useContext(PathContext);
  const [renameFile, setRenameFile] = useState(false);
  const [newFileName, setNewFileName] = useState();
  const type = fileName.slice(fileName.indexOf(".") + 1, fileName.length);

  useEffect(() => {
    setRenameFile(false);
  }, [path]);

  const deleteFile = async () => {
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    const requestOption = {
      method: "DELETE",
      // headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:3600/files/delete?folderPath=${strPath}/${fileName}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setPath([...path]);
    }
  };
  const renameFileFetch = async (e) => {
    const strPath = path.reduce((str, file) => `${str}/${file}`);

    e.preventDefault();
    console.log(newFileName);

    const oldStrPath = strPath.concat(`/${fileName}`);
    const newStrPath = strPath.concat(`/${newFileName}`);
    if (!newFileName) {
      console.log("empty file name");
      return; /** */
    }
    const requestOption = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      data: JSON.stringify({
        oldPath: { oldStrPath },
        newPath: { newStrPath },
      }),
    };
    const response = await fetch(
      `http://localhost:3600/files/rename`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setRenameFile(false);
      setPath([...path]);
    }
  };
  return (
    <div className="file">
      <div className={`${type} imageType`}>
        <div className="fileName">
          {renameFile ? (
            <form onSubmit={renameFileFetch}>
              <input
                type="text"
                className="renameFileInput"
                onInput={(e) => setNewFileName(e.target.value)}
              />
              .{type}
              <button type="submit">Rename file</button>
            </form>
          ) : (
            fileName
          )}
        </div>
      </div>
      <div className="options">
        <div onClick={deleteFile}>
          <AiTwotoneDelete />
        </div>
        <div onClick={() => setRenameFile(true)}>
          <MdOutlineDriveFileRenameOutline />
        </div>
        <div onClick={togglePopup}>
          <AiOutlineDownload />
        </div>
        <div onClick={togglePopup}>
          <CgDetailsMore />
        </div>
      </div>
    </div>
  );
};

export default File;
