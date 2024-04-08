import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs'; //This is for the DatePicker

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //This is for the DatePicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //This is for the DatePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import EditableDetail from '../EditableDetail/EditableDetail';
import EditableContact from '../EditableContact/EditableContact';

function UpdateEventPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((store) => store.events.eventToUpdate);
  const [nameInput, setNameInput] = useState(event.name);
  const [datesInput, setDatesInput] = useState(dayjs());
  let [isEditingName, setIsEditingName] = useState(false);
  let [isEditingDates, setIsEditingDates] = useState(false);
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
    if (isEditingName === true) {
      console.log('Changing name of event to:', nameInput );
      dispatch({ type: 'CHANGE_EVENT_NAME', payload: {newName: nameInput, id: eventId} })
      setNameInput('')
    }
    setIsEditingName(!isEditingName)
  }

  const changeDates = () => {
    console.log('Changing dates of event to this object:', datesInput );
    dispatch({ type: 'CHANGE_EVENT_DATES', payload: {newDates: datesInput, id: eventId}})
    // setDatesInput(dayjs()) DO I NEED THIS LINE OF CODE?
    setIsEditingDates(!isEditingDates)
  }

  const assignGear = () => {
    //FINISH THIS!------------------------------------------------
  }



  return (
    <div className="updateGearDOM" >
      <h1>Update This Event:</h1>
      {event && (<>
        <Grid container spacing={2} className="gearGridUpdate" >
          <Grid item xs={3}>
          <b>Name: </b>
          {isEditingName ?
          <>
            <TextField id="nameInput" placeholder="Name" value={nameInput}
              onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName} size="small" />
            <Button variant="contained" size="small" onClick={changeName}>Save</Button>&nbsp;
            <Button variant="contained" size="small" onClick={() => setIsEditingName(false)}>Cancel</Button>
          </>
          :
          <>
            <span>{event.name}</span>&nbsp;
            <Button variant="contained" size="small" onClick={changeName}>Edit</Button>
          </>}<br /><br />

          <p className="dateText" >Date:</p>
          {isEditingDates ?
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker label="Date (Required)" id="datesInput" value={datesInput}
                onChange={(newDatesInput) => {setDatesInput(newDatesInput)}} required />
            </LocalizationProvider>
            <Button variant="contained" size="small" onClick={changeDates}>Save</Button>&nbsp;
            <Button variant="contained" size="small" onClick={() => setIsEditingDates(false)}>Cancel</Button>
          </>
          :
          <>
            <span>{event.dates}</span>&nbsp;
            <Button variant="contained" size="small" onClick={changeDates}>Edit</Button>
          </>}
          </Grid>
          <Grid item xs={4} >
            <b>Details:</b>
            {eventDetails}
          </Grid>
          <Grid item xs={4} >
            <b>Contacts:</b>
            {eventContacts}
          </Grid>
          <Grid item xs={1}>
            <div style={{marginRight: 16}}>
              <Button variant="contained" size="small" onClick={() => history.push(`/eventlist`)}>Back to Event List</Button>
            </div>
          </Grid>
        </Grid>
      </>)}
    </div>
  );
}

export default UpdateEventPage;
