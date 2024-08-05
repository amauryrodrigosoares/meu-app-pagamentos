'use client';
import React, { useState, useEffect } from 'react';
import TabelaPagamentos from './tabelaPagamentos';

interface PagamentoFuturo {
  descricao: string;
  valor: number;
  data: string; // Manter como string
}

const FuturosPagamentos: React.FC = () => {
  const [futurosPagamentos, setFuturosPagamentos] = useState<PagamentoFuturo[]>([]);

  // useEffect(() => {
  //   fetch('/api/pagamentos/futuros')
  //     .then(res => res.json())
  //     .then((data: PagamentoFuturo[]) => setFuturosPagamentos(data))
  //     .catch(error => console.error('Erro ao buscar pagamentos futuros:', error));
  // }, []);

  return (
    <div>
      <h1>Pagamentos Futuros</h1>
      <TabelaPagamentos />
    </div>
  );
}

export default FuturosPagamentos;
