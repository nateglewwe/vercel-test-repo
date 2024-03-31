import React, { useState } from 'react';

function FeatureInput () {

    const [featureInput, setFeatureInput] = useState('');  //Stores value of feature

    return(
    <>
        <input id="featureInput" placeholder="Feature" value={featureInput}
          onChange={(event) => {setFeatureInput(event.target.value)}} />
    </>
    )
}

export default FeatureInput;