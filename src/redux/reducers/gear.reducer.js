import { combineReducers } from 'redux';

const gearList = (state = [], action) => {
    switch (action.type) {
      case 'SET_GEAR':
        return action.payload;
      default:
        return state;
    }
}

const gearToUpdate = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GEAR_TO_UPDATE':
      return action.payload;
    default:
      return state;
  }
}


  export default combineReducers({
    gearList,
    gearToUpdate,
  });