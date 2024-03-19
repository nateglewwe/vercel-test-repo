const gear = (state = [], action) => {
    switch (action.type) {
      case 'SET_GEAR':
        return action.payload;
      default:
        return state;
    }
  }

  export default gear;