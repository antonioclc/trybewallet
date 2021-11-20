import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.loginButton = this.loginButton.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.verifyButton());
  }

  verifyButton() {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const minimumLoginSize = 6;
    if (password.length >= minimumLoginSize && emailRegex.test(email)) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  loginButton() {
    const { history, sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('./carteira');
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="email">
            Insira seu e-mail:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.onInputChange }
              required
              titel="asdas"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Insira sua senha:
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <button
          type="button"
          name="button"
          disabled={ buttonDisabled }
          onClick={ this.loginButton }
        >
          Entrar

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (state) => dispatch(getEmail(state)),
});

Login.propTypes = PropTypes.shape({
  history: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(Login);
