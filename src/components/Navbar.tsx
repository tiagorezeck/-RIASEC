import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Settings2,
  Play,
  RotateCcw,
  Menu,
  X,
  Award,
} from 'lucide-react';

export type ActiveTab = 'home' | 'test' | 'result' | 'profiles' | 'stats' | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasStarted: boolean;
  hasCompleted: boolean;
  currentBlock: number;
  onResetTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasStarted,
  hasCompleted,
  currentBlock,
  onResetTest,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 bg-clip-text text-transparent">
                  RIASEC Brasil
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                  Holland
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Teste de Orientação Vocacional</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Início
            </button>

            <button
              onClick={() => handleNav('test')}
              className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'test'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/60'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Questionário</span>
              {hasStarted && !hasCompleted && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'test' ? 'bg-white/25 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {currentBlock}/12
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('result')}
              className={`relative px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'result'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Resultados</span>
              {hasCompleted && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => handleNav('profiles')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'profiles'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Os 6 Perfis</span>
            </button>

            <button
              onClick={() => handleNav('stats')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'stats'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>Estatísticas</span>
            </button>

            <button
              onClick={() => handleNav('admin')}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}
              title="Gestão de Perguntas"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {hasStarted && (
              <button
                onClick={onResetTest}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-rose-50 transition-colors"
                title="Reiniciar respostas do teste"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}

            {hasCompleted ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Teste Completo</span>
              </div>
            ) : hasStarted ? (
              <div className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Grupo {currentBlock} de 12
              </div>
            ) : null}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'home' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleNav('test')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activeTab === 'test' ? 'bg-blue-600 text-white' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Questionário (12 Grupos)
            </span>
            {hasStarted && !hasCompleted && (
              <span className="text-xs opacity-80">Bloco {currentBlock}/12</span>
            )}
          </button>
          <button
            onClick={() => handleNav('result')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'result' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            Meus Resultados & Código Holland
          </button>
          <button
            onClick={() => handleNav('profiles')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'profiles' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            Guia dos 6 Perfis (PDFs)
          </button>
          <button
            onClick={() => handleNav('stats')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'stats' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Estatísticas Coletivas
          </button>
          <button
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'admin' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
            }`}
          >
            <Settings2 className="w-4 h-4 text-slate-500" />
            Gestão & Personalização de Questões
          </button>
          {hasStarted && (
            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => {
                  onResetTest();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar Questionário
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
