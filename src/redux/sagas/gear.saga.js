import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGear (action) {
    try {
        //get the gear
        const gearResponse = yield axios.get(`/api/user/gear/${action.payload}`);
        //put the gear data in its reducer
        yield put({
            type: 'SET_GEAR',
            payload: gearResponse.data
          });
    }
    catch(err) {
        console.log('fetchGear saga error:', err);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear);
  }
  
  export default gearSaga;