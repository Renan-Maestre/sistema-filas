"use client";

import { useState, useEffect } from "react";

type Ticket = {
  id: string;
  numero: number;
  preferencial: boolean;
  status: string;
};

export default function PainelPage() {
  const [senhaChamada, setSenhaChamada] = useState<string>("---");
  const [fila, setFila] = useState<Ticket[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregarFila = async () => {
    try {
      const res = await fetch("/api/tickets");
      if (res.ok) {
        const dados = await res.json();
        setFila(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar fila:", error);
    }
  };

  useEffect(() => {
    carregarFila();
    const intervalo = setInterval(carregarFila, 3000);
    return () => clearInterval(intervalo);
  }, []);

  const formatarSenha = (ticket: Ticket) => {
    const letra = ticket.preferencial ? "P" : "N";
    const numero = String(ticket.numero).padStart(2, "0");
    return `${letra}-${numero}`;
  };

  const chamarProximo = async () => {
    if (fila.length === 0) {
      alert("A fila está vazia!");
      return;
    }

    setCarregando(true);
    const proximoTicket = fila[0];

    try {
      const res = await fetch("/api/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proximoTicket.id }),
      });

      if (res.ok) {
        setSenhaChamada(formatarSenha(proximoTicket));
        carregarFila();
      }
    } catch (error) {
      console.error("Erro ao chamar próximo:", error);
      alert("Erro ao chamar a senha.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-t-8 border-blue-600">
        <h2 className="text-3xl text-gray-500 font-semibold mb-4">
          Senha Chamada
        </h2>
        <div className="text-9xl font-black text-blue-700 mb-8 tracking-tighter">
          {senhaChamada}
        </div>
        <p className="text-2xl text-gray-600 mb-12">Guichê 01</p>

        <button
          onClick={chamarProximo}
          disabled={carregando || fila.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-xl py-4 px-12 rounded-full shadow-md transition-all"
        >
          {carregando ? "Chamando..." : "Chamar Próximo"}
        </button>
      </div>

      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
          Próximos na Fila ({fila.length})
        </h3>
        <ul className="space-y-4">
          {fila.map((ticket, index) => (
            <li
              key={ticket.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
            >
              <span
                className={`text-2xl font-bold ${ticket.preferencial ? "text-green-600" : "text-gray-700"}`}
              >
                {formatarSenha(ticket)}
              </span>
              <span className="text-sm text-gray-500">
                {index + 1}º na espera
              </span>
            </li>
          ))}
          {fila.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              Nenhum paciente aguardando.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
