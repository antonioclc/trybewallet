import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
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
          {
            expenses.map((expense) => {
              const { id, description, tag, method, value, currency } = expense;
              const findCurrency = Object.entries(expense.exchangeRates).find(
                (currencyActual) => expense.currency === currencyActual[0],
              );
              const currencyName = findCurrency[1].name.replace('/Real Brasileiro', '');
              return (
                <tr key={ id } className="table">
                  <td className="table-input">{description}</td>
                  <td className="table-input">{tag}</td>
                  <td className="table-input">{method}</td>
                  <td className="table-input">{value}</td>
                  <td className="table-input">{currencyName}</td>
                  <td className="table-input">{Number(findCurrency[1].ask).toFixed(2)}</td>
                  <td className="table-input">{Number(findCurrency[1].ask * value).toFixed(2)}</td>
                  <td className="table-input">Real</td>
                  <td className="table-input">Editar/Excluir</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

ExpenseTable.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps)(ExpenseTable);
