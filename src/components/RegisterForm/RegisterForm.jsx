import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const registrationConfirmation = useSelector((store) => store.registrationConfirmation)
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });

    if (registrationConfirmation === 201) {
    history.push('/registrationsuccess');
    dispatch({type: 'SET_REGISTRATION_CONFIRMATION', payload: {status: {}}})
    } //DO I NEED TO MAKE THIS INTO A TRY/CATCH BLOCK ASYNC AWAIT FUNCTION FOR THIS IF STATEMENT TO WORK?
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
