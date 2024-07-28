import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { descricao, valor, recorrente, parcelasPagas, totalParcelas, dataPrimeiroPagamento } = req.body;

    try {
      const novoPagamento = await prisma.pagamento.create({
        data: {
          descricao,
          valor,
          recorrente,
          parcelasPagas,
          totalParcelas,
          dataPrimeiroPagamento: new Date(dataPrimeiroPagamento),
        },
      });
      res.status(201).json(novoPagamento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
