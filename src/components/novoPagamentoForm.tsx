'use client';

import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment, { Moment } from 'moment';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const NovoPagamentoForm: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [recorrente, setRecorrente] = useState(false);
  const [parcelasPagas, setParcelasPagas] = useState(0);
  const [totalParcelas, setTotalParcelas] = useState(0);
  const [dataPrimeiroPagamento, setDataPrimeiroPagamento] = useState<Moment | null>(moment());
  const [formVisible, setFormVisible] = useState(false);

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

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <>
       <Button type="default" onClick={toggleFormVisibility} icon={formVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}>
        {formVisible ? 'Esconder Formulário' : 'Exibir Formulário'}
      </Button>
      {formVisible && (
        <Form onFinish={handleSubmit}  labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
          <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </Form.Item>
          <Form.Item label="Valor" name="valor" rules={[{ required: true }]}>
            <InputNumber value={valor} onChange={(value) => setValor(value || 0)} />
          </Form.Item>
          <Form.Item label="Recorrente" valuePropName="checked">
            <Switch checked={recorrente} onChange={(checked) => setRecorrente(checked)} />
          </Form.Item>
          {recorrente && (
            <>
              <Form.Item label="Parcelas Pagas" name="parcelasPagas" rules={[{ required: true }]}>
                <InputNumber value={parcelasPagas} onChange={(value) => setParcelasPagas(value || 0)} />
              </Form.Item>
              <Form.Item label="Total de Parcelas" name="totalParcelas" rules={[{ required: true }]}>
                <InputNumber value={totalParcelas} onChange={(value) => setTotalParcelas(value || 0)} />
              </Form.Item>
            </>
          )}
          <Form.Item label="Data do Primeiro Pagamento" name="dataPrimeiroPagamento" rules={[{ required: true }]}>
            <DatePicker value={dataPrimeiroPagamento} onChange={(date) => setDataPrimeiroPagamento(date)} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Adicionar Pagamento</Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default NovoPagamentoForm;