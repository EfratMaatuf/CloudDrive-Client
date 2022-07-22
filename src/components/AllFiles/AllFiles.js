import React from "react";
import File from "../File/File";
import "./AllFiles.css";
import AddFile from "../AddFile/AddFile";

const AllFiles = ({ files }) => {
  return (
    <div className="allFiles">
      <AddFile />
      {files.map((file, i) => (
        <File fileName={file} type="js" key={i} />
      ))}
    </div>
  );
};

export default AllFiles;
