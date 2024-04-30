import '../App.css'
import { useRef, useState } from 'react';
import { Checkbox, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Sidebar from './Sidebar';

export default function Task(props) {

    // Each task has its own ID.

    const taskRef = useRef();

    const [checked, setChecked] = useState(false);

    // Dictionary of task fields
    const [showFields, setShowFields] = useState({"description": true, "time": false, "location": false, "image": false})

    // The current content of each field
    const [description, setDescription] = useState("desc");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [location, setLocation] = useState("loc");
    const [image, setImage] = useState("im");

    function onClickSidebarIcon(fieldName) {
        setShowFields({...showFields, [fieldName]: !showFields[fieldName]});
    }

    return (
        <>
        <div className='row' style={{width:'100%'}}>
        <div className='column sidebar' />

            <div className="task" 
                ref={taskRef}
                onClick={()=>props.onClick(props.id)}
            >
                <div className='row' style={{height: 'fit-content'}}>
                    <TextField 
                        id='task-title-field' 
                        label="Task title" 
                        variant='outlined'
                        fullWidth/>

                        {/* todo: change field height, and make it bold */}

                    <Checkbox 
                        checked={checked} 
                        onClick={() => {
                            setChecked(!checked);
                        }}
                        />
                </div>
                
                <form className="task-details">

                    {/* Time Range */}
                    {
                        showFields.time ? 
                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{visibility: true}}>
                            <div className='row' style={{justifyContent: 'flex-start', columnGap: '1em'}}>
                                From
                                <TimePicker value={startTime} onChange={(x) => { if (x) setStartTime(x) }}/>
                                to
                                {/* Todo: Make end time optional */}
                                <TimePicker value={endTime} onChange={(x) => { if (x) setEndTime(x) }}/>
                            </div>
                        </LocalizationProvider>
                        : null
                    }
                    
                    {/* Location */}
                    {
                        showFields.location ?
                        <div>
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" name="location"/>
                        </div>
                        : null
                    }
                    
                    
                    {/* Description */}
                    {
                        showFields.description ?
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description"/>
                        </div>
                        : null
                    }
                    
                    {/* Image */}
                    {
                        showFields.image ?
                        <div>
                            <label htmlFor="image">Image:</label>
                            <input type="image" id="image" name="image"/>
                        </div>
                        : null
                    }
                </form>
            </div>

            <Sidebar onClickSidebarIcon={onClickSidebarIcon} showSidebar={props.showSidebar} />

            </div>
            
        </>
    );
  }