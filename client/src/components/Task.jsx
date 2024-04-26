import '../App.css'
import { useState } from 'react';
import { Checkbox, TextField } from '@mui/material'

export default function Task() {

    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState([]);
    const [image, setImage] = useState([]);

    return (
      <div>

        <div className="task">

            <div className='row' style={{height: 'fit-content'}}>
                <TextField id='task-title-field' label="Task title" variant='outlined' fullWidth/>

                <Checkbox 
                    checked={checked} 
                    onClick={() => {
                        setChecked(!checked);
                    }}
                />

            </div>
            <form className="task-details">
                
                {/* Date */}
                <div>
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date"/>
                </div>
                
                {/* Time */}
                <div>
                    <label for="time">Time:</label>
                    <input type="time" id="time" name="time"/>
                </div>
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