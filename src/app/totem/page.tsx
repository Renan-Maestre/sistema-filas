"use client";

import { useState } from "react";

export default function TotemPage() {
  const [senhaGerada, setSenhaGerada] = useState<string | null>(null);

  // Função simulada: no futuro, isso vai chamar a nossa API
  const gerarSenha = (preferencial: boolean) => {
    const tipo = preferencial ? "P" : "N";
    const numeroAleatorio = Math.floor(Math.random() * 100);
    setSenhaGerada(`${tipo}-${numeroAleatorio}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Bem-vindo ao Posto de Saúde
      </h1>

      {!senhaGerada ? (
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => gerarSenha(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-12 px-8 rounded-2xl shadow-lg transition-all w-72"
          >
            Atendimento <br /> NORMAL
          </button>

          <button
            onClick={() => gerarSenha(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold py-12 px-8 rounded-2xl shadow-lg transition-all w-72"
          >
            Atendimento <br /> PREFERENCIAL
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center">
          <h2 className="text-2xl text-gray-600 mb-4">Sua Senha é:</h2>
          <div className="text-7xl font-extrabold text-blue-600 mb-6">
            {senhaGerada}
          </div>

          <div className="w-48 h-48 bg-gray-200 border-4 border-dashed border-gray-400 flex items-center justify-center mb-6">
            <span className="text-gray-500 text-sm">QR Code Aqui</span>
          </div>

          <p className="text-gray-500 mb-6">
            Escaneie o QR Code para acompanhar pelo celular.
          </p>

          <button
            onClick={() => setSenhaGerada(null)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
