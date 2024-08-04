'use client';

import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Checkbox, DatePicker } from 'antd';
import axios from 'axios';
import moment, { Moment } from 'moment';

const NovoPagamentoForm: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [recorrente, setRecorrente] = useState(false);
  const [parcelasPagas, setParcelasPagas] = useState(0);
  const [totalParcelas, setTotalParcelas] = useState(0);
  const [dataPrimeiroPagamento, setDataPrimeiroPagamento] = useState<Moment | null>(moment());

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/pagamentos/create', {
        descricao,
        valor,
        recorrente,
        parcelasPagas,
        totalParcelas,
        dataPrimeiroPagamento: dataPrimeiroPagamento ? dataPrimeiroPagamento.toISOString() : null,
      });
      console.log('Pagamento adicionado:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar pagamento:', error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
        <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </Form.Item>
      <Form.Item label="Valor" name="valor" rules={[{ required: true }]}>
        <InputNumber value={valor} onChange={(value) => setValor(value || 0)} />
      </Form.Item>
      <Form.Item label="Recorrente" name="recorrente">
        <Checkbox checked={recorrente} onChange={(e) => setRecorrente(e.target.checked)} />
      </Form.Item>
      <Form.Item label="Parcelas Pagas" name="parcelasPagas" rules={[{ required: true }]}>
        <InputNumber value={parcelasPagas} onChange={(value) => setParcelasPagas(value || 0)} />
      </Form.Item>
      <Form.Item label="Total de Parcelas" name="totalParcelas" rules={[{ required: true }]}>
        <InputNumber value={totalParcelas} onChange={(value) => setTotalParcelas(value || 0)} />
      </Form.Item>
      <Form.Item label="Data do Primeiro Pagamento" name="dataPrimeiroPagamento" rules={[{ required: true }]}>
        <DatePicker value={dataPrimeiroPagamento} onChange={(date) => setDataPrimeiroPagamento(date)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Adicionar Pagamento</Button>
      </Form.Item>
    </Form>
  );
};

export default NovoPagamentoForm;
