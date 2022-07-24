import React from "react";
// import { useNavigate } from "react-router-dom";
import foldersImg from "../../images/folders.png";
import threeLines from "../../images/threeLines.png";
import "./Header.css";
const Header = () => {
  //   const navigate = useNavigate();
  const navLogin = () => {
    // navigate("/");
  };

  return (
    <div className="headerContainer">
      <div className="headerInnerWidth">
        <div className="workshopHeader">
          <img
            onClick={navLogin}
            src={foldersImg}
            alt="logo"
            className="headerLogo"
          />
          <div className="bookify">Cloud Drive</div>
        </div>
        <img src={threeLines} alt="threeLines" className="threeLines" />
      </div>
    </div>
  );
};

export default Header;
