import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function GearListPage(props) {

  const dispatch = useDispatch();
  const gear = useSelector((store) => store.gear);
  const [heading, setHeading] = useState('This is the Gear List Page!'); //GET RID OF THIS PLACEHOLDER LATER

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default GearListPage;
