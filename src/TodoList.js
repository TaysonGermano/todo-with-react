import { useState, useEffect } from "react";
import Theme from "./Theme";
import Form from "./Form";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import useLocalStorage from "./useLocalStorage";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  // local storage
  const storage = window.localStorage;
  const data =
    storage.getItem("data") === null
      ? storage.setItem(
          "data",
          JSON.stringify([
            {
              name: "Clear Greg's invoice",
              id: "ef006959-38b7-4635-aba6-ae726b87aa91",
              status: true,
              edit: false,
            },
            {
              name: "Send a reminder to Greg",
              id: "b40d21c6-b824-4f0d-8f69-9917ca5734cc",
              status: false,
              edit: false,
            },
            {
              name: "Set up Alice meeting",
              id: "ebddada7-bc65-45a9-a276-d44294f68d3d",
              status: true,
              edit: false,
            },
            {
              name: "Go to Nike store",
              id: "2f22a28a-a7b2-46e0-a8b1-1326acc1c922",
              status: false,
              edit: false,
            },
            {
              name: "Call Mom",
              id: "e7919d14-82f2-4c01-8dda-52d73c97d9d8",
              status: true,
              edit: false,
            },
          ])
        )
      : storage.getItem("data");

  const [fixedTd, setFixedTd] = useLocalStorage("data");

  //setTodos
  const addTodo = (td) => {
    setFixedTd([td, ...fixedTd]);
  };

  //delete todo
  const deleteTd = (id) => {
    setFixedTd(fixedTd.filter((c) => c.id !== id));
  };

  //edit TODO
  const editTodo = (id, ev) => {
    const input = ev.target.parentElement.previousSibling;
    for (let element of fixedTd) {
      if (element.id === id) {
        element.edit = !element.edit;
        element.name = input.value;
        setTodos([...fixedTd]);
        break;
      }
    }
  };

  //All, Active, Completed
  const diplayCat = (e) => {
    //removing active class
    const parent = e.target.parentElement.children;
    for (let element of parent) {
      element.classList.remove("active");
    }

    // setelcting target
    const className = e.target.classList;

    //adding active to target element
    className.add("active");

    if (className.contains("All")) {
      setTodos([...fixedTd]);
    } else if (className.contains("Active")) {
      setTodos(fixedTd.filter((c) => c.status === false));
    } else {
      setTodos(fixedTd.filter((c) => c.status === true));
    }
  };

  //Check/Umcheck todo
  const checkUncheck = (id) => {
    let index = 0;
    const all = [...todos];
    for (let element of todos) {
      if (element.id === id) {
        break;
      } else {
        index++;
      }
    }
    if (all[index].status === false) {
      all[index].status = true;
    } else {
      all[index].status = false;
    }
    setTodos([...all]);
    storage.setItem("data", JSON.stringify(todos));
  };

  //Clear completed
  const clearCompleted = () => {
    setFixedTd(fixedTd.filter((c) => c.status !== true));
  };

  useEffect(() => {
    setTodos([...fixedTd]);
    storage.setItem("data", JSON.stringify(fixedTd));
  }, [fixedTd]);

  return (
    <div className="TodoList">
      <Theme />
      <Form add={addTodo} />
      <div className="TodoList-wrapper">
        {todos.map((t) => (
          <TodoItem
            todo={t.name}
            delete={() => deleteTd(t.id)}
            status={t.status}
            key={t.id}
            changeStatus={() => checkUncheck(t.id)}
            edit={(e) => editTodo(t.id, e)}
            enableInput={t.edit}
          />
        ))}
        <div className="TodoList-Counter">
          <div className="Counter">
            <div>
              {todos.filter((t) => t.status !== true).length} items left
            </div>
          </div>
          <div className="Options">
            <div className="All link active" onClick={diplayCat}>
              All
            </div>
            <div className="Active link " onClick={diplayCat}>
              Active
            </div>
            <div className="Completed link " onClick={diplayCat}>
              Completed
            </div>
          </div>
          <div className="Clear link" onClick={clearCompleted}>
            <div>Clear completed</div>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: "center" }}>
        Made with ❤ and react.js by Tyson Monteiro
      </footer>
    </div>
  );
}
