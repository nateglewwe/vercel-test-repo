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

function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
  }
  
  export default eventsSaga;