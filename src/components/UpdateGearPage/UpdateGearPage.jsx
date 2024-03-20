import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('This is the Update Gear Page!');
  const history = useHistory();
  const gear = useSelector((store) => store.gear);
  const gearId = history.location.state;

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR_TO_UPDATE', payload: gearId });
  }, []);
  return (
    <div>
      <h2>{heading} And this is the gear ID number: {gearId}</h2>
      <h1>{gear[0].name}</h1>
    </div>
  );
}

export default UpdateGearPage;
