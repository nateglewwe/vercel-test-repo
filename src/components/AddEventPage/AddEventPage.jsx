import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Button from '@mui/material/Button';//Listo f MUI imports
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function AddEventPage(props) {

  const [heading, setHeading] = useState('This is the Add Event Page!');
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState('');  //Stores name of event to be added
  //ADD ANOTHER USESTATE HERE FOR DATES? OR HOWEVER DATES ARE HANDLED?------------------------------------
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
    dispatch({ type: 'POST_NEW_GEAR', payload: {
        name: nameInput,
        // dates: GET DATES INFO IN HERE SOMEHOW---------------------------------------------------
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
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AddEventPage;
