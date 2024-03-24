import React, { useState } from 'react';


function EditableFeature ({initialValue }) {
    let [isEditing, setIsEditing] = useState(false)
    let [value, setValue] = useState(initialValue)
    console.log('THIS IS THE VALUE!!!', initialValue);




    return (
        <div>
            {isEditing ?
            <input type="text" value={value} onChange={(event) => {setValue(event.target.value)}}/>
            :
            <span>{initialValue}</span>}&nbsp;
            <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Save" : "Edit"}</button>
        </div>
    )
}

export default EditableFeature;