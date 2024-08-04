import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PagamentoFuturo {
  descricao: string;
  valor: number;
  data: string; // Mantido como string para JSON
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const pagamentos = await prisma.pagamento.findMany();
      const futurosPagamentos: PagamentoFuturo[] = [];

      pagamentos.forEach(pagamento => {
        const parcelasRestantes = pagamento.totalParcelas - pagamento.parcelasPagas;
        let dataAtual = new Date(pagamento.dataPrimeiroPagamento);

        for (let i = 0; i < parcelasRestantes; i++) {
          dataAtual.setMonth(dataAtual.getMonth() + 1);
          futurosPagamentos.push({
            descricao: pagamento.descricao,
            valor: pagamento.valor,
            data: dataAtual.toISOString(), // Usar ISO string para compatibilidade com JSON
          });
        }
      });

      res.status(200).json(futurosPagamentos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pagamentos futuros' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
