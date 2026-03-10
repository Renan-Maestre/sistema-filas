-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AGUARDANDO', 'CHAMADO', 'FINALIZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "preferencial" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'AGUARDANDO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chamadoEm" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);
