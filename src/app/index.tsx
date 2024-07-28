import React from 'react';
import FuturosPagamentos from './components/futurosPagamentos';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo ao Gerenciador de Pagamentos</h1>
      <FuturosPagamentos />
    </div>
  );
}

export default Home;
