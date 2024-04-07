import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import EditableDetail from '../EditableDetail/EditableDetail';
import EditableContact from '../EditableContact/EditableContact';

function UpdateEventPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((store) => store.events.eventToUpdate);
  const [nameInput, setNameInput] = useState(event.name);
  //ADD ANOTHER USESTATE HERE FOR DATES? OR HOWEVER DATES ARE HANDLED?
  let [isEditing, setIsEditing] = useState(false);
  const details = [event.detail_1, event.detail_2, event.detail_3, event.detail_4,
                   event.detail_5, event.detail_6, event.detail_7, event.detail_8]
  const eventDetails = details.map((detail, index) => <EditableDetail initialValue={detail} detailKey = {`detail_${index+1}`} key={index}/>)
  const contacts = [event.contact_1, event.contact_2]
  const eventContacts = contacts.map((contact, index) => <EditableContact initialValue={contact} contactKey = {`contact_${index+1}`} key={index}/>)
  const { eventId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT_TO_UPDATE', payload: eventId });
  }, []);

  const changeName = (event) => {
    if (event.key && event.key !== 'Enter'){
      return;
    }
    if (isEditing === true) {
      console.log('Changing name of event to:', nameInput );
      dispatch({ type: 'CHANGE_EVENT_NAME', payload: {newName: nameInput, id: eventId} })
      setNameInput('')
    }
    setIsEditing(!isEditing)
  }

  const changeDates = () => {
    //FINISH THIS!------------------------------------------------
  }

  const assignGear = () => {
    //FINISH THIS!------------------------------------------------
  }



  return (
    <div>
      <h1>Update This Event:</h1>
      {event && (<>
        <Grid container spacing={2} className="gearGridUpdate" >
          <Grid item xs={3}>

            
          </Grid>

        
        
        
        </Grid>
      </>)}
    </div>
  );
}

export default UpdateEventPage;
