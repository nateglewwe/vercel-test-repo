import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';



function EditableFeature ({initialValue, featureKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [featureInputValue, setFeatureInputValue] = useState(initialValue)
    const { toolId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleEdit = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND FEATUREKEY, AND TOOLID
            dispatch({ type: 'UPDATE_GEAR_FEATURE', payload: {feature: featureInputValue, featureKey: featureKey, id: toolId} });
            setFeatureInputValue('');
        }
        setIsEditing(!isEditing)
    }


    return (
        <>
            {initialValue ? (
                <div>
                    {isEditing ?
                    <>
                        <input type="text" value={featureInputValue || ''} onChange={(event) => {setFeatureInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Feature"/>
                        <button onClick={handleEdit}>Save</button>&nbsp;
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <button onClick={handleEdit}>Edit</button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <input type="text" placeholder="Feature"/>
                    <button onClick={handleEdit}>Add</button>
                </div>
            )}
        </>
    )
}

export default EditableFeature;