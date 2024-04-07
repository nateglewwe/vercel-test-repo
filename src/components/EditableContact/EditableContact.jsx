import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditableContact ({initialValue, contactKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [contactInputValue, setContactInputValue] = useState(initialValue)
    let [addContactValue, setAddContactValue] = useState()
    const { eventId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleEdit = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND CONTACTKEY, AND EVENTID
            dispatch({ type: 'UPDATE_EVENT_CONTACT', payload: {contact: contactInputValue, contactKey: contactKey, id: eventId} });
            setContactInputValue('');
        }
        setIsEditing(!isEditing)
    }

    const handleAddContact = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        //DISPATCH HERE WITH VALUE BEING ADDED, AND CONTACTKEY, AND EVENTID
        dispatch({ type: 'UPDATE_EVENT_CONTACT', payload: {contact: addContactValue, contactKey: contactKey, id: eventId} });
        setAddContactValue('');
    }

    const handleDeleteContact = () => {
        //DISPATCH HERE WITH VALUE BEING UPDATED TO NULL, AND CONTACTKEY, AND EVENTID
        dispatch({ type: 'UPDATE_EVENT_CONTACT', payload: {contact: null, contactKey: contactKey, id: eventId} });
    }

    return(
        <>
            {initialValue ? (
                <div>
                    {isEditing ?
                    <>
                        <TextField value={contactInputValue || ''} onChange={(event) => {setContactInputValue(event.target.value)}}
                        onKeyDown={handleEdit} placeholder="Contact" size="small" />&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Save</Button>&nbsp;
                        <Button onClick={() => setIsEditing(false)} variant="contained" size="small" >Cancel</Button>
                    </>
                    :
                    <>
                        <span>{initialValue}</span>&nbsp;
                        <Button onClick={handleEdit} variant="contained" size="small" >Edit</Button>&nbsp;
                        <Button onClick={handleDeleteContact} variant="contained" size="small" >Delete</Button>
                    </>}
                </div>
            )
            :
            (
                <div>
                    <TextField value={addContactValue || ''} onChange={(event) => {setAddContactValue(event.target.value)}}
                        onKeyDown={handleAddContact} placeholder="Add Contact" size="small" />&nbsp;
                    <Button onClick={handleAddContact} variant="contained" size="small" >Add</Button>
                </div>
            )}
        </>
    )
}

export default EditableContact;