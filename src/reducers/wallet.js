// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { GET_EXPENSE, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
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
  default:
    return state;
  }
}

export default userExpense;
