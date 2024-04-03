import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

function GearListPage(props) {

  const dispatch = useDispatch();
  const gear = useSelector((store) => store.gear.gearList);
  const events = useSelector((store) => store.events);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  function updateBtnClk(toolId, toolName) {
    console.log('Taking piece of gear to update page:', toolName);
    history.push(`/updategear/${toolId}`)
  }

  function deleteBtnClk(toolId, toolName) {
    console.log('Deleting piece of gear:', toolName);
    dispatch({ type: 'DELETE_GEAR', payload: toolId });
  }

  const assignToEvent = (toolId, eventId) => {
    //Dispatching event assignement for piece of gear to gear_list table in DB
    if (eventId === '') {
      dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: null}});
    } else {
      dispatch({ type: 'ASSIGN_TO_EVENT', payload: {id: toolId, eventId: eventId}});
    }
  };

  return (
    <div>
      <h1>Your Gear:</h1>
      {gear.map(tool => {
        const features = [tool.feature_1, tool.feature_2, tool.feature_3, tool.feature_4,
                          tool.feature_5, tool.feature_6, tool.feature_7, tool.feature_8];
        const notes = [tool.note_1, tool.note_2, tool.note_3, tool.note_4,
                       tool.note_5, tool.note_6, tool.note_7, tool.note_8];
          return (
            <div key={tool.id}>
              <img src={`/api/user/photo/${tool.photo}`} alt={tool.name}/>
              <h4>Name:</h4>
              <p>{tool.name}</p>
              <h4>Features:</h4>
              {features.map((feature, index) => {return(<div key={index}><span>{feature}</span></div> )})}
              <h4>Notes:</h4>
              {notes.map((note, index) => {return(<div key={index}><span>{note}</span></div> )})}<br />
              <FormControl sx={{minWidth: '220px', mr:2}}>
                <InputLabel id="assignToEventLabel" shrink>Assign To Event</InputLabel>
                {/* <FormHelperText>Assign to Event</FormHelperText> */}
                <Select
                  labelId="assignToEventLabel"
                  label="Assign To Event"
                  value={tool.event_id || ''}
                  displayEmpty
                  onChange={(event) => assignToEvent(tool.id, event.target.value)}
                >
                  <MenuItem value="" >Not Assigned</MenuItem>
                  {events.map(event => {
                    return (
                      <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={() => updateBtnClk(tool.id, tool.name)}>Update Gear</Button>&nbsp;
              <Button variant="contained" onClick={() => deleteBtnClk(tool.id, tool.name)}>Delete Gear</Button><br /><br />
            </div>
          );
        })}
    </div>
  );
}

export default GearListPage;
