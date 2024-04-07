import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditableDetail ({initialValue, detailKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [detailInputValue, setDetailInputValue] = useState(initialValue)
    let [addDetailValue, setAddDetailValue] = useState()
    const { eventId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleEdit = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND DETAILKEY, AND EVENTID
            dispatch({ type: 'UPDATE_EVENT_DETAIL', payload: {detail: detailInputValue, detailKey: detailKey, id: eventId} });
            setDetailInputValue('');
        }
        setIsEditing(!isEditing)
    }

    const handleAddDetail = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        //DISPATCH HERE WITH VALUE BEING ADDED, AND DETAILKEY, AND EVENTID
        dispatch({ type: 'UPDATE_EVENT_DETAIL', payload: {detail: addDetailValue, detailKey: detailKey, id: eventId} });
        setAddDetailValue('');
    }

    const handleDeleteDetail = () => {
        //DISPATCH HERE WITH VALUE BEING UPDATED TO NULL, AND DETAILKEY, AND EVENTID
        dispatch({ type: 'UPDATE_EVENT_DETAIL', payload: {detail: null, detailKey: detailKey, id: eventId} });
    }

    return (
        <>
            {initialValue ? (
                <div>
                    {isEditing ?
                    <>
                        <TextField value={detailInputValue || ''} onChange={(event) => {setDetailInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Detail" size="small" />&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Save</Button>&nbsp;
                        <Button onClick={() => setIsEditing(false)} variant="contained" size="small" >Cancel</Button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Edit</Button>&nbsp;
                        <Button onClick={handleDeleteDetail} variant="contained" size="small" >Delete</Button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <TextField value={addDetailValue || ''} onChange={(event) => {setAddDetailValue(event.target.value)}}
                        onKeyDown={handleAddDetail} placeholder="Add Detail" size="small" />&nbsp;
                    <Button onClick={handleAddDetail} variant="contained" size="small" >Add</Button>
                </div>
            )}
        </>
    )
}

export default EditableDetail;