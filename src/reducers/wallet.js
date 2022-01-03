// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { GET_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, NEW_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  edit: false,
  position: 0,
};

function userExpense(state = initialState, action) {
  switch (action.type) {
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: !state.edit,
      position: action.payload };
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: action.payload };
  default:
    return state;
  }
}

export default userExpense;
