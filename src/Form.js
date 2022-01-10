import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

export default function Form(props) {
  const [todo, setTodo] = useState("");

  const addTodo = (e) => {
    if (e.key === "Enter") {
      props.add({ name: todo, id: uuidv4(), status: false, edit: false });
      setTodo("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="Form"
    >
      <div className="Form-Circle Circle"></div>
      <input
        type="text"
        id="todo"
        name="todo"
        value={todo}
        placeholder="Create a new todo..."
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyDown={addTodo}
      />
    </form>
  );
}
