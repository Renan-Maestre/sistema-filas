"use client";

import { MonitorSmartphone, LayoutDashboard, Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    {
      title: "Totem",
      description: "Tela de autoatendimento e chamada para pacientes na fila",
      href: "/totem",
      icon: MonitorSmartphone,
      color: "from-blue-500 to-cyan-400",
      shadowColor: "shadow-blue-500/20",
    },
    {
      title: "Painel",
      description: "Centro de controle para gerenciamento e monitoramento em tempo real",
      href: "/painel",
      icon: LayoutDashboard,
      color: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/20",
    },
    // {
    //   title: "Pacientes",
    //   description: "Gestão completa de prontuários e dados de pacientes",
    //   href: "/paciente",
    //   icon: Users,
    //   color: "from-emerald-400 to-teal-500",
    //   shadowColor: "shadow-emerald-500/20",
    // },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden font-sans text-slate-200 selection:bg-blue-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-600/10 blur-[120px] pointer-events-none" />

      {/* Header
      <header className="relative z-10 w-full border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Sistema de Filas
              </h1>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gestão de Atendimento</p>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-6xl w-full px-6 py-12 sm:px-8 lg:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Selecione seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">Módulo</span>
          </h2>
          <p className="text-lg text-slate-400">
            Acesse o painel adequado para continuar gerenciando os fluxos e atendimentos.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex flex-col p-8 rounded-3xl bg-slate-800/40 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/80 hover:shadow-2xl hover:border-white/10 ${item.shadowColor}`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 flex-1">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Footer of card */}
                <div className="mt-8 flex items-center justify-between text-sm font-semibold text-slate-300">
                  <span className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Acessar módulo
                  </span>
                  <div className="p-2 rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
