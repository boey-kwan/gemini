import { useState } from 'react';
import '../App.css';
import Task from "./Task";

export default function Today() {

  // TODO: Grab all tasks in this day.
  const [taskList, setTaskList] = useState([1, 2]);
  // TODO: Initialize to the first ID in the list.
  const [currentTaskId, setCurrentTaskId] = useState(1);

  const date = new Date().toDateString();

  function updateCurrentTaskId(id) {
    setCurrentTaskId(id);
    console.log("current task: " + id)
  }
 
    return (
      <div>
        <div className='row'>
          <div className="body-left">
          {"< Yesterday"}
          </div>

          <div className="body-center scroll">
            <h1 className='h1'>Today's To-Do List</h1>
            <h2 className='h2'>{date}</h2>
            <div className='task-list'>
              {taskList.map((value) => {
                return <Task key={value} 
                id={value} 
                showSidebar={currentTaskId == value}
                onClick={updateCurrentTaskId}/>
              })}
            </div>
          </div>

          <div className="body-right">
          </div>
        </div>

        {/* Add a task button */}
        <button className="main-button centered"
          onClick={() => {
            setTaskList(
              [...taskList, taskList.length+1]
            )
          }}>
          Add a task.
        </button>
      </div>
    );
  }