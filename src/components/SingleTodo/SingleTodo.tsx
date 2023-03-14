import React, { useState, useRef, useEffect } from "react";
import { Checkbox ,CloseButton} from '@mantine/core';
import { Textarea } from '@mantine/core';
import { DateSelect } from "../DateSelect/DateSelect";
//DND
import { Draggable } from "react-beautiful-dnd";


//Styles
import "./styles.css";
import Confetti from 'react-confetti'

import moment from 'moment';
//Todo Model
import { Todo } from "../../model/model";
import { text } from "stream/consumers";

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
  const[time,setTime] = useState<string>('')


const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
 const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleDone = (event: any, id: number, isDone: boolean) => {

    if (!isDone) {
      setClickPosition({ x: event.clientX, y: event.clientY });
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 2000);
      console.log('done')
    }
    setTime(moment().format('LT'))
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

 const undone = (id:number)=>{
  console.log()
  if(time){

  }
 }

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
      {show && <Confetti
        numberOfPieces={50}
        confettiSource={{
          w: 100,
          h: 20,
          x: clickPosition.x,
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
            <>
              
              <Checkbox
                onClick={(event) => handleDone(event, todo.id, todo.isDone)}
                color="teal"
                radius="lg"
              />
              <Textarea
                onBlur={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
                ref={inputRef}
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
                className="todos__single--text"
              />
              
              {!todo.isDone?
              <DateSelect 
              title=""
              />:<span>{time}</span>
              }
            </>
            <CloseButton  className="dicon" aria-label="Close modal"  radius="lg" onClick={() => handleDelete(todo.id)}  />
          </form>
        )}
      </Draggable>
    </>

  );
};

export default SingleTodo;
