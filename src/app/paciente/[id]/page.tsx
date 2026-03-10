// Adicionamos o 'async' aqui na função
export default async function PacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Esperamos os parâmetros serem resolvidos com o 'await'
  const resolvedParams = await params;

  // Agora sim podemos pegar o id com segurança!
  const senhaDoPaciente = resolvedParams.id.toUpperCase();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10">
        <div className="bg-blue-600 p-6 text-center text-white">
          <h2 className="text-lg font-medium opacity-90">Sua Senha</h2>
          <div className="text-6xl font-black mt-2">{senhaDoPaciente}</div>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-600 text-lg">Status</span>
            <span className="bg-yellow-100 text-yellow-800 font-semibold px-4 py-1 rounded-full">
              Aguardando
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-600 text-lg">Pessoas na frente</span>
            <span className="text-2xl font-bold text-gray-800">4</span>
          </div>

          <div className="flex justify-between items-center pb-2">
            <span className="text-gray-600 text-lg">Tempo estimado</span>
            <span className="text-2xl font-bold text-gray-800">12 min</span>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mt-8 text-center px-4">
        Mantenha esta página aberta. Ela será atualizada automaticamente quando
        for a sua vez.
      </p>
    </div>
  );
}
