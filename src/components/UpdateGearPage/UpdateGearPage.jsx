import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import EditableFeature from '../EditableFeature/EditableFeature';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const gear = useSelector((store) => store.gear.gearToUpdate);
  const features = [gear.feature_1, gear.feature_2, gear.feature_3, gear.feature_4,
                    gear.feature_5, gear.feature_6, gear.feature_7, gear.feature_8]
  const gearFeatures = features.map((feature, index) => <EditableFeature initialValue={feature} key={index}/>)
  
  
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
      {gear && (<>
      <p>{gear.photo}</p>
      <input type="button" value="Delete Photo" onClick={() => deletePhoto(gear.name)}/><br />
      <input id="nameInput" placeholder="Name" value={nameInput}
        onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
      <input type="button" value="Change Name" onClick={changeName}  />
      <h4>Name:</h4>
      <p>{gear.name}</p>
      <div>
        <h4>Features:</h4>
        {features.map((feature, index) => {
          return(
            <div key={index}>
              {feature && (<>
                <span >{feature}</span>                
                <input type="button" value="Edit" onClick={() => editFeature()}  />
                <input type="button" value="X" onClick={() => deleteFeature()}  />
              </>)}
            </div>
          )
        })}
        {gearFeatures}
      </div>
      <input id="notesInput" placeholder="Notes" //onChange={'PUT A FUNCTION HERE?'}
      />
      <input type="button" value="Add Note" onClick={() => addNote()}  />
      <div>
        {notes.map((note, index) => {
          return(
            <div key={index}>
              {note && (<>
                <span >{note}</span>
                <input type="button" value="Edit" onClick={() => editNote()}  />
                <input type="button" value="X" onClick={() => deleteNote()}  />
              </>)}
            </div>
          )
        })}
      </div>
      <input type="button" value="Finish Update" onClick={() => updateGear()}/>
      <input type="button" value="Cancel" onClick={() => cancelUpdate()}/> {/*NEEDS TO GO BACK TO GEAR LIST PAGE AND EMPTY REDUCERS/STATES THAT MIGHT HAVE BEEN FILLED DURING UPDATING*/}
      </>)}
    </div>
  );
}

export default UpdateGearPage;
