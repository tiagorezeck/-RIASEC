import React from 'react';
import {
  Compass,
  Play,
  RotateCcw,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Lightbulb,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { PROFILES_DETAIL, RIASEC_COLORS } from '../data/riasecData';
import { RiasecType } from '../types/riasec';

interface HomeViewProps {
  hasStarted: boolean;
  hasCompleted: boolean;
  currentBlock: number;
  onStartTest: () => void;
  onContinueTest: () => void;
  onViewResults: () => void;
  onViewProfiles: (type?: RiasecType) => void;
  onViewStats: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  hasStarted,
  hasCompleted,
  currentBlock,
  onStartTest,
  onContinueTest,
  onViewResults,
  onViewProfiles,
  onViewStats,
}) => {
  const profileTypes: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xl shadow-indigo-950/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Baseado no Inventário Oficial de John Holland</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Descubra Sua Verdadeira Vocação com o{' '}
            <span className="bg-gradient-to-r from-blue-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              Teste RIASEC
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Identifique suas inclinações profissionais, preferências de ambiente de trabalho e
            carreiras mais compatíveis através de uma metodologia científica reconhecida mundialmente.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {hasCompleted ? (
              <>
                <button
                  onClick={onViewResults}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Award className="w-5 h-5 text-slate-950" />
                  <span>Ver Meus Resultados & Código Holland</span>
                </button>
                <button
                  onClick={onStartTest}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Refazer Questionário</span>
                </button>
              </>
            ) : hasStarted ? (
              <>
                <button
                  onClick={onContinueTest}
                  className="px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Continuar Teste (Grupo {currentBlock} de 12)</span>
                </button>
                <button
                  onClick={onStartTest}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium border border-white/20 transition-colors"
                >
                  Recomeçar do Início
                </button>
              </>
            ) : (
              <button
                onClick={onStartTest}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white text-base font-bold shadow-xl shadow-blue-500/30 flex items-center gap-3 transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Iniciar Teste Vocacional Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onViewStats}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-teal-300" />
              <span>Estatísticas Coletivas</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-left">
            <div>
              <p className="text-2xl font-extrabold text-white">12</p>
              <p className="text-xs text-slate-400">Grupos de escolhas</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">72</p>
              <p className="text-xs text-slate-400">Proposições avaliadas</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">6</p>
              <p className="text-xs text-slate-400">Dimensões vocacionais</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-400">Gratuito & Sem cadastro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explanatory Section (Analyse du Questionnaire) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Como Funciona a Teoria de Holland?</h2>
              <p className="text-sm text-slate-500">Origens e fundamentos científicos do modelo RIASEC</p>
            </div>
          </div>

          <div className="text-slate-600 space-y-4 text-base leading-relaxed">
            <p>
              Desenvolvido pelo psicólogo norte-americano <strong>John L. Holland</strong>, o modelo
              estabelece que as pessoas e os ambientes de trabalho podem ser agrupados em{' '}
              <strong>6 grandes perfis tipológicos</strong>. A harmonia entre a personalidade do
              indivíduo e as demandas do seu ambiente profissional é o fator mais determinante para a{' '}
              <span className="text-slate-900 font-semibold">
                satisfação, permanência e sucesso na carreira
              </span>.
            </p>
            <p>
              Nenhum ser humano se enquadra exclusivamente em uma única letra. Por isso, o resultado
              do teste gera o chamado <strong>Código Holland</strong> (uma combinação de 3 letras,
              como <em>R-I-S</em>, <em>S-E-C</em> ou <em>A-I-S</em>), que indica seu perfil dominante,
              secundário e terciário.
            </p>
          </div>

          {/* How to answer callout */}
          <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-3">
            <h3 className="font-bold text-blue-950 flex items-center gap-2 text-base">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Instruções Para a Realização do Teste</span>
            </h3>
            <ul className="text-sm text-blue-900 space-y-1.5 list-disc list-inside">
              <li>Você responderá a <strong>12 grupos sucessivos de frases</strong>, cada um com 6 alternativas.</li>
              <li>
                Em cada grupo, classifique por ordem de preferência as <strong>3 proposições que mais combinam com você</strong>:
                <span className="block pl-5 text-xs text-blue-800 mt-0.5">
                  • <strong>1º lugar:</strong> vale 3 pontos (sua maior preferência)<br />
                  • <strong>2º lugar:</strong> vale 2 pontos (sua segunda preferência)<br />
                  • <strong>3º lugar:</strong> vale 1 ponto (sua terceira preferência)<br />
                  • As outras 3 ficam sem pontuação (0 pontos).
                </span>
              </li>
              <li>Não existem respostas certas nem erradas: responda de forma espontânea e autêntica.</li>
              <li>O teste não tem limite de tempo e seu progresso é salvo automaticamente.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The 6 Dimensions Overview Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            As 6 Dimensões Vocacionais do RIASEC
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Clique em qualquer dimensão para consultar detalhes completos, competências e carreiras
            no mercado brasileiro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {profileTypes.map((type) => {
            const profile = PROFILES_DETAIL[type];
            const colors = RIASEC_COLORS[type];
            return (
              <div
                key={type}
                onClick={() => onViewProfiles(type)}
                className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg text-white shadow-xs"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {type}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: colors.bgSoft, color: colors.border }}
                    >
                      {profile.name.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                    {profile.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {profile.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold" style={{ color: colors.primary }}>
                  <span>Ver guia do perfil</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits & FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Perguntas Frequentes Sobre o Teste Vocacional</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1.5">
              <h4 className="font-semibold text-slate-800">
                Quanto tempo demora para responder?
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Em média de 8 a 12 minutos. O teste possui 12 grupos de frases rápidas e o ritmo é
                totalmente livre.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-slate-800">
                O que acontece com os dados que eu preencher?
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Nenhum dado pessoal é transmitido ou coletado. O cálculo é feito localmente no seu
                navegador e respeita 100% da sua privacidade.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-slate-800">
                O que é o Código Holland?
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                É a combinação ordenada das suas 3 letras com maior pontuação (ex: <strong>R-I-A</strong>).
                Ele é o padrão de referência utilizado por orientadores vocacionais em todo o mundo.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-semibold text-slate-800">
                Posso exportar ou imprimir meu resultado?
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Sim! Ao finalizar o teste você poderá salvar seu relatório em PDF, imprimir ou
                compartilhar seu resumo vocacional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
