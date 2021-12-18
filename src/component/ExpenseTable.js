import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Expense from './Expense';

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses } = this.props;
    return (
      expenses.map((
        expenseData,
      ) => <Expense key={ expenseData.id } expenseData={ expenseData } />)
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

ExpenseTable.propTypes = PropTypes.shape({
}).isRequired;

export default connect(mapStateToProps)(ExpenseTable);
