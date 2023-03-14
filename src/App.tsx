import React, { useState } from "react";
import "./App.css";

//DND
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//TS model
import { Todo } from "./model/model";

//components
import InputField from "./components/InputField/InputField";
import { TodoList } from "./components/TodoList/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [undoTodos, setUndos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    let undo = undoTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if(source.droppableId === "TodosFuture"){
      add = complete[source.index];
      complete.splice(source.index, 1);
    }else{
      add = undo[source.index];
      undo.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if(destination.droppableId === "TodosFuture"){
      complete.splice(destination.index, 0, add);
    } else{
      undo.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    setUndos(undo)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <TodoList
         undoTodos={undoTodos}
         setUndos={setUndos}
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
