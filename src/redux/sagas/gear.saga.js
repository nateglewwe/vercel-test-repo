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

function* fetchGearToUpdate (action) {
    try {
        //get single piece of gear to update
        const singleGear = yield axios.get(`/api/user/geartoupdate/${action.payload}`)
        //put the single gear in the gear reducer
        yield put({ type: 'SET_GEAR', payload: singleGear.data })
    }
    catch(err) {
        console.log('fetchGearToUpdate saga error:', err);
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

function* deletePhoto (action) {
    try {
        //Send ID of gear to have its photo deleted
        yield axios.put(`/api/user/gearPhotoDelete/${action.payload}`);

        //Call fetchGearToUpdate saga to update the DOM after deleting photo
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload });
    }
    catch(err) {
        console.log('deleteGear saga error:', err);
    }
}

function* changeGearName (action) {
    try {
        //Send ID and new name of gear to have its name changed
        console.log('THE SAGA PAYLOAD:', action.payload);
        yield axios.put(`/api/user/gearChangeName/${action.payload.id}`, action.payload);

        //Call fetchGearToUpdate saga to update the DOM after changing name DOES THIS ACTUALLY WORK?????
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeGearName saga error:', err);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear);
    yield takeLatest('DELETE_GEAR', deleteGear);
    yield takeLatest('FETCH_GEAR_TO_UPDATE', fetchGearToUpdate);
    yield takeLatest('DELETE_PHOTO', deletePhoto);
    yield takeLatest('CHANGE_GEAR_NAME', changeGearName);
  }
  
  export default gearSaga;