import "./TodoItem.css";
import { useState } from "react";
import checkMark from "./icon-check.svg";

export default function TodoItem(props) {
  const [item, setItem] = useState(props.todo);

  const updateTodo = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="TodoItem">
      <div
        className={props.status ? "Circle Checked" : "Circle"}
        onClick={props.changeStatus}
      >
        <img src={checkMark} alt="" />
      </div>
      <input
        type="text"
        name="item"
        id="item"
        value={item}
        disabled={!props.enableInput}
        onChange={updateTodo}
        autoFocus={props.enableInput}
      />
      <div className="TodoItem-wrapper">
        <div
          className="TodoItem-edit"
          style={{ cursor: "pointer" }}
          onClick={props.edit}
        >
          <i
            className={!props.enableInput ? "fas fa-pen" : "fas fa-save"}
            style={{ pointerEvents: "none" }}
          ></i>
        </div>
        <div
          className="TodoItem-delete"
          onClick={props.delete}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-trash-alt" style={{ pointerEvents: "none" }}></i>
        </div>
      </div>
    </div>
  );
}
