"use client";

import { use, useEffect, useState } from "react";

type DadosTicket = {
  status: string;
  pessoasNaFrente: number;
};

export default function PacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const senhaDoPaciente = id.toUpperCase();

  const [dados, setDados] = useState<DadosTicket | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`);
        if (res.ok) {
          const dadosDaApi = await res.json();
          setDados(dadosDaApi);
        }
      } catch (error) {
        console.error("Erro ao atualizar a tela:", error);
      }
    };

    buscarDados();
    const intervalo = setInterval(buscarDados, 3000);

    return () => clearInterval(intervalo);
  }, [id]);

  if (!dados) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-xl text-blue-600 font-semibold animate-pulse">
          Carregando sua senha...
        </p>
      </div>
    );
  }

  const foiChamado = dados.status === "CHAMADO";

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 transition-colors duration-500 ${foiChamado ? "bg-green-500" : "bg-blue-50"}`}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10">
        <div
          className={`${foiChamado ? "bg-green-600" : "bg-blue-600"} p-6 text-center text-white transition-colors duration-500`}
        >
          <h2 className="text-lg font-medium opacity-90">Sua Senha</h2>
          <div className="text-6xl font-black mt-2">{senhaDoPaciente}</div>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-600 text-lg">Status</span>
            {foiChamado ? (
              <span className="bg-green-100 text-green-800 font-bold px-4 py-1 rounded-full animate-bounce">
                DIRIJA-SE AO GUICHÊ!
              </span>
            ) : (
              <span className="bg-yellow-100 text-yellow-800 font-semibold px-4 py-1 rounded-full">
                Aguardando
              </span>
            )}
          </div>

          {!foiChamado && (
            <>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-600 text-lg">Pessoas na frente</span>
                <span className="text-3xl font-bold text-gray-800">
                  {dados.pessoasNaFrente}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2">
                <span className="text-gray-600 text-lg">Tempo estimado</span>
                <span className="text-2xl font-bold text-gray-800">
                  {dados.pessoasNaFrente * 5} min
                </span>
              </div>
            </>
          )}

          {foiChamado && (
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-green-600">
                Chegou a sua vez!
              </p>
              <p className="text-gray-500 mt-2">
                Por favor, dirija-se ao guichê de atendimento.
              </p>
            </div>
          )}
        </div>
      </div>

      {!foiChamado && (
        <p className="text-gray-500 mt-8 text-center px-4">
          Mantenha esta página aberta. Ela será atualizada automaticamente
          quando for a sua vez.
        </p>
      )}
    </div>
  );
}
