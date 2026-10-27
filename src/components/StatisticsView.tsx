import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Filter,
  Users,
  Compass,
  PieChart as PieIcon,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { COHORT_STATS_SAMPLE, RIASEC_COLORS, RIASEC_TYPE_LABELS } from '../data/riasecData';
import { RiasecResult, RiasecType } from '../types/riasec';
import { RadarChart } from './RadarChart';
import { PieChart } from './PieChart';

interface StatisticsViewProps {
  userResult: RiasecResult | null;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({ userResult }) => {
  // Filters
  const [selectedSchool, setSelectedSchool] = useState<string>('ALL');
  const [selectedField, setSelectedField] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');

  // Available options
  const schools = useMemo(() => {
    const list = Array.from(new Set(COHORT_STATS_SAMPLE.map((p) => p.school)));
    return list.sort();
  }, []);

  const fields = useMemo(() => {
    let pool = COHORT_STATS_SAMPLE;
    if (selectedSchool !== 'ALL') {
      pool = pool.filter((p) => p.school === selectedSchool);
    }
    const list = Array.from(new Set(pool.map((p) => p.field)));
    return list.sort();
  }, [selectedSchool]);

  const years = useMemo(() => {
    const list = Array.from(new Set(COHORT_STATS_SAMPLE.map((p) => p.yearOfStudy)));
    return list.sort((a, b) => a - b);
  }, []);

  const genders = useMemo(() => {
    const list = Array.from(new Set(COHORT_STATS_SAMPLE.map((p) => p.gender)));
    return list.sort();
  }, []);

  // Filtered dataset
  const filteredParticipants = useMemo(() => {
    return COHORT_STATS_SAMPLE.filter((p) => {
      if (selectedSchool !== 'ALL' && p.school !== selectedSchool) return false;
      if (selectedField !== 'ALL' && p.field !== selectedField) return false;
      if (selectedYear !== 'ALL' && p.yearOfStudy.toString() !== selectedYear) return false;
      if (selectedGender !== 'ALL' && p.gender !== selectedGender) return false;
      return true;
    });
  }, [selectedSchool, selectedField, selectedYear, selectedGender]);

  // Aggregate averages for Radar chart
  const radarAverages = useMemo(() => {
    const sums: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const count = filteredParticipants.length || 1;

    filteredParticipants.forEach((p) => {
      (['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]).forEach((type) => {
        sums[type] += p.scores[type] || 0;
      });
    });

    const totalAveragePoints =
      Object.values(sums).reduce((a, b) => a + b, 0) / count || 1;

    const percentages: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    (['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]).forEach((type) => {
      const avgPts = sums[type] / count;
      percentages[type] = Math.round((avgPts / totalAveragePoints) * 100);
    });

    return percentages;
  }, [filteredParticipants]);

  // Aggregate dominant proportions for Pie chart
  const dominantDistribution = useMemo(() => {
    const counts: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const total = filteredParticipants.length || 1;

    filteredParticipants.forEach((p) => {
      if (counts[p.dominantType] !== undefined) {
        counts[p.dominantType] += 1;
      }
    });

    const result: Record<RiasecType, { points: number; percentage: number }> = {
      R: { points: counts.R, percentage: Math.round((counts.R / total) * 100) },
      I: { points: counts.I, percentage: Math.round((counts.I / total) * 100) },
      A: { points: counts.A, percentage: Math.round((counts.A / total) * 100) },
      S: { points: counts.S, percentage: Math.round((counts.S / total) * 100) },
      E: { points: counts.E, percentage: Math.round((counts.E / total) * 100) },
      C: { points: counts.C, percentage: Math.round((counts.C / total) * 100) },
    };

    return result;
  }, [filteredParticipants]);

  const resetFilters = () => {
    setSelectedSchool('ALL');
    setSelectedField('ALL');
    setSelectedYear('ALL');
    setSelectedGender('ALL');
  };

  const userPercentages: Record<RiasecType, number> | undefined = userResult
    ? {
        R: userResult.scores.R.percentage,
        I: userResult.scores.I.percentage,
        A: userResult.scores.A.percentage,
        S: userResult.scores.S.percentage,
        E: userResult.scores.E.percentage,
        C: userResult.scores.C.percentage,
      }
    : undefined;

  const sortedAverages = useMemo(() => {
    return (['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[])
      .map((type) => ({
        type,
        label: RIASEC_TYPE_LABELS[type],
        percentage: radarAverages[type],
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [radarAverages]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          <span>Módulo Analítico Coletivo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Estatísticas Coletivas & Médias de Perfis
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Reprodução do painel <code>Statistiques.php</code> original do projeto RIASEC. Filtre e
          explore a distribuição dos tipos de Holland entre estudantes de engenharia, saúde,
          artes, negócios e anos acadêmicos.
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <Filter className="w-5 h-5 text-blue-600" />
            <span>Filtros Demográficos e Acadêmicos</span>
          </div>

          {(selectedSchool !== 'ALL' ||
            selectedField !== 'ALL' ||
            selectedYear !== 'ALL' ||
            selectedGender !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* School */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Instituição / Escola:
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setSelectedField('ALL');
              }}
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 font-medium text-slate-800 focus:bg-white focus:outline-blue-500"
            >
              <option value="ALL">Todas as Instituições</option>
              {schools.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Curso / Seção:
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 font-medium text-slate-800 focus:bg-white focus:outline-blue-500"
            >
              <option value="ALL">Todos os Cursos</option>
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Year of study */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Ano de Estudo:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 font-medium text-slate-800 focus:bg-white focus:outline-blue-500"
            >
              <option value="ALL">Todos os Anos</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}º Ano {y === 5 ? '(Formandos / Egressos)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Gênero:
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 font-medium text-slate-800 focus:bg-white focus:outline-blue-500"
            >
              <option value="ALL">Todos os Gêneros</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary Metric */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-600" />
            <span>
              Amostra filtrada:{' '}
              <strong className="text-slate-900">{filteredParticipants.length}</strong> pessoa(s)
              analisada(s).
            </span>
          </span>
          {userResult && (
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              ✓ Comparando com suas respostas
            </span>
          )}
        </div>
      </div>

      {/* Dual Analytics Section: Average Profile and Dominant Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart: Average Profile */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>Média dos Perfis (Radar)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pontuação média proporcional em cada dimensão para a amostra selecionada.
            </p>
          </div>

          {/* Table of Averages */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2 text-left">Dimensão</th>
                  <th className="py-2 text-right">Média do Grupo</th>
                  {userPercentages && <th className="py-2 text-right">Seu Escore</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedAverages.map((item) => (
                  <tr key={item.type} className="hover:bg-slate-50/80">
                    <td className="py-2 font-semibold text-slate-800 flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded text-white text-[10px] font-bold flex items-center justify-center"
                        style={{ backgroundColor: RIASEC_COLORS[item.type].primary }}
                      >
                        {item.type}
                      </span>
                      <span>{item.label}</span>
                    </td>
                    <td className="py-2 text-right font-bold text-slate-900">{item.percentage}%</td>
                    {userPercentages && (
                      <td className="py-2 text-right font-bold text-blue-600">
                        {userPercentages[item.type]}%
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Canvas Chart */}
          <div className="pt-2">
            <RadarChart
              userScores={radarAverages}
              benchmarkScores={userPercentages}
              userLabel="Média da Amostra"
              benchmarkLabel={userPercentages ? 'Seu Perfil' : undefined}
              size={360}
            />
          </div>
        </div>

        {/* Donut Chart: Dominant Profiles Proportion */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-indigo-600" />
              <span>Proporção dos Perfis Dominantes</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Percentual de indivíduos que possuem cada tipo como perfil predominante.
            </p>
          </div>

          {/* Table of Proportions */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2 text-left">Tipo Dominante</th>
                  <th className="py-2 text-center">Pessoas</th>
                  <th className="py-2 text-right">Proporção</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]).map((type) => {
                  const item = dominantDistribution[type];
                  return (
                    <tr key={type} className="hover:bg-slate-50/80">
                      <td className="py-2 font-semibold text-slate-800 flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded text-white text-[10px] font-bold flex items-center justify-center"
                          style={{ backgroundColor: RIASEC_COLORS[type].primary }}
                        >
                          {type}
                        </span>
                        <span>{RIASEC_TYPE_LABELS[type]}</span>
                      </td>
                      <td className="py-2 text-center text-slate-600 font-mono">
                        {item.points}
                      </td>
                      <td className="py-2 text-right font-bold text-slate-900">
                        {item.percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Canvas Chart */}
          <div className="pt-2">
            <PieChart scores={dominantDistribution} size={320} centerText="Dominantes" />
          </div>
        </div>
      </div>
    </div>
  );
};
