import React from 'react';
import { useReducer, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewTask.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter((task) => task.id !== action.id);
    default:
      throw new Error('Error');
  }
};

const NewTask = () => {
  const [tasks, dispatch] = useReducer(reducer, []);
  const taskRef = useRef(null);

  const addTask = (e) => {
    if (taskRef.current.value.length !== 0) {
      dispatch({
        type: 'add',
        payload: { id: uuidv4(), title: taskRef.current.value },
      });
      taskRef.current.value = '';
    }
  };

  const removeTask = (id) => {
    dispatch({ type: 'remove', id });
  };

  return (
    <div className="new-task">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="new-task__label" htmlFor="input">
          New task
        </label>
        <input
          className="new-task__input"
          id="input"
          type="text"
          placeholder="Something neat"
          ref={taskRef}
        />
        <button className="new-task__btn" type="submit" onClick={addTask}>
          ADD
        </button>
      </form>

      <ul className="new-task__items">
        {tasks.map((item) => {
          return (
            <li key={item.id} className="new-task__item">
              <p className="new-task__item-title">{item.title}</p>
              <button
                className="new-task__item-btn"
                onClick={() => removeTask(item.id)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewTask;
