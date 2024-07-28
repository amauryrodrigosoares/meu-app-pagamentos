-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "recorrente" BOOLEAN NOT NULL,
    "parcelasPagas" INTEGER NOT NULL,
    "totalParcelas" INTEGER NOT NULL,
    "dataPrimeiroPagamento" DATETIME NOT NULL
);
