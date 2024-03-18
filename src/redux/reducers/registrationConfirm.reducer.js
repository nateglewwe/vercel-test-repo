const registrationConfirmation = (state = {}, action) => {
    if (action.type === 'SET_REGISTRATION CONFIRMATION') {
        const newState = action.payload.status;
        console.log('THIS SHOULD BE 201 HOPEFULLY:', newState);
        return newState;
      }
      return state;
}

export default registrationConfirmation;