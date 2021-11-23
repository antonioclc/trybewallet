// Coloque aqui suas actions

export const GET_EMAIL = 'GET_EMAIL';

export const GET_EXPENSE = 'GET_EXPENSE';

export const RECEIVE_QUOTES = 'RECEIVE_QUOTES';

export const getEmail = (payload) => ({ type: GET_EMAIL, payload });

export const getExpense = (payload) => ({ type: GET_EXPENSE, payload });

export function getDataExpense(data) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((quotes) => dispatch(getExpense({ ...data, exchangeRates: quotes })));
  };
}
