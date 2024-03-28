import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

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
                        <input type="text" value={noteInputValue || ''} onChange={(event) => {setNoteInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Note"/>
                        <button onClick={handleEdit}>Save</button>&nbsp;
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <button onClick={handleEdit}>Edit</button>&nbsp;
                        <button onClick={handleDeleteNote}>Delete</button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <input type="text" value={addNoteValue || ''} onChange={(event) => {setAddNoteValue(event.target.value)}}
                        onKeyDown={handleAddNote} placeholder="Note"/>
                    <button onClick={handleAddNote}>Add</button>
                </div>
            )}
        </>
    )
}

export default EditableNote;