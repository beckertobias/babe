const initialState = {
  user: { email: '', name: '', partnerEmail: '', partner: '', currency: '' },
  auth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FIRST_USER':
      return {
        ...state,
        user: { email: action.email, name: action.name },
      };
    case 'ADD_PARTNER':
      return {
        ...state,
        user: {
          partnerEmail: action.partnerEmail,
          partner: action.partner,
          currency: action.currency,
        },
      };
    case 'FIREBASE':
      return {
        ...state,
        auth: action.auth,
      };
    default:
      return state;
  }
};

export default reducer;
