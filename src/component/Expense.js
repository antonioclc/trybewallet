import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataExpense, newExpense } from '../actions';

class Expense extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencys: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.clickBtnAdd = this.clickBtnAdd.bind(this);
    this.clickBtnEdit = this.clickBtnEdit.bind(this);
    this.getCurrencys = this.getCurrencys.bind(this);
  }

  componentDidMount() {
    this.getCurrencys();
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  getCurrencys() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((quotes) => {
        const currencys = Object.keys(quotes);
        currencys.splice(1, 1);
        this.setState({ currencys });
      });
  }

  async clickBtnAdd() {
    const { expenses, sendExpense, edit, position, sendNewExpense } = this.props;
    const { value, description, currency, method, tag, currencys } = this.state;
    console.log(currencys);
    const addExpense = { id: expenses.length, value, description, currency, method, tag };
    if (edit) {
      const newExpenses = [];
      const filterExpense = newExpenses.concat(expenses).filter(
        (expense) => expense.id !== position,
      );
      const filteredExpense = newExpenses.concat(expenses).filter(
        (expense) => expense.id === position,
      );
      const addExpenseEdited = { id: position,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: filteredExpense[0].exchangeRates };
      const addNewExpense = filterExpense.concat(
        addExpenseEdited,
      ).sort((a, b) => a.id - b.id);
      sendNewExpense(addNewExpense);
    } else {
      sendExpense(addExpense);
    }
    document.getElementById('expense-form').reset();
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  clickBtnEdit() {
    const { changeEdit } = this.props;
    changeEdit();
  }

  render() {
    const currencys = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { edit } = this.props;
    return (
      <form id="expense-form" className={ edit ? 'edit' : 'add' }>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          onChange={ this.onInputChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          onChange={ this.onInputChange }
        />
        <label htmlFor="currency">
          moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ this.onInputChange }
          >
            { currencys.map((currency) => (
              <option value={ currency } key={ currency }>{currency}</option>))}
          </select>
        </label>
        <select data-testid="method-input" name="method" onChange={ this.onInputChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="tag" onChange={ this.onInputChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { edit
          ? <button type="button" onClick={ this.clickBtnAdd }>Editar despesa</button>
          : <button type="button" onClick={ this.clickBtnAdd }>Adicionar despesa</button>}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (state) => dispatch(getDataExpense(state)),
  sendNewExpense: (state) => dispatch(newExpense(state)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
  position: state.wallet.position,
  currencies: state.wallet.currencies });

Expense.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
