import React from 'react';
import Header from '../component/Header';
import Expense from '../component/Expense';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expense />
      </>
    );
  }
}

export default Wallet;
