import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function EditableNote ({initialValue, noteKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [noteInputValue, setNoteInputValue] = useState(initialValue)
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
                        <button onClick={handleEdit}>Edit</button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <input type="text" placeholder="Note"/>
                </div>
            )}
        </>
    )
}

export default EditableNote;