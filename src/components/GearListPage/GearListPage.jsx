import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

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
          return (
            <div key={tool.id}>
              <p>{tool.photo}</p>
              <h4>Name:</h4>
              <p>{tool.name}</p>
              <h4>Features:</h4>
              <span>{tool.feature_1}</span><br />
              <span>{tool.feature_2}</span><br />
              <span>{tool.feature_3}</span><br />
              <span>{tool.feature_4}</span><br />
              <span>{tool.feature_5}</span><br />
              <span>{tool.feature_6}</span><br />
              <span>{tool.feature_7}</span><br />
              <span>{tool.feature_8}</span><br />
              <h4>Notes:</h4>
              <span>{tool.note_1}</span><br />
              <span>{tool.note_2}</span><br />
              <span>{tool.note_3}</span><br />
              <span>{tool.note_4}</span><br />
              <span>{tool.note_5}</span><br />
              <span>{tool.note_6}</span><br />
              <span>{tool.note_7}</span><br />
              <span>{tool.note_8}</span><br />
              <select name="" id="" value={tool.event_id || ''} onChange={(event) => assignToEvent(tool.id, event.target.value)}>
                <option value=''>Assign to event</option>
                {events.map(event => {
                  return (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  )
                })}
              </select>
              <input type="button" value="Update Gear" onClick={() => updateBtnClk(tool.id, tool.name)}/>
              <input type="button" value="Delete Gear" onClick={() => deleteBtnClk(tool.id, tool.name)}/>
            </div>
          );
        })}
    </div>
  );
}

export default GearListPage;
