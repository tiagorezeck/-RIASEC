import React, { useState } from 'react';
import {
  Award,
  Compass,
  Printer,
  Share2,
  RotateCcw,
  BookOpen,
  BarChart3,
  Check,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { RiasecResult, RiasecType } from '../types/riasec';
import { PROFILES_DETAIL, RIASEC_COLORS, RIASEC_TYPE_LABELS } from '../data/riasecData';
import { RadarChart } from './RadarChart';
import { PieChart } from './PieChart';

interface ResultViewProps {
  result: RiasecResult;
  onRetakeTest: () => void;
  onViewProfiles: (type?: RiasecType) => void;
  onViewStats: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onRetakeTest,
  onViewProfiles,
  onViewStats,
}) => {
  const [copied, setCopied] = useState(false);
  const primaryProfile = PROFILES_DETAIL[result.primaryType];
  const secondaryProfile = PROFILES_DETAIL[result.secondaryType];
  const tertiaryProfile = PROFILES_DETAIL[result.tertiaryType];

  // Convert percentages for Radar chart
  const userPctRecord: Record<RiasecType, number> = {
    R: result.scores.R.percentage,
    I: result.scores.I.percentage,
    A: result.scores.A.percentage,
    S: result.scores.S.percentage,
    E: result.scores.E.percentage,
    C: result.scores.C.percentage,
  };

  // Population reference benchmark
  const benchmarkPctRecord: Record<RiasecType, number> = {
    R: 16,
    I: 18,
    A: 15,
    S: 19,
    E: 17,
    C: 15,
  };

  const handleShare = () => {
    const text = `Meu resultado no Teste Vocacional RIASEC (Modelo Holland):\nCódigo Holland: ${result.hollandCode} (${primaryProfile.name})\n\n1º ${result.sortedScores[0].label}: ${result.sortedScores[0].percentage}%\n2º ${result.sortedScores[1].label}: ${result.sortedScores[1].percentage}%\n3º ${result.sortedScores[2].label}: ${result.sortedScores[2].percentage}%\n\nDescubra sua vocação no Teste RIASEC Brasil!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12 print:p-0 print:m-0">
      {/* Hero Badge Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Avaliação Vocacional Concluída</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Seu Código Holland é{' '}
              <span className="text-amber-400 underline decoration-amber-400/50 underline-offset-8">
                {result.hollandCode}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Seu perfil dominante é <strong>{primaryProfile.name}</strong>, seguido de{' '}
              <strong>{secondaryProfile.name}</strong> e <strong>{tertiaryProfile.name}</strong>.
            </p>
          </div>

          {/* Big Holland Code Badge */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="w-36 h-36 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col items-center justify-center text-center shadow-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Tipologia
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-white my-1">
                {result.hollandCode}
              </span>
              <span className="text-[11px] font-medium text-amber-300 truncate max-w-full px-1">
                {primaryProfile.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copiado para Área de Transferência!' : 'Compartilhar Resultado'}</span>
            </button>
          </div>

          <button
            onClick={onRetakeTest}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer o Teste</span>
          </button>
        </div>
      </section>

      {/* Scores Table & Ranking */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Tabela de Pontuação por Dimensão RIASEC
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Distribuição de pontos e percentuais calculados a partir dos 12 grupos de escolhas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">Classificação</th>
                <th className="py-3 px-3">Tipo RIASEC</th>
                <th className="py-3 px-3">Descrição Breve</th>
                <th className="py-3 px-3 text-center">Pontos</th>
                <th className="py-3 px-3 text-right">Porcentagem</th>
                <th className="py-3 px-3 text-right">Barra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.sortedScores.map((score, idx) => {
                const color = RIASEC_COLORS[score.type];
                return (
                  <tr key={score.type} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {idx === 0 ? '🥇 1º' : idx === 1 ? '🥈 2º' : idx === 2 ? '🥉 3º' : `${idx + 1}º`}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-md text-white font-bold text-xs flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: color.primary }}
                        >
                          {score.type}
                        </span>
                        <span className="font-semibold text-slate-800">{score.label}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-500 max-w-xs truncate">
                      {score.shortDesc}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-700">
                      {score.points} pts
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                      {score.percentage}%
                    </td>
                    <td className="py-3.5 px-3 text-right w-36">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${score.percentage}%`,
                            backgroundColor: color.primary,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual Graphs Section: Radar & Doughnut Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Gráfico Radar dos Perfis</h3>
              <p className="text-xs text-slate-500">
                Seu perfil individual comparado com a média geral da população
              </p>
            </div>
          </div>

          <div className="pt-2">
            <RadarChart
              userScores={userPctRecord}
              benchmarkScores={benchmarkPctRecord}
              userLabel="Você"
              benchmarkLabel="Média Populacional"
              size={380}
            />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Distribuição Proporcional</h3>
              <p className="text-xs text-slate-500">
                Equilíbrio percentual entre as 6 dimensões
              </p>
            </div>
          </div>

          <div className="pt-2">
            <PieChart
              scores={result.scores}
              centerText={result.hollandCode}
              size={320}
            />
          </div>
        </div>
      </section>

      {/* In-depth Analysis for the Primary Profile (Replaces the PDF from Polytech) */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-2xl text-white shadow-md"
              style={{ backgroundColor: primaryProfile.color }}
            >
              {primaryProfile.type}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Perfil Dominante
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {result.scores[primaryProfile.type].percentage}% de afinidade
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {primaryProfile.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => onViewProfiles(primaryProfile.type)}
            className="self-start sm:self-center text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>Consultar Guia Completo do Perfil</span>
          </button>
        </div>

        {/* Narrative Description */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Visão Geral do Seu Perfil:</h3>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {primaryProfile.description}
          </p>
        </div>

        {/* Traits and Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Traços de Personalidade & Estilo</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {primaryProfile.personalityTraits.map((trait, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>Competências Chave</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {primaryProfile.keySkills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Careers in Brazil */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Carreiras e Ocupações Recomendadas no Mercado Brasileiro
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {primaryProfile.recommendedCareers.map((cat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2"
              >
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                  {cat.category}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {cat.jobs.map((job, jIdx) => (
                    <li key={jIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Higher Ed and Technical Courses */}
        <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-3">
          <h4 className="font-bold text-sm text-indigo-950 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-700" />
            <span>Cursos de Graduação e Técnicos Sugeridos</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {primaryProfile.higherEducationCourses.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-900 font-medium"
              >
                {c}
              </span>
            ))}
            {primaryProfile.technicalCourses.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-indigo-100/70 text-indigo-800 font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Card */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">Deseja Comparar Seus Resultados com Outros Grupos?</h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Acesse o módulo de Estatísticas Coletivas para filtrar por áreas de engenharia, faculdades,
            gênero e anos de estudo, reproduzindo a ferramenta analítica original.
          </p>
        </div>

        <button
          onClick={onViewStats}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-md flex items-center gap-2 whitespace-nowrap transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Ver Estatísticas Coletivas</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
