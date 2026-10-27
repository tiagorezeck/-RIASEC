import React from 'react';
import { Compass, ExternalLink, Heart, ShieldCheck } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                RIASEC Brasil
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Replicação moderna e tradução integral para o português do Brasil do projeto{' '}
              <span className="text-slate-200 font-medium">MatthieuDye/riasec</span>, originalmente
              desenvolvido na Polytech Montpellier. Baseado na consagrada teoria das tipologias de
              personalidade vocacional de John L. Holland (1919–2008).
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacidade garantida: todas as respostas são calculadas e salvas no seu navegador.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Página Inicial & Teoria
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('test')}
                  className="hover:text-white transition-colors"
                >
                  Questionário (12 Grupos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('result')}
                  className="hover:text-white transition-colors"
                >
                  Resultados & Código Holland
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profiles')}
                  className="hover:text-white transition-colors"
                >
                  Guia Completo dos 6 Perfis
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stats')}
                  className="hover:text-white transition-colors"
                >
                  Estatísticas Coletivas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-white transition-colors"
                >
                  Gestão de Perguntas
                </button>
              </li>
            </ul>
          </div>

          {/* Theoretical Foundations & Original Source */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Referência do Projeto
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Projeto fonte:{' '}
              <a
                href="https://github.com/MatthieuDye/riasec"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2"
              >
                <span>MatthieuDye/riasec</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 block mb-1">
                Tipologia RIASEC de Holland:
              </span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-300">
                <span>R: Realista</span>
                <span>I: Investigativo</span>
                <span>A: Artístico</span>
                <span>S: Social</span>
                <span>E: Empreendedor</span>
                <span>C: Convencional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Teste Vocacional RIASEC Brasil. Uso educacional e de orientação profissional.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>em Português do Brasil</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
