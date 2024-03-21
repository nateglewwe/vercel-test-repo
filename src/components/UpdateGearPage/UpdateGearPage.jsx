import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const gear = useSelector((store) => store.gear);
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
    dispatch({ type: 'CHANGE_GEAR_NAME', payload: {newName: nameInput, id: toolId} }) //THIS NEEDS A SAGA AND SERVER ROUTE!!!!
  }

  return (
    <div>
      {/* <h2>{heading} And this is the gear ID number: {gearId}</h2> */}
      {gear[0] && (<><p>{gear[0].photo}</p>
      <input type="button" value="Delete Photo" onClick={() => deletePhoto(gear[0].name)}/><br />
      <input id="nameInput" placeholder="Name" value={nameInput}
        onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
      <input type="button" value="Change Name" onClick={changeName}  />
      <p>{gear[0].name}</p>
      <input id="featuresInput" placeholder="Features" value="" onChange={'PUT A FUNCTION HERE?'}/>
      <input type="button" value="Add Feature" onClick={() => addFeature()}  />
      <p>{gear[0].feature_1}</p>
      <p>{gear[0].feature_2}</p>
      <p>{gear[0].feature_3}</p>
      <p>{gear[0].feature_4}</p>
      <p>{gear[0].feature_5}</p>
      <p>{gear[0].feature_6}</p>
      <p>{gear[0].feature_7}</p>
      <p>{gear[0].feature_8}</p>
      <input id="notesInput" placeholder="Notes" value="" onChange={'PUT A FUNCTION HERE?'}/>
      <input type="button" value="Add Note" onClick={() => addNote()}  />
      <p>{gear[0].note_1}</p>
      <p>{gear[0].note_2}</p>
      <p>{gear[0].note_3}</p>
      <p>{gear[0].note_4}</p>
      <p>{gear[0].note_5}</p>
      <p>{gear[0].note_6}</p>
      <p>{gear[0].note_7}</p>
      <p>{gear[0].note_8}</p>
      <input type="button" value="Finish Update" onClick={() => updateGear()}/>
      <input type="button" value="Cancel" onClick={() => cancelUpdate()}/> {/*NEEDS TO GO BACK TO GEAR LIST PAGE AND EMPTY REDUCERS/STATES THAT MIGHT HAVE BEEN FILLED DURING UPDATING*/}</>)}
    </div>
  );
}

export default UpdateGearPage;
