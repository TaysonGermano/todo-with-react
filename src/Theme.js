import { useState } from "react";
import "./Theme.css";

export default function Theme() {
  const root = document.getElementById("theme");

  const [icon, setIcon] = useState("fas fa-moon");
  const changeMode = () => {
    root.classList.toggle("dark");
    icon === "fas fa-moon" ? setIcon("fas fa-sun") : setIcon("fas fa-moon");
  };

  return (
    <div className="Theme">
      <h1>TODO</h1>
      <i
        className={icon}
        onClick={changeMode}
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
}
