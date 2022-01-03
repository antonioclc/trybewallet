import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses, getExpenseToDeleted, changeEdit } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, value, exchangeRates, currency } = expense;
        const findCurrency = Object.entries(exchangeRates).find(
          (currencyActual) => currency === currencyActual[0],
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
                data-testid="edit-btn"
                onClick={ () => changeEdit(id) }
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
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="tablethead">
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
  expenses: state.wallet.expenses,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenseToDeleted: (state) => dispatch(deleteExpense(state)),
  changeEdit: (state) => dispatch(editExpense(state)),
});

ExpenseTable.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
