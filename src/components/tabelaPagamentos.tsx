'use client';

import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface Pagamento {
  id: number;
  descricao: string;
  valor: number;
  recorrente: boolean;
  parcelasPagas: number;
  totalParcelas: number;
  dataPrimeiroPagamento: string; // ISO string
}

const TabelaPagamentos: React.FC = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  useEffect(() => {
    const fetchPagamentos = async () => {
      try {
        const response = await axios.get('/api/pagamentos/futuros');
        setPagamentos(response.data);
        console.log("PAGAMENTOS", response.data)
      } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
      }
    };

    fetchPagamentos();
  }, []);

  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number) => `R$ ${valor.toFixed(2)}`,
    },
    {
      title: 'Recorrente',
      dataIndex: 'recorrente',
      key: 'recorrente',
      render: (recorrente: boolean) => (recorrente ? 'Sim' : 'Não'),
    },
    {
      title: 'Parcelas Pagas',
      dataIndex: 'parcelasPagas',
      key: 'parcelasPagas',
    },
    {
      title: 'Total de Parcelas',
      dataIndex: 'totalParcelas',
      key: 'totalParcelas',
    },
    {
      title: 'Data do Primeiro Pagamento',
      dataIndex: 'dataPrimeiroPagamento',
      key: 'dataPrimeiroPagamento',
      render: (data: string) => new Date(data).toLocaleDateString(),
    },
  ];

  return (
    <Table
      dataSource={pagamentos}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TabelaPagamentos;
