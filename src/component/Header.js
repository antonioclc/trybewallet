import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <div>
          <p data-testid="email-field">{ email }</p>
          <div>
            <p>Despesa Total:</p>
            <p data-testid="total-field">0</p>
          </div>
          <p data-testid="header-currency-field">BRL</p>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email });

Header.propTypes = PropTypes.shape({
  email: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
