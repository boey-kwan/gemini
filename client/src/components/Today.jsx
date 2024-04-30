import { useState } from 'react';
import '../App.css';
import Task from "./Task";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Today() {

  // TODO: Grab all tasks in this day.
  const [taskList, setTaskList] = useState([1, 2]);
  // TODO: Initialize to the first ID in the list.
  const [currentTaskId, setCurrentTaskId] = useState(1);

  const date = new Date();
  const dateString = date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(date.getDate() - 1);
  const yesterdayString = yesterday.toDateString();

  const tomorrow = new Date();
  tomorrow.setDate(date.getDate() + 1);
  const tomorrowString = tomorrow.toDateString();

  function updateCurrentTaskId(id) {
    setCurrentTaskId(id);
    console.log("current task: " + id)
  }

  function deleteTaskWithId(id) {
    console.log(taskList.filter(value => value !== id))
    setTaskList(taskList.filter(value => value !== id))
  }
 
    return (
      <div>
        <div className='row'>
          <div className="body-left" > 
            <button className="day-navigation">
              {"< " + yesterdayString} 
            </button>
          </div>

          <div className="body-center scroll">
            <h1 className='h1'>Today's To-Do List</h1>
            <h2 className='h2'>{dateString}</h2>
            <div className='task-list'>
              { taskList.length ? taskList.map((value) => {
                  return <Task 
                            key={value} 
                            id={value} 
                            showSidebar={currentTaskId == value}
                            onClick={updateCurrentTaskId}
                            deleteTask={deleteTaskWithId}/>
                }) : <h2 style={{fontStyle: 'italic', opacity: 0.5, textAlign: 'center'}}>Create a task to get started!</h2>
              }
            </div>

            {/* Add a task button */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center',
              }}>
                <button 
                  className='row main-button' 
                  style={{
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    setTaskList(
                      [...taskList, taskList.length+1]
                    )
                  }}>
                  <AddOutlinedIcon/>
                  <div>Add task</div>
                </button>
            </div>
          </div>

          <div className="body-right">
            <button className="day-navigation">
              {tomorrowString + " >"} 
            </button>
          </div>

        </div>
      </div>
    );
  }