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

function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
  }
  
  export default eventsSaga;