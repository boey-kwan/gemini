import { useState } from 'react';

export default function Task() {

    const [checked, setChecked] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState([]);
    const [image, setImage] = useState([]);
    
    return (
      <div>

        <div className="task">
            {/* Checkbox */}
            <label class="container">
                <input type="checkbox" className="checkbox" checked={checked} onClick={() => {
                    setChecked(!checked);
                }}/>
                <span class="checkmark"></span>
            </label>
            {/* Title */}
            <h2>Task title</h2>
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