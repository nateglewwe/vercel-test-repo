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

function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('FETCH_EVENT_TO_UPDATE', fetchEventToUpdate);
    yield takeLatest('UPDATE_EVENT_DETAIL', changeEventDetail);
    yield takeLatest('UPDATE_EVENT_CONTACT', changeEventContact);
  }
  
  export default eventsSaga;