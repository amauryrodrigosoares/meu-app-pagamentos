import React from 'react';
import FuturosPagamentos from '../components/futurosPagamentos';
import NovoPagamentoForm from '../components/novoPagamentoForm';

const Home: React.FC = () => {
  return (
    <div style={{width: '80%', margin: 'auto', paddingTop: '80px'}}>
      <h1>Bem-vindo ao Gerenciador de Pagamentos</h1>
      <NovoPagamentoForm />
      <FuturosPagamentos />
    </div>
  );
}

export default Home;
