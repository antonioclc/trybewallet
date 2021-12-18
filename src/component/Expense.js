import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, getEditedExpense } from '../actions';

class Expense extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
      valueEdited: '',
      descriptionEdited: '',
      currencyEdited: '',
      methodEdited: '',
      tagEdited: '',
      edit: false,
      currencys: [],
    };

    this.getStateFromRedux = this.getStateFromRedux.bind(this);
    this.ShowEditExpense = this.ShowEditExpense.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.getCurrencys = this.getCurrencys.bind(this);
    this.switchEditState = this.switchEditState.bind(this);
    this.clickButtonEdit = this.clickButtonEdit.bind(this);
  }

  componentDidMount() {
    this.getStateFromRedux();
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

  getStateFromRedux() {
    const { expenseData:
       { id, value, description, currency, method, tag, exchangeRates } } = this.props;
    this.setState({
      id, value, description, currency, method, tag, exchangeRates,
    });
  }

  ShowEditExpense() {
    const { currencys } = this.state;
    return (
      <div>
        <input
          data-testid="value-input"
          type="number"
          name="valueEdited"
          onChange={ this.onInputChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="descriptionEdited"
          onChange={ this.onInputChange }
        />
        <label htmlFor="currency">
          moeda
          <select
            data-testid="currency-input"
            name="currencyEdited"
            id="currency"
            onChange={ this.onInputChange }
          >
            {
              currencys.length === 0 ? null : (
                currencys.map((curren) => (
                  <option key={ curren } data-testid={ curren }>{curren}</option>))
              )
            }
          </select>
        </label>
        <select data-testid="method-input" name="methodEdited" onChange={ this.onInputChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="tagEdited" onChange={ this.onInputChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.clickButtonEdit }>Editar despesa</button>
      </div>
    );
  }

  switchEditState() {
    this.setState({ edit: true });
  }

  clickButtonEdit() {
    const { id, valueEdited, descriptionEdited, currencyEdited,
      methodEdited, tagEdited, exchangeRates } = this.state;
    const { getExpenseToEdit } = this.props;

    getExpenseToEdit({
      id,
      value: valueEdited,
      description: descriptionEdited,
      currency: currencyEdited,
      method: methodEdited,
      tag: tagEdited,
      exchangeRates,
    });
    this.setState({ edit: false });
  }

  render() {
    const { getExpenseToDeleted, expenseData:
       { id, description, tag, method, value, exchangeRates, currency } } = this.props;
    const findCurrency = Object.entries(exchangeRates).find(
      (currencyActual) => currency === currencyActual[0],
    );
    const currencyName = findCurrency[1].name.replace('/Real Brasileiro', '');
    const cambio = Number(findCurrency[1].ask).toFixed(2);
    const convertedValue = Number(findCurrency[1].ask * value).toFixed(2);
    const { edit } = this.state;
    return (
      <>
        <tr key={ id } className="table">
          <td className="table-input">{description}</td>
          <td className="table-input">{tag}</td>
          <td className="table-input">{method}</td>
          <td className="table-input">{value}</td>
          <td className="table-input">{currencyName}</td>
          <td className="table-input">{cambio}</td>
          <td className="table-input">{convertedValue}</td>
          <td className="table-input">Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ this.switchEditState }
            >
              Editar

            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => getExpenseToDeleted(id) }
            >
              Deletar

            </button>
          </td>
        </tr>
        {
          edit ? this.ShowEditExpense() : null
        }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getExpenseToDeleted: (state) => dispatch(deleteExpense(state)),
  getExpenseToEdit: (state) => dispatch(getEditedExpense(state)),
});

Expense.propTypes = PropTypes.shape({
}).isRequired;

export default connect(null, mapDispatchToProps)(Expense);
