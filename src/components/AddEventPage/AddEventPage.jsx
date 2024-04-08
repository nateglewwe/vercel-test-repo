import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs'; //This is for the DatePicker

import Button from '@mui/material/Button';//List of MUI imports
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //This is for the DatePicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //This is for the DatePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './AddEventPage.css';

function AddEventPage(props) {

  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState('');  //Stores name of event to be added
  const [datesInput, setDatesInput] = useState(dayjs());
  const [detail1Input, setDetail1Input] = useState('');  //Stores value of feature
  const [detail2Input, setDetail2Input] = useState('');
  const [detail3Input, setDetail3Input] = useState('');
  const [detail4Input, setDetail4Input] = useState('');
  const [detail5Input, setDetail5Input] = useState('');
  const [detail6Input, setDetail6Input] = useState('');
  const [detail7Input, setDetail7Input] = useState('');
  const [detail8Input, setDetail8Input] = useState('');
  const [contact1Input, setContact1Input] = useState('');  //Stores value of contact
  const [contact2Input, setContact2Input] = useState('');

  const addEventToList = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_NEW_EVENT', payload: {
        name: nameInput,
        // dates: GET DATES INFO IN HERE SOMEHOW---------------------------------------------------
        dates: datesInput,
        detail1: detail1Input,
        detail2: detail2Input,
        detail3: detail3Input,
        detail4: detail4Input,
        detail5: detail5Input,
        detail6: detail6Input,
        detail7: detail7Input,
        detail8: detail8Input,
        contact1: contact1Input,
        contact2: contact2Input,
    }});
    // Add history.push back to gear list page? Or success alert?-----------------------------------
  }

  return (
    <div className="updateGearDOM" >
      <form onSubmit={addEventToList} >
        <h1>Add Event:</h1>
        <Grid container spacing={2} className="gearGridUpdate" >
          <Grid item xs={3}>
            <b>Name:</b><br />
            <TextField id="nameInput" placeholder="Name (Required)" value={nameInput}
              onChange={(event) => {setNameInput(event.target.value)}} size="small" required/><br /><br />
            <p className="dateText" >Date:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker label="Date (Required)" id="datesInput" value={datesInput}
                onChange={(newDatesInput) => {setDatesInput(newDatesInput)}} required />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3} >
            <b>Details:</b><br />
            <TextField id="detail1Input" placeholder="Detail 1" value={detail1Input}
                onChange={(event) => {setDetail1Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail2Input" placeholder="Detail 2" value={detail2Input}
                onChange={(event) => {setDetail2Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail3Input" placeholder="Detail 3" value={detail3Input}
                onChange={(event) => {setDetail3Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail4Input" placeholder="Detail 4" value={detail4Input}
                onChange={(event) => {setDetail4Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail5Input" placeholder="Detail 5" value={detail5Input}
                onChange={(event) => {setDetail5Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail6Input" placeholder="Detail 6" value={detail6Input}
                onChange={(event) => {setDetail6Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail7Input" placeholder="Detail 7" value={detail7Input}
                onChange={(event) => {setDetail7Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="detail8Input" placeholder="Detail 8" value={detail8Input}
                onChange={(event) => {setDetail8Input(event.target.value)}} size="small" margin="dense" /><br />
          </Grid>
          <Grid item xs={3} >
            <b>Contacts:</b><br />
            <TextField id="contact1Input" placeholder="Contact 1" value={contact1Input}
                onChange={(event) => {setContact1Input(event.target.value)}} size="small" margin="dense" /><br />
            <TextField id="contact2Input" placeholder="Contact 2" value={contact2Input}
                onChange={(event) => {setContact2Input(event.target.value)}} size="small" margin="dense" /><br />
          </Grid>
          <Grid item xs={3} >
            <Button variant="contained" type="submit">Create Event Listing</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddEventPage;
