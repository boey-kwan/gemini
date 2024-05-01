import '../App.css'
import { useRef, useState } from 'react';
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

            <div className="task shadowed-card" 
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
                        fullWidth/>

                        {/* todo: change field height, and make it bold */}

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
                                <TimePicker slotProps={{ textField: { size: 'small' } }} value={startTime} onChange={(x) => { if (x) setStartTime(x) }}/>
                                to
                                {/* Todo: Make end time optional */}
                                <TimePicker slotProps={{ textField: { size: 'small' } }} value={endTime} onChange={(x) => { if (x) setEndTime(x) }}/>
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
                                fullWidth/>

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
                                fullWidth/>
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
                {/* <button className='trashcan' onClick={() => props.deleteTask(props.id)} style={{ marginTop: '0.5em', position: 'relative', float: 'right'}}>
                    <DeleteOutlinedIcon/>
                </button> */}

            </div>

            <Sidebar onClickSidebarIcon={onClickSidebarIcon} showSidebar={props.showSidebar} showFields={showFields} deleteTask={() => props.deleteTask(props.id)}/>
            </div>
            
        </>
    );
  }