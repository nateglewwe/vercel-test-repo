import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const gear = useSelector((store) => store.gear.gearToUpdate);
  const features = [gear.feature_1, gear.feature_2, gear.feature_3, gear.feature_4,
                    gear.feature_5, gear.feature_6, gear.feature_7, gear.feature_8]
  const notes = [gear.note_1, gear.note_2, gear.note_3, gear.note_4,
                 gear.note_5, gear.note_6, gear.note_7, gear.note_8,]
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
    console.log('Changing name of gear to:', nameInput );
    dispatch({ type: 'CHANGE_GEAR_NAME', payload: {newName: nameInput, id: toolId} })
    setNameInput('')
  }

  return (
    <div>
      {gear && (<><p>{gear.photo}</p>
      <input type="button" value="Delete Photo" onClick={() => deletePhoto(gear.name)}/><br />
      <input id="nameInput" placeholder="Name" value={nameInput}
        onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
      <input type="button" value="Change Name" onClick={changeName}  />
      <p>{gear.name}</p>
      <input id="featuresInput" placeholder="Features" onChange={'PUT A FUNCTION HERE?'}/>
      <input type="button" value="Add Feature" onClick={() => addFeature()}  />
      <div>
        {features.map((feature, index) => {
          return(
            <p key={index}>{feature}</p>
          )
        })}
      </div>
      <input id="notesInput" placeholder="Notes" onChange={'PUT A FUNCTION HERE?'}/>
      <input type="button" value="Add Note" onClick={() => addNote()}  />
      <div>
        {notes.map((note, index) => {
          return(
            <p key={index}>{note}</p>
          )
        })}
      </div>
      <input type="button" value="Finish Update" onClick={() => updateGear()}/>
      <input type="button" value="Cancel" onClick={() => cancelUpdate()}/> {/*NEEDS TO GO BACK TO GEAR LIST PAGE AND EMPTY REDUCERS/STATES THAT MIGHT HAVE BEEN FILLED DURING UPDATING*/}</>)}
    </div>
  );
}

export default UpdateGearPage;
