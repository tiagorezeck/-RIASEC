import React, { useState } from 'react';
import {
  Settings2,
  Save,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import { QuestionBlock } from '../types/riasec';
import { RIASEC_TYPE_LABELS } from '../data/riasecData';

interface AdminQuestionsViewProps {
  blocks: QuestionBlock[];
  onUpdateBlocks: (updated: QuestionBlock[]) => void;
  onResetDefaultBlocks: () => void;
}

export const AdminQuestionsView: React.FC<AdminQuestionsViewProps> = ({
  blocks,
  onUpdateBlocks,
  onResetDefaultBlocks,
}) => {
  const [selectedBlockNum, setSelectedBlockNum] = useState<number>(1);
  const [localBlocks, setLocalBlocks] = useState<QuestionBlock[]>(blocks);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const activeBlock = localBlocks.find((b) => b.blockNumber === selectedBlockNum) || localBlocks[0];

  const handleTitleChange = (questionId: string, newTitle: string) => {
    setSavedSuccess(false);
    const updated = localBlocks.map((b) => {
      if (b.blockNumber !== selectedBlockNum) return b;
      return {
        ...b,
        questions: b.questions.map((q) => {
          if (q.id === questionId) {
            return { ...q, title: newTitle };
          }
          return q;
        }),
      };
    });
    setLocalBlocks(updated);
  };

  const handleSave = () => {
    onUpdateBlocks(localBlocks);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza de que deseja restaurar as 72 perguntas padrão em português?')) {
      onResetDefaultBlocks();
      setSavedSuccess(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider">
          <Settings2 className="w-4 h-4 text-slate-600" />
          <span>Painel Administrativo & Personalização</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Gestão de Questões do Teste RIASEC
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Equivalente ao módulo <code>Gestion_Admin_Questions.php</code>. Permite ajustar a redação
          de qualquer uma das 72 afirmações do questionário para adaptar a contextos corporativos,
          acadêmicos ou específicos de instituições de ensino.
        </p>
      </div>

      {/* Block Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-900 text-sm">Selecione o Grupo de Questões:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>

        {/* 12 Group Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {localBlocks.map((b) => (
            <button
              key={b.blockNumber}
              onClick={() => {
                setSelectedBlockNum(b.blockNumber);
                setSavedSuccess(false);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                selectedBlockNum === b.blockNumber
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              G {b.blockNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Success Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Alterações salvas com sucesso no armazenamento local!</span>
        </div>
      )}

      {/* Questions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Editando as 6 Proposições do {activeBlock.title}
          </h3>
          <span className="text-xs text-slate-500 font-medium">6 dimensões (R, I, A, S, E, C)</span>
        </div>

        <div className="divide-y divide-slate-100">
          {activeBlock.questions.map((q) => (
            <div key={q.id} className="p-5 sm:p-6 space-y-2 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold text-xs flex items-center justify-center">
                    {q.letter}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Tipo: {RIASEC_TYPE_LABELS[q.letter]}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">ID: {q.id}</span>
              </div>

              <textarea
                value={q.title}
                onChange={(e) => handleTitleChange(q.id, e.target.value)}
                rows={2}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden resize-y font-normal leading-relaxed"
                placeholder="Enunciado da pergunta..."
              />
            </div>
          ))}
        </div>

        <div className="p-5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Modificações</span>
          </button>
        </div>
      </div>
    </div>
  );
};
