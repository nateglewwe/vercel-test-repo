import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEvents (action) {
    try {
        //get the events
        const eventsResponse = yield axios.get(`/api/user/events`);
        //put the events data in its reducer
        yield put({
            type: 'SET_EVENTS',
            payload: eventsResponse.data
          });
    }
    catch(err) {
        console.log('fetchEvents saga error:', err);
    }
}

function* deleteEvent (action) {
    try {
        //Send ID of event to be deleted
        yield axios.delete(`/api/user/events/${action.payload}`);

        //Call fetchEvents saga to update the DOM after deleting event
        yield put({ type: 'FETCH_EVENTS' });
    }
    catch(err) {
        console.log('deleteEvent saga error:', err);
    }
}

function* fetchEventToUpdate (action) {
    try {
        //get single event to update
        const event = yield axios.get(`/api/user/eventtoupdate/${action.payload}`)
        //put the event in the event reducer
        yield put({ type: 'SET_EVENT_TO_UPDATE', payload: event.data })
    }
    catch(err) {
        console.log('fetchEventToUpdate saga error:', err);
    }
}

function* changeEventDetail (action) {
    try {
        //Send eventID, new detail value, and detailKey/detail column number
        const changeEventDetail = yield axios.put(`/api/user/eventChangeDetail/${action.payload.id}`, action.payload);
        console.log('ALERT MESSAGE', changeEventDetail.data.alert);
        
        //Call fetchEventToUpdate saga to update the DOM after changing detail
        yield put({ type: 'FETCH_EVENT_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeEventDetail saga error:', err);
    }
}

function* changeEventContact (action) {
    try {
        //Send eventID, new contact value, and contactKey/contact column number
        const changeEventContact = yield axios.put(`/api/user/eventChangeContact/${action.payload.id}`, action.payload);
        console.log('ALERT MESSAGE', changeEventContact.data.alert);
        
        //Call fetchEventToUpdate saga to update the DOM after changing detail
        yield put({ type: 'FETCH_EVENT_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeEventDetail saga error:', err);
    }
}

function* changeEventName (action) {
    try {
        //Send ID and new name of event to have its name changed
        yield axios.put(`/api/user/eventChangeName/${action.payload.id}`, action.payload);

        //Call fetchGearToUpdate saga to update the DOM after changing name
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeEventName saga error:', err);
    }
}

function* changeEventDates (action) {
    try {
        //Send ID and new dates of event to have them changed
        yield axios.put(`/api/user/eventChangeDates/${action.payload.id}`, action.payload);

        //Call fetchGearToUpdate saga to update the DOM after changing dates
        yield put({ type: 'FETCH_GEAR_TO_UPDATE', payload: action.payload.id });
    }
    catch(err) {
        console.log('changeEventName saga error:', err);
    }
}

function* postNewEvent (action) {
    try {
        //Send all of the event data to the database for new event entry
        console.log('THIS IS ALL OF THE NEW EVENT DATA:', action.payload);
        yield axios.post(`/api/user/events`, action.payload);

        //I don't think this needs to call any other sagas or anything afterwards here?
    }
    catch(err) {
        console.log('postEvent saga error:', err);
    }
}

function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('FETCH_EVENT_TO_UPDATE', fetchEventToUpdate);
    yield takeLatest('UPDATE_EVENT_DETAIL', changeEventDetail);
    yield takeLatest('UPDATE_EVENT_CONTACT', changeEventContact);
    yield takeLatest('CHANGE_EVENT_NAME', changeEventName);
    yield takeLatest('CHANGE_EVENT_DATES', changeEventDates);
    yield takeLatest('POST_NEW_EVENT', postNewEvent);
  }
  
  export default eventsSaga;