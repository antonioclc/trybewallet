import React from 'react';
import Header from '../component/Header';
import CreateExpense from '../component/CreateExpense';
import ExpenseTable from '../component/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <CreateExpense />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
