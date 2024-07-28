'use client';
import React, { useState, useEffect } from 'react';

interface PagamentoFuturo {
  descricao: string;
  valor: number;
  data: string; // Manter como string
}

const FuturosPagamentos: React.FC = () => {
  const [futurosPagamentos, setFuturosPagamentos] = useState<PagamentoFuturo[]>([]);

  useEffect(() => {
    fetch('/api/pagamentos/futuros')
      .then(res => res.json())
      .then((data: PagamentoFuturo[]) => setFuturosPagamentos(data)) // Tipo dos dados explícito
      .catch(error => console.error('Erro ao buscar pagamentos futuros:', error));
  }, []);

  return (
    <div>
      <h1>Pagamentos Futuros</h1>
      <ul>
        {futurosPagamentos.map((pagamento, index) => (
          <li key={index}>
            {pagamento.descricao}: {pagamento.valor} - {new Date(pagamento.data).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FuturosPagamentos;
