import * as  React from 'react';
import dayjs from 'dayjs';
import moment from 'moment'
//DND
import { Droppable } from "react-beautiful-dnd";
import InputField from '../InputField/InputField'
//Todo Model
import { Todo } from "../../model/model";

//Styles
import "./styles.css";
import  { useEffect,useState } from "react";
//Components
import SingleTodo from "../SingleTodo/SingleTodo";

const ZHOU = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  weekday?:string;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  weekday,
}) => {
  const [todo, setTodo] = useState<string>("");
  const [todoC, setCTodo] = useState<string>("");
  const [day, setDay] = useState('');
  const [zhou, setZhou] = useState('');
 


  useEffect(() => {
    setInterval(() => {
      const date = dayjs();
      const day = date.format('YYYY-MM-DD');
      const time = date.day();
      setZhou(ZHOU[time]);
   
      setDay(day);
      // setZhou(zhou)
    }, 1000);
    return () => {};
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleCAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(todoC,'c',e)
    if (todoC) {
      setCompletedTodos([...completedTodos, { id: Date.now(), todo:todoC, isDone: false }]);
      setCTodo("");
    }
  };

  

  return (
   
    <div className="container">
    
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="Today_todayListTitle">

            <span>✨ 今天</span>
            <span className="Today_todayTime">{zhou} {day}</span>
            </div>
           
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="Today_todayListTitle">

<span>✍🏻 待办清单</span>
<span className="Today_todayTime"> 
 
</span>
</div>
          
            <InputField todo={todoC} setTodo={setCTodo} handleAdd={handleCAdd} />
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
