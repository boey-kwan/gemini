import '../App.css';
import Task from "./Task";

export default function Today() {
 
    return (
      <>
        <div className="body-left">
         {"< Yesterday"}
        </div>
        <div className="body-center scroll">
          <h1 className='h1'>Today's To-Do List</h1>
          <div className='task-list'>
            <div className='row'>
              <Task />
              <Sidebar />
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
        <div className="body-right">

        </div>
      </>
    );
  }