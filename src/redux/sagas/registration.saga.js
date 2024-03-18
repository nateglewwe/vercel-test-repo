import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {

  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    const theDispatch = yield axios.post('/api/user/register', action.payload);
    //console.log('THE DISPATCH THING:', theDispatch);
    yield put ({ type: 'SET_REGISTRATION_CONFIRMATION', payload: theDispatch})

    // automatically log a user in after registration
    //yield put({ type: 'LOGIN', payload: action.payload }); TURNING OFF AUTO-LOGIN SO THAT WE GO TO REGISTRATION SUCCESS PAGE INSTEAD

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    //yield put({ type: 'SET_TO_LOGIN_MODE' }); THIS LINE DOES NOT ACTUALLY SEEMINGLY DO ANYTHING
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
