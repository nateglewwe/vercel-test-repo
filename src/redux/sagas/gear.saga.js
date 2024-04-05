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
        yield put({ type: 'SET_GEAR_TO_UPDATE', payload: singleGear.data })
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

function* deletePhoto (action) { // CURRENTLY THIS ONLY DELETES THE PHOTO FROM THE DATABASE, NOT AWS S3 BUCKET, NEED TO CHANGE?
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
        yield axios.put(`/api/user/gearChangeName/${action.payload.id}`, action.payload);

        //Call fetchGearToUpdate saga to update the DOM after changing name
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeGearName saga error:', err);
    }
}

function* changeGearFeature (action) {
    try {
        //Send toolID, new feature value, and featureKey/feature column number
        const changeGearFeature = yield axios.put(`/api/user/gearChangeFeature/${action.payload.id}`, action.payload);
        console.log('ALERT MESSAGE', changeGearFeature.data.alert);
        
        //Call fetchGearToUpdate saga to update the DOM after changing name
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeGearFeature saga error:', err);
    }
}

function* changeGearNote (action) {
    try {
        //Send toolID, new note value, and noteKey/note column number
        console.log('THIS IS THE NOTE PAYLOAD:', action.payload);
        const changeGearNote = yield axios.put(`/api/user/gearChangeNote/${action.payload.id}`, action.payload);
        console.log('ALERT MESSAGE', changeGearNote.data.alert);

        //Call fetchGearToUpdate saga to update the DOM after changing name
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeGearNote saga error:', err);
    }
}

function* assignToEvent (action) {
    try {
        //Send toolID and eventID
        console.log('THIS IS THE ASSIGNEVENT PAYLOAD:', action.payload);
        yield axios.put(`/api/user/gearAssignEvent/${action.payload.id}`, action.payload);

        //Call fetchGear saga to update the DOM after changing event
        yield put({ type: 'FETCH_GEAR' });

    }
    catch(err) {
        console.log('assignToEvent saga error:', err);
    }
}

function* postNewGear (action) {
    try {
        //First send photo to store in S3 bucket
        console.log('ATTEMPTING TO SEND NEWGEARPHOTO TO S3 BUCKET');
        yield axios.post(`/api/user/newgearphoto?photoName=${action.payload.fileName}`, action.payload.formData)
        
        
        //Then send all of the gear data to the database for new gear entry
        console.log('THIS IS ALL OF THE NEW GEAR DATA:', action.payload.dataForDB);
        yield axios.post(`/api/user/gear`, action.payload.dataForDB);

        //I don't think this needs to call any other sagas or anything afterwards here?
    }
    catch(err) {
        console.log('postGear saga error:', err);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear);
    yield takeLatest('DELETE_GEAR', deleteGear);
    yield takeLatest('FETCH_GEAR_TO_UPDATE', fetchGearToUpdate);
    yield takeLatest('DELETE_PHOTO', deletePhoto);
    yield takeLatest('CHANGE_GEAR_NAME', changeGearName);
    yield takeLatest('UPDATE_GEAR_FEATURE', changeGearFeature);
    yield takeLatest('UPDATE_GEAR_NOTE', changeGearNote);
    yield takeLatest('ASSIGN_TO_EVENT', assignToEvent);
    yield takeLatest('POST_NEW_GEAR', postNewGear);
  }
  
  export default gearSaga;