import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fila = await prisma.ticket.findMany({
      where: {
        status: "AGUARDANDO",
      },
      orderBy: [{ preferencial: "desc" }, { criadoEm: "asc" }],
    });

    return NextResponse.json(fila);
  } catch (error) {
    console.error("Erro ao buscar a fila:", error);
    return NextResponse.json(
      { error: "Erro ao buscar a fila de espera." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { preferencial } = body;

    const novoTicket = await prisma.ticket.create({
      data: {
        preferencial: Boolean(preferencial),
      },
    });

    const letra = novoTicket.preferencial ? "P" : "N";

    const numeroFormatado = String(novoTicket.numero).padStart(2, "0");
    const senhaFormatada = `${letra}-${numeroFormatado}`;

    return NextResponse.json(
      { ...novoTicket, senhaFormatada },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    return NextResponse.json(
      { error: "Erro ao gerar a senha." },
      { status: 500 },
    );
  }
}
