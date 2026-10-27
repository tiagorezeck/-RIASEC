import { BlockAnswer, QuestionBlock, RiasecResult, RiasecScore, RiasecType, TestAnswers } from '../types/riasec';
import { DEFAULT_BLOCKS, RIASEC_COLORS, RIASEC_TYPE_LABELS } from '../data/riasecData';

const STORAGE_KEY_ANSWERS = 'riasec_answers_v1';
const STORAGE_KEY_CURRENT_BLOCK = 'riasec_current_block_v1';
const STORAGE_KEY_RESULT = 'riasec_latest_result_v1';
const STORAGE_KEY_CUSTOM_BLOCKS = 'riasec_custom_blocks_v1';

export function getStoredBlocks(): QuestionBlock[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_BLOCKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 12) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Falha ao ler blocos personalizados:', e);
  }
  return DEFAULT_BLOCKS;
}

export function saveCustomBlocks(blocks: QuestionBlock[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_BLOCKS, JSON.stringify(blocks));
  } catch (e) {
    console.error('Falha ao salvar blocos personalizados:', e);
  }
}

export function resetCustomBlocks(): QuestionBlock[] {
  try {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_BLOCKS);
  } catch (e) {
    console.error('Falha ao redefinir blocos:', e);
  }
  return DEFAULT_BLOCKS;
}

export function getStoredAnswers(): TestAnswers {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Falha ao recuperar respostas:', e);
  }
  return {};
}

export function saveStoredAnswers(answers: TestAnswers): void {
  try {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  } catch (e) {
    console.error('Falha ao salvar respostas:', e);
  }
}

export function getStoredCurrentBlock(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_BLOCK);
    if (raw) {
      const val = parseInt(raw, 10);
      if (val >= 1 && val <= 12) return val;
    }
  } catch (e) {
    console.error('Falha ao recuperar bloco atual:', e);
  }
  return 1;
}

export function saveStoredCurrentBlock(blockNumber: number): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_BLOCK, blockNumber.toString());
  } catch (e) {
    console.error('Falha ao salvar bloco atual:', e);
  }
}

export function getStoredResult(): RiasecResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULT);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Falha ao recuperar resultado salvo:', e);
  }
  return null;
}

export function saveStoredResult(result: RiasecResult): void {
  try {
    localStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(result));
  } catch (e) {
    console.error('Falha ao salvar resultado:', e);
  }
}

export function clearTestProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_CURRENT_BLOCK);
    localStorage.removeItem(STORAGE_KEY_RESULT);
  } catch (e) {
    console.error('Falha ao limpar teste:', e);
  }
}

// Calculate RIASEC results from answers
export function calculateRiasecResult(answers: TestAnswers, blocks: QuestionBlock[] = getStoredBlocks()): RiasecResult {
  // Map questionId -> letter
  const questionLetterMap: Record<string, RiasecType> = {};
  blocks.forEach((block) => {
    block.questions.forEach((q) => {
      questionLetterMap[q.id] = q.letter;
    });
  });

  const rawPoints: Record<RiasecType, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  Object.values(answers).forEach((blockAnswer: BlockAnswer) => {
    if (blockAnswer.first && questionLetterMap[blockAnswer.first]) {
      rawPoints[questionLetterMap[blockAnswer.first]] += 3;
    }
    if (blockAnswer.second && questionLetterMap[blockAnswer.second]) {
      rawPoints[questionLetterMap[blockAnswer.second]] += 2;
    }
    if (blockAnswer.third && questionLetterMap[blockAnswer.third]) {
      rawPoints[questionLetterMap[blockAnswer.third]] += 1;
    }
  });

  const totalPoints = Object.values(rawPoints).reduce((sum, p) => sum + p, 0) || 1;

  const scoreList: RiasecScore[] = (['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]).map((type) => {
    const pts = rawPoints[type];
    const pct = Math.round((pts / totalPoints) * 100);
    return {
      type,
      label: RIASEC_TYPE_LABELS[type],
      shortDesc: getTypeShortDesc(type),
      points: pts,
      percentage: pct,
      color: RIASEC_COLORS[type].primary,
      bgColor: RIASEC_COLORS[type].bgSoft,
      borderColor: RIASEC_COLORS[type].border,
    };
  });

  // Sort descending by points, then percentage
  const sortedScores = [...scoreList].sort((a, b) => b.points - a.points);

  const scoresRecord = scoreList.reduce((acc, curr) => {
    acc[curr.type] = curr;
    return acc;
  }, {} as Record<RiasecType, RiasecScore>);

  const primaryType = sortedScores[0].type;
  const secondaryType = sortedScores[1].type;
  const tertiaryType = sortedScores[2].type;
  const hollandCode = `${primaryType}-${secondaryType}-${tertiaryType}`;

  return {
    scores: scoresRecord,
    sortedScores,
    primaryType,
    secondaryType,
    tertiaryType,
    hollandCode,
    completedAt: new Date().toISOString(),
  };
}

function getTypeShortDesc(type: RiasecType): string {
  switch (type) {
    case 'R':
      return 'Prático, concreto, manual, atividades ao ar livre e mecânica';
    case 'I':
      return 'Analítico, científico, investigativo e pensamento lógico';
    case 'A':
      return 'Criativo, expressivo, original, artístico e sensibilidade visual';
    case 'S':
      return 'Empático, acolhedor, comunicativo, ensino e ajuda ao próximo';
    case 'E':
      return 'Líder, negociador, dinâmico, persuasão e visão de negócios';
    case 'C':
      return 'Organizado, metódico, preciso, rotinas, dados e processos';
  }
}
