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
  const [fileDetailsDiv, setFileDetailsDiv] = useState(false);
  const [fileDetails, setFileDetails] = useState();

  const type = fileName.slice(fileName.indexOf(".") + 1, fileName.length);

  useEffect(() => {
    setRenameFile(false);
  }, [path]);

  const download = async () => {
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    const requestOption = {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:3600/files/download?filePath=root/FullStack/App.css`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
  };

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
    e.preventDefault();
    if (!newFileName) {
      console.log("empty file name");
      return; /** */
    }

    const strPath = path.reduce((str, file) => `${str}/${file}`);
    const oldStrPath = strPath.concat(`/${fileName}`);
    const newStrPath = strPath.concat(`/${newFileName}.${type}`);

    const requestOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        oldPath: oldStrPath,
        newPath: newStrPath,
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
  const fileDetailsFetch = async () => {
    if (fileDetailsDiv) {
      setFileDetailsDiv(false);
      return;
    }
    const strPath = path.reduce((str, file) => `${str}/${file}`);
    setFileDetailsDiv(true);
    const requestOption = {
      method: "GET",
    };
    const response = await fetch(
      `http://localhost:3600/files/fileDetails?filePath=${strPath}/${fileName}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    setFileDetails(data);
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
        {fileDetailsDiv && (
          <div className="fileDetails">size: {fileDetails?.size} bytes</div>
        )}
      </div>
      <div className="options">
        <div onClick={deleteFile}>
          <AiTwotoneDelete />
        </div>
        <div onClick={() => setRenameFile(!renameFile)}>
          <MdOutlineDriveFileRenameOutline />
        </div>
        <div onClick={download}>
          <AiOutlineDownload />
        </div>
        <div onClick={fileDetailsFetch}>
          <CgDetailsMore />
        </div>
      </div>
    </div>
  );
};

export default File;
