import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Path from "../Path/Path";
import AllFolders from "../AllFolders/AllFolders";
import AllFiles from "../AllFiles/AllFiles";
import "./Layout.css";
import Popup from "../Popup/Popup";
import PopupContext from "../../context/PopupContext";
import PathContext from "../../context/PathContext";

const Layout = () => {
  const [path, setPath] = useState(["root"]);
  const [popup, setPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(<div>aaa</div>);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const togglePopup = () => {
    setPopup(!popup);
  };
  useEffect(() => {
    const fetchData = async () => {
      const strPath = path.reduce((str, file) => `${str}/${file}`);
      const requestOption = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:3600/folders/folder?folderPath=${strPath}`,
        requestOption
      );
      const data = await response.json();
      const arrFiles = [];
      const arrFolder = [];
      for (const i of data) {
        if (i.includes(".")) {
          arrFiles.push(i);
        } else {
          arrFolder.push(i);
        }
      }
      setFiles(arrFiles);
      setFolders(arrFolder);
    };
    fetchData();
  }, [path]);
  // useEffect(() => {
  //   console.log("🚀 ~ file: Layout.js ~ line 45 ~ useEffect ~ files", files);
  //   console.log(
  //     "🚀 ~ file: Layout.js ~ line 46 ~ useEffect ~ folders",
  //     folders
  //   );
  // }, [files, folders]);
  return (
    <PathContext.Provider value={{ path, setPath }}>
      <PopupContext.Provider value={{ setPopupContent, togglePopup }}>
        <div>
          <Header />
          <Path />
          <div className="layoutTitle">Folders</div>
          <AllFolders folders={folders} />
          <div className="layoutTitle">Files</div>
          <AllFiles files={files} />
          {popup && <Popup content={popupContent} />}
        </div>
      </PopupContext.Provider>
    </PathContext.Provider>
  );
};

export default Layout;
