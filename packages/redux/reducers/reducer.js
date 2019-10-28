const initialState = {
  token: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
