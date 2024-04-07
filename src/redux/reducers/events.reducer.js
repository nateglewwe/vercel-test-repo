import { combineReducers } from 'redux';

const eventList = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENTS':
        return action.payload;
      default:
        return state;
    }
}

const eventToUpdate = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EVENT_TO_UPDATE':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    eventList,
    eventToUpdate,
  });