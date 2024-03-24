import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';



function EditableFeature ({initialValue, featureKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [value, setValue] = useState(initialValue)
    const { toolId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleClick = () => {
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND FEATUREKEY, AND TOOLID
            dispatch({ type: 'UPDATE_GEAR_FEATURE', payload: {feature: value, featureKey: featureKey, id: toolId} });
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