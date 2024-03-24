import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



function EditableFeature ({initialValue, featureKey }) {
    let [isEditing, setIsEditing] = useState(false)
    let [value, setValue] = useState(initialValue)
    const { toolId } = useParams();
    console.log('THIS IS THE VALUE!!!', initialValue);

    const handleClick = () => {
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND FEATUREKEY, AND TOOLID
        }
        setIsEditing(!isEditing)
    }


    return (
        <>
            {initialValue && (
                <div>
                    {isEditing ?
                    <input type="text" value={value || ''} onChange={(event) => {setValue(event.target.value)}}/>
                    :
                    <span>{initialValue}</span>}&nbsp;
                    <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
                </div>
            )}
        </>
    )
}

export default EditableFeature;