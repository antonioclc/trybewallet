import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    // 👇 Multiplica o valor da despesa inputada, com a cotação da moeda no momento do clique, dando origem a um array com todas as despesas já convertidas em BRL
    const askConvertedToBRL = expenses.map(
      (expense) => expense.value * Object.entries(expense.exchangeRates).find(
        (currency) => expense.currency === currency[0],
      )[1].ask,
    );
    return (
      <header>
        <h1>Trybewallet</h1>
        <div>
          <p data-testid="email-field">{ email }</p>
          <div>
            <p>Despesa Total:</p>
            <p data-testid="total-field" className="header-total-field">
              {
                askConvertedToBRL.reduce((acc, cur) => acc + cur, 0)
              }
            </p>
          </div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses });

Header.propTypes = PropTypes.shape({
  email: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
