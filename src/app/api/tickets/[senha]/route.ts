import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ senha: string }> },
) {
  try {
    const { senha } = await params;

    const letra = senha.charAt(0).toUpperCase();
    const numero = parseInt(senha.split("-")[1]);

    if (isNaN(numero)) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 400 });
    }

    const preferencial = letra === "P";

    const ticket = await prisma.ticket.findFirst({
      where: { preferencial: preferencial, numero: numero },
      orderBy: { criadoEm: "desc" },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket não encontrado" },
        { status: 404 },
      );
    }

    let pessoasNaFrente = 0;
    if (ticket.status === "AGUARDANDO") {
      const fila = await prisma.ticket.findMany({
        where: { status: "AGUARDANDO" },
        orderBy: [{ preferencial: "desc" }, { criadoEm: "asc" }],
      });

      const posicao = fila.findIndex((t) => t.id === ticket.id);
      pessoasNaFrente = posicao >= 0 ? posicao : 0;
    }

    return NextResponse.json({
      status: ticket.status,
      pessoasNaFrente: pessoasNaFrente,
    });
  } catch (error) {
    console.error("Erro na rota de consulta:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
