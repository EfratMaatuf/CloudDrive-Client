import React from "react";
import AddFolder from "../AddFolder/AddFolder";
import Folder from "../Folder/Folder";
import "./AllFolders.css";
const AllFolders = ({ folders }) => {
  return (
    <div className="allFolders">
      {folders.map((folderName, i) => (
        <Folder folderName={folderName} key={i} />
      ))}
      <AddFolder />
    </div>
  );
};

export default AllFolders;
