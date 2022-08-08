import React,{useState, useRef,useEffect } from 'react'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props){

const editField = useRef(null);
const editButton = useRef(null);

const [edit,setEdit] = useState(false)
const [newName, setNewName] = useState('');

const wasEditing = usePrevious(edit);

function handleChange(e) {
  setNewName(e.target.value);
}

function handleSubmit(e) {
  e.preventDefault();
  props.editTask(props.id, newName);
  setNewName("");
  setEdit(false);
}

const editingTemplate = (
  <form className="stack-small" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      <input id={props.id} className="todo-text" type="text"
         value={newName} onChange={handleChange} ref={editField} />
    </div>
    <div className="btn-group">
     <button
       type="button"
       className="btn todo-cancel"
       onClick={() => setEdit(false)}
     >
       Cancel
       <span className="visually-hidden">renaming {props.name}</span>
     </button>
      <button type="submit" className="btn btn__primary todo-edit">
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
  </form>
);

const viewTemplate = (
  <div className="stack-small">
    <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEdit(true)}
             ref = {editButton} >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
  </div>
);

useEffect(() => {
  if (!wasEditing && edit) {
    editField.current.focus();
  }
  if (wasEditing && !edit) {
    editButton.current.focus();
  }
}, [wasEditing, edit]);

return (
    <li className ="todo"> { edit ? editingTemplate : viewTemplate}
    </li>
)
}

export default Todo