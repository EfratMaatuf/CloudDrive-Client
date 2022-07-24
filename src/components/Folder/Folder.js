import React, { useContext, useEffect, useState } from "react";
import { AiFillFolder, AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import PathContext from "../../context/PathContext";
import PopupContext from "../../context/PopupContext";
import "./Folder.css";
const Folder = ({ folderName }) => {
  const { togglePopup, setPopupContent } = useContext(PopupContext);
  const { path, setPath } = useContext(PathContext);
  const [newFolderName, setNewFolderName] = useState();
  const [renameFolder, setRenameFolder] = useState(false);
  const strPath = path.reduce((str, file) => `${str}/${file}`);

  useEffect(() => {
    setRenameFolder(false);
  }, [path]);

  const deleteFolder = async () => {
    const requestOption = {
      method: "DELETE",
    };
    const response = await fetch(
      `http://localhost:3600/folders/delete?folderPath=${strPath}/${folderName}`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setPath([...path]);
    }
  };

  const rename = async (e) => {
    e.preventDefault();
    const oldStrPath = strPath.concat(`/${folderName}`);
    const newStrPath = strPath.concat(`/${newFolderName}`);
    if (!newFolderName) {
      console.log("empty folder name");
      return; /** */
    }
    const requestOption = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      data: JSON.stringify({
        oldPath: oldStrPath,
        newPath: newStrPath,
      }),
    };
    const response = await fetch(
      `http://localhost:3600/folders/rename`,
      requestOption
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      setRenameFolder(false);
      setPath([...path]);
    }
  };
  return (
    <div
      className="folder"
      onDoubleClick={() => {
        setPath([...path, folderName]);
      }}
    >
      <div className="detailsFolder">
        <div className="folderFlex">
          <div onClick={() => setRenameFolder(false)}>
            <AiFillFolder />
          </div>
          <div className="folderName">
            {renameFolder ? (
              <form onSubmit={rename} className="formRenameFolder">
                <input
                  className="renameFolderInput"
                  onInput={(e) => setNewFolderName(e.target.value)}
                  type="text"
                />
                <button type="submit">Rename</button>
              </form>
            ) : (
              folderName
            )}
          </div>
        </div>
        {renameFolder ? (
          <></>
        ) : (
          <div className="folderFlex">
            <div onClick={() => setRenameFolder(true)}>
              <MdOutlineDriveFileRenameOutline />
            </div>
            <div onClick={deleteFolder}>
              <AiTwotoneDelete />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
