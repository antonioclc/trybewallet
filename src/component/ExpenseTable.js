import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses, getExpenseToDeleted } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, value } = expense;
        const findCurrency = Object.entries(expense.exchangeRates).find(
          (currencyActual) => expense.currency === currencyActual[0],
        );
        const currencyName = findCurrency[1].name.replace('/Real Brasileiro', '');
        const cambio = Number(findCurrency[1].ask).toFixed(2);
        const convertedValue = Number(findCurrency[1].ask * value).toFixed(2);
        return (
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
                data-testid="delete-btn"
                onClick={ () => getExpenseToDeleted(id) }
              >
                Deletar

              </button>

            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="table">
            <th className="table-input">Descrição</th>
            <th className="table-input">Tag</th>
            <th className="table-input">Método de pagamento</th>
            <th className="table-input">Valor</th>
            <th className="table-input">Moeda</th>
            <th className="table-input">Câmbio utilizado</th>
            <th className="table-input">Valor convertido</th>
            <th className="table-input">Moeda de conversão</th>
            <th className="table-input">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderExpenses()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  getExpenseToDeleted: (state) => dispatch(deleteExpense(state)),
});

ExpenseTable.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
