const user = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FIRST_USER':
      return {
        ...state,
        email: action.email,
        name: action.name,
      };
    case 'ADD_PARTNER':
      return {
        ...state,
        partner: action.partner,
        partnerEmail: action.partnerEmail,
        currency: action.currency,
      };
    default:
      return state;
  }
};

export default user;
