import { useState } from 'react';
import '../App.css';
import Task from "./Task";

export default function Today() {

  // TODO: Grab all tasks in this day.
  // TODO: Initialize to the first ID in the list.
  const [currentTaskId, setCurrentTaskId] = useState(1);

  function updateCurrentTaskId(id) {
    setCurrentTaskId(id);
    console.log("current task: " + id)
  }
 
    return (
      <div className='row'>
        <div className="body-left">
         {"< Yesterday"}
        </div>

        <div className="body-center scroll">
          <h1 className='h1' style={{textAlign: 'center'}}>Today's To-Do List</h1>
          <div className='task-list'>
            {[1, 2, 3, 4].map((value) => {
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
    );
  }