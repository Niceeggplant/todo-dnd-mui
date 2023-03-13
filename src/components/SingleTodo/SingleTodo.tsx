import React, { useState, useRef, useEffect } from "react";

//DND
import { Draggable } from "react-beautiful-dnd";
//Styles
import "./styles.css";
import Confetti from 'react-confetti'
//ReactIcons
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

//Todo Model
import { Todo } from "../../model/model";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

  const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  


  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (event:any,id: number,isDone:boolean) => {
  
    if(!isDone){
      setClickPosition({ x: event.clientX, y: event.clientY });
      setShow(true)
       setTimeout(() => {
         setShow(false)
       }, 2000);
       console.log('done')
    }
   
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((todo) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodoText } : todo
      )
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
   <>
         {show &&  <Confetti
    numberOfPieces={50}     
    confettiSource={{
      w: 100,
      h: 20,
      x: clickPosition.x ,
      y: clickPosition.y
    }}
   
  />}
   <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
       
       <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div className="todos__single__icons">
            <span className="icon">
              <AiFillEdit
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={(event) => handleDone(event,todo.id,todo.isDone)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
   </>
   
  );
};

export default SingleTodo;
