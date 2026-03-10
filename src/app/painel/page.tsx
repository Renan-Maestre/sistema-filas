"use client";

import { useState } from "react";

export default function PainelPage() {
  // Dados simulados para visualização
  const [senhaChamada, setSenhaChamada] = useState<string>("P-01");
  const [fila, setFila] = useState(["N-02", "P-03", "N-04", "N-05"]);

  const chamarProximo = () => {
    if (fila.length > 0) {
      const proximo = fila[0];
      setSenhaChamada(proximo);
      setFila(fila.slice(1)); // Remove o primeiro da fila
    } else {
      alert("A fila está vazia!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col md:flex-row gap-8">
      {/* Lado Esquerdo - Chamada Atual */}
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-12 rounded-full shadow-md transition-all"
        >
          Chamar Próximo
        </button>
      </div>

      {/* Lado Direito - Fila de Espera */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
          Próximos na Fila
        </h3>
        <ul className="space-y-4">
          {fila.map((senha, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
            >
              <span className="text-2xl font-bold text-gray-700">{senha}</span>
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
