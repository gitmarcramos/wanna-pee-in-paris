import React, { useState } from "react";
import "./IconMenu.css";

// components
import MenuPage from "../MenuPage/MenuPage";

export default function IconMenu() {
  const [isOpen, setOpen] = useState(true);

  const handleBurger = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="icon-menu open" onClick={handleBurger}>
        <div
          className={isOpen ? "burger-line" : "burger-line burger-closed"}
        ></div>
        <div
          className={isOpen ? "burger-line" : "burger-line burger-closed"}
        ></div>
        <div
          className={isOpen ? "burger-line" : "burger-line burger-closed"}
        ></div>
      </div>
      {!isOpen && <MenuPage/>}
    </>
  );
}
