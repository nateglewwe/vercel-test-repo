import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditableNote ({initialValue, noteKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [noteInputValue, setNoteInputValue] = useState(initialValue)
    let [addNoteValue, setAddNoteValue] = useState()
    const { toolId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleEdit = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND NOTEKEY, AND TOOLID
            dispatch({ type: 'UPDATE_GEAR_NOTE', payload: {note: noteInputValue, noteKey: noteKey, id: toolId} });
            setNoteInputValue('');
        }
        setIsEditing(!isEditing)
    }

    const handleAddNote = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        //DISPATCH HERE WITH VALUE BEING ADDED, AND NOTEKEY, AND TOOLID
        dispatch({ type: 'UPDATE_GEAR_NOTE', payload: {note: addNoteValue, noteKey: noteKey, id: toolId} });
        setAddNoteValue('');
    }

    const handleDeleteNote = () => {
        //DISPATCH HERE WITH VALUE BEING UPDATED TO NULL, AND NOTEKEY, AND TOOLID
        dispatch({ type: 'UPDATE_GEAR_NOTE', payload: {note: null, noteKey: noteKey, id: toolId} });
    }

    return (
        <>
            {initialValue ? (
                <div>
                    {isEditing ?
                    <>
                        <TextField type="text" value={noteInputValue || ''} onChange={(event) => {setNoteInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Note" size="small" />&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Save</Button>&nbsp;
                        <Button onClick={() => setIsEditing(false)} variant="contained" size="small" >Cancel</Button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Edit</Button>&nbsp;
                        <Button onClick={handleDeleteNote} variant="contained" size="small" >Delete</Button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <TextField type="text" value={addNoteValue || ''} onChange={(event) => {setAddNoteValue(event.target.value)}}
                        onKeyDown={handleAddNote} placeholder="Note" size="small" />&nbsp;
                    <Button onClick={handleAddNote} variant="contained" size="small" >Add</Button>
                </div>
            )}
        </>
    )
}

export default EditableNote;