import Todo from './Components/Todo'
import Form from './Components/Form'
import FilterButton from './Components/FilterButton'
import React, { useState, useRef, useEffect } from "react"
import {nanoid} from "nanoid"

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

const [tasks,setTasks] = useState(props.object)
const [filter, setFilter] = useState('All')

const taskLists = tasks
.filter(FILTER_MAP[filter])
.map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskComplete}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));


const filterList = FILTER_NAMES.map((name) => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

      function toggleTaskComplete(id) {
           const updatedTasks = tasks.map((task) => {
                if (id === task.id) {
                    return {...task, completed: !task.completed}
                    }
                 return task;
                 });
                setTasks(updatedTasks);
              }

    function deleteTask(id){
     const remainingTasks = tasks.filter((task) =>
            (id !==task.id))
     setTasks(remainingTasks)
    }

    function editTask(id, newName) {
      const editedTaskList = tasks.map((task) => {
        if (id === task.id) {
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList);
    }


    function addTask(name) {
           const newTask = { id: "todo" + nanoid(), name: name, complete: false };
           setTasks([...tasks, newTask]);
         }

const tasksNoun =   taskLists.length == 1? "task" :"tasks"
const noOfTaskes = `${taskLists.length} ${tasksNoun} remaining`
const listHeadingRef = useRef(null)

  return (
    <div className="todoapp stack-large">
      <h1>Manosh TodoMatic</h1>
      <Form task={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {noOfTaskes}
     </h2>
     <ul
       role="list"
       className="todo-list stack-large stack-exception"
       aria-labelledby="list-heading"
     >
       {taskLists}
     </ul>
    </div>
  );
}

export default App