import React, { useState, useEffect } from 'react';
import { ActiveTab, Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { TestView } from './components/TestView';
import { ResultView } from './components/ResultView';
import { ProfilesGuideView } from './components/ProfilesGuideView';
import { StatisticsView } from './components/StatisticsView';
import { AdminQuestionsView } from './components/AdminQuestionsView';
import { BlockAnswer, QuestionBlock, RiasecResult, RiasecType, TestAnswers } from './types/riasec';
import {
  calculateRiasecResult,
  clearTestProgress,
  getStoredAnswers,
  getStoredBlocks,
  getStoredCurrentBlock,
  getStoredResult,
  resetCustomBlocks,
  saveCustomBlocks,
  saveStoredAnswers,
  saveStoredCurrentBlock,
  saveStoredResult,
} from './utils/riasecUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [blocks, setBlocks] = useState<QuestionBlock[]>(() => getStoredBlocks());
  const [answers, setAnswers] = useState<TestAnswers>(() => getStoredAnswers());
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(() => getStoredCurrentBlock());
  const [result, setResult] = useState<RiasecResult | null>(() => getStoredResult());
  const [selectedProfileType, setSelectedProfileType] = useState<RiasecType>('R');

  // Check completion: either result exists or all 12 blocks answered
  const hasStarted = Object.keys(answers).length > 0;
  const isAllAnswered =
    blocks.length === 12 &&
    blocks.every((b) => {
      const a = answers[b.blockNumber];
      return a && a.first && a.second && a.third;
    });
  const hasCompleted = Boolean(result || isAllAnswered);

  // Auto-calculate result if all blocks answered but result not saved
  useEffect(() => {
    if (isAllAnswered && !result) {
      const computed = calculateRiasecResult(answers, blocks);
      setResult(computed);
      saveStoredResult(computed);
    }
  }, [isAllAnswered, result, answers, blocks]);

  const handleSaveAnswer = (blockNum: number, answer: BlockAnswer) => {
    const updated = { ...answers, [blockNum]: answer };
    setAnswers(updated);
    saveStoredAnswers(updated);
  };

  const handleBlockChange = (num: number) => {
    setCurrentBlockNumber(num);
    saveStoredCurrentBlock(num);
  };

  const handleFinishTest = () => {
    const computed = calculateRiasecResult(answers, blocks);
    setResult(computed);
    saveStoredResult(computed);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetTest = () => {
    if (window.confirm('Tem certeza de que deseja reiniciar o questionário? Suas respostas anteriores serão descartadas.')) {
      clearTestProgress();
      setAnswers({});
      setCurrentBlockNumber(1);
      setResult(null);
      setActiveTab('test');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartTest = () => {
    setCurrentBlockNumber(1);
    saveStoredCurrentBlock(1);
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueTest = () => {
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewResults = () => {
    if (!result && isAllAnswered) {
      const computed = calculateRiasecResult(answers, blocks);
      setResult(computed);
      saveStoredResult(computed);
    }
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProfiles = (type?: RiasecType) => {
    if (type) setSelectedProfileType(type);
    setActiveTab('profiles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewStats = () => {
    setActiveTab('stats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateBlocks = (updated: QuestionBlock[]) => {
    setBlocks(updated);
    saveCustomBlocks(updated);
    // Recalculate result if test is finished
    if (hasCompleted) {
      const computed = calculateRiasecResult(answers, updated);
      setResult(computed);
      saveStoredResult(computed);
    }
  };

  const handleResetDefaultBlocks = () => {
    const def = resetCustomBlocks();
    setBlocks(def);
    if (hasCompleted) {
      const computed = calculateRiasecResult(answers, def);
      setResult(computed);
      saveStoredResult(computed);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasStarted={hasStarted}
        hasCompleted={hasCompleted}
        currentBlock={currentBlockNumber}
        onResetTest={handleResetTest}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeView
            hasStarted={hasStarted}
            hasCompleted={hasCompleted}
            currentBlock={currentBlockNumber}
            onStartTest={handleStartTest}
            onContinueTest={handleContinueTest}
            onViewResults={handleViewResults}
            onViewProfiles={handleViewProfiles}
            onViewStats={handleViewStats}
          />
        )}

        {activeTab === 'test' && (
          <TestView
            blocks={blocks}
            currentBlockNumber={currentBlockNumber}
            setCurrentBlockNumber={handleBlockChange}
            answers={answers}
            onSaveAnswer={handleSaveAnswer}
            onFinishTest={handleFinishTest}
            onResetTest={handleResetTest}
          />
        )}

        {activeTab === 'result' && (
          result ? (
            <ResultView
              result={result}
              onRetakeTest={handleResetTest}
              onViewProfiles={handleViewProfiles}
              onViewStats={handleViewStats}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto font-bold text-xl">
                !
              </div>
              <h2 className="text-xl font-bold text-slate-900">Questionário Ainda Não Concluído</h2>
              <p className="text-sm text-slate-500">
                Para visualizar seu relatório vocacional completo com gráficos e o Código Holland,
                responda aos 12 grupos de proposições.
              </p>
              <button
                onClick={handleContinueTest}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm"
              >
                {hasStarted ? `Continuar no Grupo ${currentBlockNumber}` : 'Começar Questionário'}
              </button>
            </div>
          )
        )}

        {activeTab === 'profiles' && (
          <ProfilesGuideView
            initialType={selectedProfileType}
            onStartTest={handleStartTest}
          />
        )}

        {activeTab === 'stats' && (
          <StatisticsView userResult={result} />
        )}

        {activeTab === 'admin' && (
          <AdminQuestionsView
            blocks={blocks}
            onUpdateBlocks={handleUpdateBlocks}
            onResetDefaultBlocks={handleResetDefaultBlocks}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
