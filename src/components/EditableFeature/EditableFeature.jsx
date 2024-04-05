import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import './EditableFeature.css';



function EditableFeature ({initialValue, featureKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [featureInputValue, setFeatureInputValue] = useState(initialValue)
    let [addFeatureValue, setAddFeatureValue] = useState()
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

    const handleAddFeature = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        //DISPATCH HERE WITH VALUE BEING ADDED, AND FEATUREKEY, AND TOOLID
        dispatch({ type: 'UPDATE_GEAR_FEATURE', payload: {feature: addFeatureValue, featureKey: featureKey, id: toolId} });
        setAddFeatureValue('');
    }

    const handleDeleteFeature = () => {
        //DISPATCH HERE WITH VALUE BEING UPDATED TO NULL, AND FEATUREKEY, AND TOOLID
        dispatch({ type: 'UPDATE_GEAR_FEATURE', payload: {feature: null, featureKey: featureKey, id: toolId} });
    }

    return (
        <>
            {initialValue ? (
                <div>
                    {isEditing ?
                    <>
                        <input type="text" value={featureInputValue || ''} onChange={(event) => {setFeatureInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Feature"/>
                        <Button onClick={handleEdit} variant="contained" size="small">Save</Button>&nbsp;
                        <Button onClick={() => setIsEditing(false)} variant="contained" size="small">Cancel</Button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Edit</Button>&nbsp;
                        <Button onClick={handleDeleteFeature} variant="contained" size="small" >Delete</Button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <input type="text" value={addFeatureValue || ''} onChange={(event) => {setAddFeatureValue(event.target.value)}}
                        onKeyDown={handleAddFeature} placeholder="Add Feature"/>
                    <Button onClick={handleAddFeature} variant="contained" size="small" >Add</Button>
                </div>
            )}
        </>
    )
}

export default EditableFeature;