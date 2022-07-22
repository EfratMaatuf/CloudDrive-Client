import React, { useContext } from "react";
import "./Path.css";
import { IoIosArrowForward } from "react-icons/io";
import PathContext from "../../context/PathContext";
const Path = () => {
  const { path, setPath } = useContext(PathContext);
  const changePath = (e) => {
    const arrPath = [];
    for (const folder of path) {
      arrPath.push(folder);
      if (folder === e.target.innerText) {
        break;
      }
    }
    setPath(arrPath);
  };
  return (
    <div className="path">
      {path?.map((p, i) => (
        <>
          <div className="pathFolderName" onDoubleClick={changePath}>
            {p}
          </div>
          <div className="pathArrow">
            <IoIosArrowForward />
          </div>
        </>
      ))}
    </div>
  );
};

export default Path;
