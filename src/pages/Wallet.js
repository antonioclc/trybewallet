import React from 'react';
import Header from '../component/Header';
import Expense from '../component/Expense';
import ExpenseTable from '../component/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expense />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
