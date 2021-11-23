import React from 'react';

class ExpenseTable extends React.Component {
  render() {
    return (
      <table>
        <td>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </td>
      </table>
    );
  }
}

export default ExpenseTable;
