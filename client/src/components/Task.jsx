import '../App.css'
import { useRef, useState, useEffect } from 'react';
import { Checkbox, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import Sidebar from './Sidebar';

export default function Task(props) {

    // Each task has its own ID.

    const taskRef = useRef(null);

    const [height, setHeight] = useState(0)

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

    useEffect(() => {
        setHeight(taskRef.current.clientHeight)
        setShowFields({...props.showFields});
    })

    return (
        <div className='row' style={{width: '100%', height: height, alignItems: 'flex-start', oveflow: 'visible'}}>

            <div className={props.showSidebar ? "task shadowed-card strong-shadow" : "task shadowed-card"}
                ref={taskRef}
                onClick={()=>props.onClick(props.id)}
            >
                <div className='row' style={{ height: 'fit-content' }}>
                    <TextField 
                        id='task-title-field' 
                        label="Task title" 
                        variant='outlined'
                        size='small'
                        style={{width:'calc(100% - 2.5em)'}}
                        fullWidth
                        value={props.value.title}
                        InputLabelProps={{ shrink: true }}  
                        onChange={(e) => {
                            props.updateTaskList(props.id, "title", e.target.value)
                        }}
                        />

                    <Checkbox
                        className='checkbox' 
                        checked={checked} 
                        onClick={() => {
                            setChecked(!checked);
                        }}
                        />
                </div>
                
                <form className="task-details" style={{width:'calc(100% - 2.5em)'}}>

                    {/* Time Range */}
                    {
                        showFields.time ? 
                        <div className='row' style={{ height: 'fit-content' }}>
                            <AccessTimeIcon style={{ margin: '0.1em' }}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{visibility: true}}>
                            <div className='row' style={{justifyContent: 'flex-start', columnGap: '1em'}}>
                                From
                                <TextField type="time"
                                    value={props.value.fromTime} 
                                    onChange={(x) => { 
                                        if (x) setStartTime(x) 
                                        props.updateTaskList(props.id, "fromTime", x.target.value)
                                    }}
                                />
                                to
                                <TextField type="time"
                                    value={props.value.toTime} 
                                    onChange={(x) => { 
                                        if (x) setStartTime(x) 
                                        props.updateTaskList(props.id, "toTime", x.target.value)
                                    }}
                                />
                            </div>
                        </LocalizationProvider>
                        </div>
                        : null
                    }
                    
                    {/* Location */}
                    {
                        showFields.location ?
                        <div className='row' style={{ height: 'fit-content', justifyContent: 'start' }}>
                            <PlaceOutlined style={{ margin: '0.1em' }}/>
                            <TextField 
                                id='task-title-field' 
                                label="Location" 
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={props.value.location}
                                InputLabelProps={{ shrink: true }}  
                                onChange={(e) => {
                                    props.updateTaskList(props.id, "location", e.target.value)
                                }}
                                />

                        </div>
                        : null
                    }
                    
                    
                    {/* Description */}
                    {
                        showFields.description ?
                        <div className='row' style={{ height: 'fit-content' }}>
                            <AutoStoriesOutlinedIcon style={{ margin: '0.1em' }}/>
                            <TextField 
                                id='task-title-field' 
                                label="Description" 
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={props.value.description}
                                InputLabelProps={{ shrink: true }}  
                                onChange={(e) => {
                                    props.updateTaskList(props.id, "description", e.target.value)
                                }}
                                />
                        </div>
                        : null
                    }
                    
                    {/* Image */}
                    {
                        showFields.image ?
                        <div className='row' style={{ height: 'fit-content', justifyContent: 'start' }}>
                            <PhotoOutlinedIcon style={{ margin: '0.1em' }}/>
                            <label htmlFor="image">Image:</label>
                            <input type="image" id="image" name="image"/>
                        </div>
                        : null
                    }
                </form>

            </div>
            
            <Sidebar onClickSidebarIcon={onClickSidebarIcon} showSidebar={props.showSidebar} showFields={showFields} deleteTask={() => props.deleteTask(props.id)}/>
        </div>
    );
  }