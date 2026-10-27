import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { BlockAnswer, QuestionBlock, TestAnswers } from '../types/riasec';
import { RIASEC_TYPE_LABELS } from '../data/riasecData';

interface TestViewProps {
  blocks: QuestionBlock[];
  currentBlockNumber: number;
  setCurrentBlockNumber: (num: number) => void;
  answers: TestAnswers;
  onSaveAnswer: (blockNum: number, answer: BlockAnswer) => void;
  onFinishTest: () => void;
  onResetTest: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  blocks,
  currentBlockNumber,
  setCurrentBlockNumber,
  answers,
  onSaveAnswer,
  onFinishTest,
  onResetTest,
}) => {
  const currentBlock = blocks.find((b) => b.blockNumber === currentBlockNumber) || blocks[0];
  const currentAnswer: BlockAnswer = answers[currentBlockNumber] || {};

  const [validationError, setValidationError] = useState<string | null>(null);

  // Helper to check what rank a question currently has
  const getQuestionRank = (qId: string): 1 | 2 | 3 | null => {
    if (currentAnswer.first === qId) return 1;
    if (currentAnswer.second === qId) return 2;
    if (currentAnswer.third === qId) return 3;
    return null;
  };

  // Toggle or assign rank to question
  const handleAssignRank = (qId: string, rank: 1 | 2 | 3) => {
    setValidationError(null);
    const newAnswer: BlockAnswer = { ...currentAnswer };

    // If this question already had another rank, clear it
    if (newAnswer.first === qId) delete newAnswer.first;
    if (newAnswer.second === qId) delete newAnswer.second;
    if (newAnswer.third === qId) delete newAnswer.third;

    // If another question had the requested rank, remove it or swap
    if (rank === 1) {
      if (currentAnswer.first === qId) {
        // Unselecting
        delete newAnswer.first;
      } else {
        newAnswer.first = qId;
      }
    } else if (rank === 2) {
      if (currentAnswer.second === qId) {
        delete newAnswer.second;
      } else {
        newAnswer.second = qId;
      }
    } else if (rank === 3) {
      if (currentAnswer.third === qId) {
        delete newAnswer.third;
      } else {
        newAnswer.third = qId;
      }
    }

    onSaveAnswer(currentBlockNumber, newAnswer);
  };

  // Check if current block has all 3 required choices
  const isBlockComplete = Boolean(
    currentAnswer.first &&
    currentAnswer.second &&
    currentAnswer.third &&
    currentAnswer.first !== currentAnswer.second &&
    currentAnswer.second !== currentAnswer.third &&
    currentAnswer.first !== currentAnswer.third
  );

  const handleNext = () => {
    if (!isBlockComplete) {
      setValidationError('Por favor, escolha e classifique as 3 proposições (1º, 2º e 3º lugar) antes de prosseguir.');
      return;
    }

    setValidationError(null);
    if (currentBlockNumber < 12) {
      setCurrentBlockNumber(currentBlockNumber + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinishTest();
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentBlockNumber > 1) {
      setCurrentBlockNumber(currentBlockNumber - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPct = Math.round(((currentBlockNumber - 1) / 12) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top Header & Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <span>Questionário RIASEC de Holland</span>
              <span>•</span>
              <span>12 Etapas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentBlock.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {currentBlock.subtitle || 'Selecione e ordene suas 3 proposições prediletas.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Grupo {currentBlockNumber} de 12
            </span>
            <button
              onClick={onResetTest}
              className="text-xs text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
              title="Reiniciar questionário"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Progresso da Avaliação</span>
            <span>{progressPct}% concluído</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(progressPct, 8)}%` }}
            />
          </div>

          {/* Stepper Dots (1 to 12) */}
          <div className="flex items-center justify-between pt-2 overflow-x-auto pb-1">
            {blocks.map((b) => {
              const isAnswered = answers[b.blockNumber]?.first && answers[b.blockNumber]?.second && answers[b.blockNumber]?.third;
              const isCurrent = b.blockNumber === currentBlockNumber;
              return (
                <button
                  key={b.blockNumber}
                  onClick={() => setCurrentBlockNumber(b.blockNumber)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-xs'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                  title={`Ir para Grupo ${b.blockNumber}`}
                >
                  {b.blockNumber}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rules & Instruction Reminder */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Como classificar as 6 proposições abaixo:
          </p>
          <p>
            Clique nas medalhas para indicar sua <strong>1ª preferência (vale 3 pontos)</strong>,{' '}
            <strong>2ª preferência (vale 2 pontos)</strong> e <strong>3ª preferência (vale 1 ponto)</strong>. As
            3 restantes ficarão em branco (0 pontos).
          </p>
        </div>
      </div>

      {/* Question Cards Table / List */}
      <div className="space-y-3.5">
        {currentBlock.questions.map((question, idx) => {
          const rank = getQuestionRank(question.id);
          const isSelected = rank !== null;

          return (
            <div
              key={question.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isSelected
                  ? 'border-blue-400 bg-blue-50/40 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
                      {question.title}
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Dimensão: {question.letter} ({RIASEC_TYPE_LABELS[question.letter]})
                    </span>
                  </div>
                </div>

                {/* Rank Selector Buttons: 1º (3p), 2º (2p), 3º (1p) */}
                <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
                  {/* 1º Lugar */}
                  <button
                    type="button"
                    onClick={() => handleAssignRank(question.id, 1)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      rank === 1
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title="1ª Preferência (3 pontos)"
                  >
                    <span className="text-[13px]">🥇</span>
                    <span>1º</span>
                    <span className="text-[10px] font-normal opacity-90">(3 pts)</span>
                  </button>

                  {/* 2º Lugar */}
                  <button
                    type="button"
                    onClick={() => handleAssignRank(question.id, 2)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      rank === 2
                        ? 'bg-slate-500 text-white shadow-md shadow-slate-500/30 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title="2ª Preferência (2 pontos)"
                  >
                    <span className="text-[13px]">🥈</span>
                    <span>2º</span>
                    <span className="text-[10px] font-normal opacity-90">(2 pts)</span>
                  </button>

                  {/* 3º Lugar */}
                  <button
                    type="button"
                    onClick={() => handleAssignRank(question.id, 3)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      rank === 3
                        ? 'bg-amber-700 text-white shadow-md shadow-amber-700/30 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title="3ª Preferência (1 ponto)"
                  >
                    <span className="text-[13px]">🥉</span>
                    <span>3º</span>
                    <span className="text-[10px] font-normal opacity-90">(1 pt)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 flex items-center gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Selection Status Summary */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold">
            {currentAnswer.first ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
            )}
            1º Lugar Definido
          </span>

          <span className="flex items-center gap-1.5 font-semibold">
            {currentAnswer.second ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
            )}
            2º Lugar Definido
          </span>

          <span className="flex items-center gap-1.5 font-semibold">
            {currentAnswer.third ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
            )}
            3º Lugar Definido
          </span>
        </div>

        <span className="text-slate-500">
          {isBlockComplete ? (
            <span className="text-emerald-700 font-bold">✓ Grupo pronto para prosseguir</span>
          ) : (
            'Selecione 3 alternativas para avançar'
          )}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentBlockNumber === 1}
          className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            currentBlockNumber === 1
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
              : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Grupo Anterior</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all shadow-md ${
            isBlockComplete
              ? currentBlockNumber === 12
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30 scale-105'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-600/30'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          {currentBlockNumber === 12 ? (
            <>
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Finalizar & Ver Resultados</span>
            </>
          ) : (
            <>
              <span>Próximo Grupo ({currentBlockNumber + 1}/12)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
