"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

export default function TotemPage() {
  const [senhaGerada, setSenhaGerada] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  const gerarSenha = async (preferencial: boolean) => {
    setCarregando(true);

    try {
      const resposta = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferencial }),
      });

      if (!resposta.ok) throw new Error("Erro ao gerar senha");

      const ticket = await resposta.json();
      setSenhaGerada(ticket.senhaFormatada);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao gerar a senha. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const linkPaciente = senhaGerada
    ? `${window.location.origin}/paciente/${senhaGerada.toLowerCase()}`
    : "";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Bem-vindo ao Posto de Saúde
      </h1>

      {!senhaGerada ? (
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => gerarSenha(false)}
            disabled={carregando}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-2xl font-semibold py-12 px-8 rounded-2xl shadow-lg transition-all w-72"
          >
            {carregando ? (
              "Aguarde..."
            ) : (
              <>
                Atendimento <br /> NORMAL
              </>
            )}
          </button>

          <button
            onClick={() => gerarSenha(true)}
            disabled={carregando}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-2xl font-semibold py-12 px-8 rounded-2xl shadow-lg transition-all w-72"
          >
            {carregando ? (
              "Aguarde..."
            ) : (
              <>
                Atendimento <br /> PREFERENCIAL
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-md">
          <h2 className="text-2xl text-gray-600 mb-4">Sua Senha é:</h2>
          <div className="text-7xl font-extrabold text-blue-600 mb-6">
            {senhaGerada}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200 mb-6 flex flex-col items-center w-full">
            <QRCode value={linkPaciente} size={192} />

            <p className="mt-4 text-sm text-blue-600 font-medium break-all text-center">
              {linkPaciente}
            </p>
          </div>

          <p className="text-gray-500 mb-6 text-sm">
            Escaneie o QR Code ou acesse o link acima para acompanhar pelo
            celular.
          </p>

          <button
            onClick={() => setSenhaGerada(null)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar para o Início
          </button>
        </div>
      )}
    </div>
  );
}
