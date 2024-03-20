import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGear (action) {
    try {
        //get the gear
        const gearResponse = yield axios.get(`/api/user/gear`);
        //put the gear data in its reducer
        yield put({ type: 'SET_GEAR', payload: gearResponse.data });
    }
    catch(err) {
        console.log('fetchGear saga error:', err);
    }
}

function* deleteGear (action) {
    try {
        //Send ID of gear to be deleted
        yield axios.delete(`/api/user/gear/${action.payload}`);

        //Call fetchGear saga to update the DOM after deleting gear
        yield put({ type: 'FETCH_GEAR' });
    }
    catch(err) {
        console.log('deleteGear saga error:', err);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear);
    yield takeLatest('DELETE_GEAR', deleteGear);
  }
  
  export default gearSaga;