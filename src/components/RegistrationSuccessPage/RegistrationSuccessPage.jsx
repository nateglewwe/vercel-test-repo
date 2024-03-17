import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function RegistrationSuccessPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <div>
        <center>
            <h2>Registeration Success!</h2>
            <h4>Account Created</h4>
                <button
                type="button"
                className="btn btn_asLink"
                onClick={() => {
                    history.push('/login');
                }}
                >
                Back to Login
                </button>
        </center>
    </div>
  );
}

export default RegistrationSuccessPage;
