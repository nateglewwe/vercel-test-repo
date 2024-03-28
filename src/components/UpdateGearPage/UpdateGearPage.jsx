import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import EditableFeature from '../EditableFeature/EditableFeature';
import EditableNote from '../EditableNote/EditableNote';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const gear = useSelector((store) => store.gear.gearToUpdate);
  const [nameInput, setNameInput] = useState(gear.name);
  let [isEditing, setIsEditing] = useState(false)
  const features = [gear.feature_1, gear.feature_2, gear.feature_3, gear.feature_4,
                    gear.feature_5, gear.feature_6, gear.feature_7, gear.feature_8]
  const gearFeatures = features.map((feature, index) => <EditableFeature initialValue={feature} featureKey = {`feature_${index+1}`} key={index}/>)
  const notes = [gear.note_1, gear.note_2, gear.note_3, gear.note_4,
                 gear.note_5, gear.note_6, gear.note_7, gear.note_8]
  const gearNotes = notes.map((note, index) => <EditableNote initialValue={note} noteKey = {`note_${index+1}`} key={index}/>)
  const { toolId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR_TO_UPDATE', payload: toolId });
  }, []);

  function deletePhoto (toolName) {
    console.log('Deleting photo of single tool:', toolName);
    dispatch({ type: 'DELETE_PHOTO', payload: toolId });
  }

  const changeName = (event) => {
    if (event.key && event.key !== 'Enter'){
      return;
    }
    if (isEditing === true) {
      console.log('Changing name of gear to:', nameInput );
      dispatch({ type: 'CHANGE_GEAR_NAME', payload: {newName: nameInput, id: toolId} })
      setNameInput('')
    }
    setIsEditing(!isEditing)
  }

  return (
    <div>
      <h1>Update This Gear:</h1>
      {gear && (<>
      <p>{gear.photo}</p>
      <input type="button" value="Delete Photo" onClick={() => deletePhoto(gear.name)}/><br />
      
      <h4>Name:</h4>
      {isEditing ?
      <>
        <input id="nameInput" placeholder="Name" value={nameInput}
          onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
        <button onClick={changeName}>Save</button>&nbsp;
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </>
      :
      <>
        <span>{gear.name}</span>&nbsp;
        <button onClick={changeName}>Edit</button>
      </>}
      <div>
        <h4>Features:</h4>
        {gearFeatures}
      </div>
      <div>
        <h4>Notes:</h4>
        {gearNotes}
      </div><br />
      <input type="button" value="Back to Gear List" onClick={() => history.push(`/gearlist`)}/>
      </>)}
    </div>
  );
}

export default UpdateGearPage;
