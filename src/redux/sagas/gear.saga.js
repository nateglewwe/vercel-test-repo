import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGear () {
    try {
        //get the gear
        const gearResponse = yield axios.get('/api/gear'); //FINISH THE OTHER SIDE OF THIS AXIOS CALL ON SERVER
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