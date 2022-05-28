import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // Remember, Hooks have to be initialized inside of the body
  // of a React Component. You can’t initialize them outside
  // of the body or inside of a function
  const [todos, setTodos] = useState([
    {
      content: "Pickup dry cleaning",
      isCompleted: true,
    },
    {
      content: "Get haircut",
      isCompleted: false,
    },
    {
      content: "Build a todo app in React",
      isCompleted: false,
    },
  ]);

  // check if the key pressed is Enter, to create a new todo item
  // on the following line
  function handleKeyDown(e, i) {
    if (e.key === "Enter") {
      createTodoAtIndex(e, i);
    }
    if (e.key === "Backspace" && todos[i].content === "") {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  function createTodoAtIndex(e, i) {
    // create a copy of the todos state array
    // state should never be directly mutated (modified)
    const newTodos = [...todos];
    // we insert a new todo item at *after* the currently-selected
    // todo item. This is why we're passing in the current todo index...
    newTodos.splice(i + 1, 0, {
      content: "",
      isCompleted: false,
    });
    // set the original todos array to the copy version, which has the
    // newly-created todo item.
    setTodos(newTodos);
    // we wrap the focus code inside a setTimeout delay to allow the state
    // to finish updating before we focus on the newly-rendered input
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function removeTodoAtIndex(i) {
    // here we check if we're at the very first todo item in the list
    if (i === 0 && todos.length === 1) return;
    // make two slices of the array leaving out the undesired todo item
    setTodos((todos) =>
      todos.slice(0, i).concat(todos.slice(i + 1, todos.length))
    );

    setTimeout(() => {
      if (i === 0) {
        document.forms[0].elements[i].focus();
      } else {
        document.forms[0].elements[i - 1].focus();
      }
    });
  }

  function updateTodoAtIndex(e, i) {
    // here we assign a copy of the todos state array to newTodos
    // and then assign the content property of the todo at the current
    // index to be the value of the event.target. Simple.
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }
  
  // Because we’re dealing with functional React components,
  // we won’t have a render method that’s typically found inside
  // of Class components. Instead, our functional component
  // directly returns the HTML.
  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && "todo-is-completed"}`}>
              <div
                className="checkbox"
                onClick={() => toggleTodoCompleteAtIndex(i)}
              >
                {todo.isCompleted && <span>&#x2714;</span>}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onChange={(e) => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
