import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataExpense } from '../actions';

class Expense extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencys: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.clickButtonAdd = this.clickButtonAdd.bind(this);
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
      .then((quotes) => this.setState({ currencys: Object.keys(quotes) }));
  }

  clickButtonAdd() {
    const { expenses, sendExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = { id: expenses.length, value, description, currency, method, tag };
    sendExpense(expense);
    document.getElementById('expense-form').reset();
  }

  render() {
    const { currencys } = this.state;
    return (
      <form id="expense-form">
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
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.onInputChange }
        >
          {
            currencys.length === 0 ? null : (
              currencys.map((curren) => (
                <option key={ curren } value={ curren }>{curren}</option>))
            )
          }
        </select>
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
        <button type="button" onClick={ this.clickButtonAdd }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (state) => dispatch(getDataExpense(state)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies });

Expense.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
