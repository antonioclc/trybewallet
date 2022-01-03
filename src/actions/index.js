// Coloque aqui suas actions

export const GET_EMAIL = 'GET_EMAIL';

export const GET_EXPENSE = 'GET_EXPENSE';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const NEW_EXPENSE = 'NEW_EXPENSE';

export const getEmail = (payload) => ({ type: GET_EMAIL, payload });

export const getExpense = (payload) => ({ type: GET_EXPENSE, payload });

export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });

export const newExpense = (payload) => ({ type: NEW_EXPENSE, payload });

export function getDataExpense(data) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((quotes) => dispatch(getExpense({ ...data, exchangeRates: quotes })));
  };
}
