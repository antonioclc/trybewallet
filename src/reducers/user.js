// Esse reducer será responsável por tratar as informações da pessoa usuária

import { GET_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function userEmail(state = initialState, action) {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.payload,

    };
  default:
    return state;
  }
}

export default userEmail;
