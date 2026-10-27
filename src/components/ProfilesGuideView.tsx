import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Compass,
  CheckCircle2,
  Wrench,
  Microscope,
  Palette,
  HeartHandshake,
  TrendingUp,
  ClipboardCheck,
  Building,
} from 'lucide-react';
import { PROFILES_DETAIL, RIASEC_COLORS, RIASEC_TYPE_LABELS } from '../data/riasecData';
import { RiasecType } from '../types/riasec';

interface ProfilesGuideViewProps {
  initialType?: RiasecType;
  onStartTest: () => void;
}

export const ProfilesGuideView: React.FC<ProfilesGuideViewProps> = ({
  initialType = 'R',
  onStartTest,
}) => {
  const [selectedType, setSelectedType] = useState<RiasecType>(initialType);
  const types: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const profile = PROFILES_DETAIL[selectedType];
  const colors = RIASEC_COLORS[selectedType];

  const getIcon = (type: RiasecType) => {
    switch (type) {
      case 'R':
        return <Wrench className="w-5 h-5" />;
      case 'I':
        return <Microscope className="w-5 h-5" />;
      case 'A':
        return <Palette className="w-5 h-5" />;
      case 'S':
        return <HeartHandshake className="w-5 h-5" />;
      case 'E':
        return <TrendingUp className="w-5 h-5" />;
      case 'C':
        return <ClipboardCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>Guia Oficial das Tipologias Vocacionais</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explorando os 6 Tipos de Personalidade RIASEC
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Baseado nos manuais descritivos da tipologia de John Holland, conheça a fundo as
          características, motivações, competências e carreiras brasileiras de cada perfil.
        </p>
      </div>

      {/* Type Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
        {types.map((type) => {
          const isSelected = selectedType === type;
          const typeColor = RIASEC_COLORS[type];
          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-md ring-2'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              style={{
                borderColor: isSelected ? typeColor.primary : 'transparent',
              }}
            >
              <span
                className="w-5 h-5 rounded-md text-white text-[11px] font-extrabold flex items-center justify-center"
                style={{ backgroundColor: typeColor.primary }}
              >
                {type}
              </span>
              <span>{RIASEC_TYPE_LABELS[type]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Profile Detailed Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Banner with Profile Identity */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
              style={{ backgroundColor: colors.primary }}
            >
              {getIcon(selectedType)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: colors.bgSoft, color: colors.border }}
                >
                  Tipo {selectedType}
                </span>
                <span className="text-xs text-slate-400 font-medium">Modelo Holland</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {profile.name}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">{profile.tagline}</p>
            </div>
          </div>

          <button
            onClick={onStartTest}
            className="self-start md:self-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <span>Fazer o Teste Vocacional</span>
          </button>
        </div>

        {/* Narrative Description */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">Descrição Geral da Personalidade</h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {profile.description}
          </p>
        </div>

        {/* Four Column Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traits */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Traços de Personalidade & Estilo Pessoal</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {profile.personalityTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Skills */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-500" />
              <span>Habilidades e Pontos Fortes</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {profile.keySkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Preferences */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-600" />
              <span>O Que Prefere Fazer no Trabalho</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {profile.workPreferences.map((pref, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-2" />
                  <span>{pref}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal Environments */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-600" />
              <span>Ambientes Onde Prospera</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {profile.idealEnvironments.map((env, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                  <span>{env}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Careers in Brazil */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Profissões em Destaque no Brasil para o Tipo {selectedType} ({RIASEC_TYPE_LABELS[selectedType]})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.recommendedCareers.map((cat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
              >
                <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">
                  {cat.category}
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {cat.jobs.map((job, jIdx) => (
                    <li key={jIdx} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Higher Ed and Technical Training */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-sm text-slate-900">
              Formações Acadêmicas e Cursos Profissionalizantes
            </h4>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Graduações (Bacharelado e Licenciatura):
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.higherEducationCourses.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium shadow-2xs"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Cursos Técnicos & Tecnólogos:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.technicalCourses.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
