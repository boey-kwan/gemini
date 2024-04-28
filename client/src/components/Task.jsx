import '../App.css'
import { useState } from 'react';
import { Checkbox, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Task() {

    const [checked, setChecked] = useState(false);
    
    // Whether or not the user has enabled each field
    const [showDescriptionField, setShowDescriptionField] = useState(false);
    const [showTimeField, setShowTimeField] = useState(false);
    const [showLocationField, setShowLocationField] = useState(false);
    const [showImageField, setShowImageField] = useState(false);

    // The current content of each field
    const [description, setDescription] = useState("desc");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [location, setLocation] = useState("loc");
    const [image, setImage] = useState("im");

    return (
      <div>

        <div className="task">

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='row' style={{justifyContent: 'flex-start', columnGap: '1em'}}>
                        From
                        <TimePicker value={startTime} onChange={(x) => { if (x) setStartTime(x) }}/>
                        to
                        {/* Todo: Make end time optional */}
                        <TimePicker value={endTime} onChange={(x) => { if (x) setEndTime(x) }}/>
                    </div>
                </LocalizationProvider>
                
                {/* Location */}
                <div>
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location"/>
                </div>
                {/* Description */}
                <div>
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description"/>
                </div>
                {/* Image */}
                <div>
                    <label for="image">Image:</label>
                    <input type="image" id="image" name="image"/>
                </div>
            </form>
        </div>
      </div>
    );
  }