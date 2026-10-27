import { ProfileDetail, QuestionBlock, RiasecType, ParticipantStat } from '../types/riasec';

export const RIASEC_TYPE_LABELS: Record<RiasecType, string> = {
  R: 'Realista',
  I: 'Investigativo',
  A: 'Artístico',
  S: 'Social',
  E: 'Empreendedor',
  C: 'Convencional',
};

export const RIASEC_COLORS: Record<RiasecType, { primary: string; light: string; border: string; bgSoft: string }> = {
  R: { primary: '#2563EB', light: '#93C5FD', border: '#1D4ED8', bgSoft: '#EFF6FF' }, // Azul / Realista
  I: { primary: '#0D9488', light: '#5EEAD4', border: '#0F766E', bgSoft: '#F0FDFA' }, // Verde-Água / Investigativo
  A: { primary: '#D97706', light: '#FCD34D', border: '#B45309', bgSoft: '#FFFBEB' }, // Dourado-Âmbar / Artístico
  S: { primary: '#10B981', light: '#6EE7B7', border: '#059669', bgSoft: '#ECFDF5' }, // Esmeralda / Social
  E: { primary: '#E11D48', light: '#FDA4AF', border: '#BE123C', bgSoft: '#FFF1F2' }, // Rubi-Coral / Empreendedor
  C: { primary: '#7C3AED', light: '#C4B5FD', border: '#6D28D9', bgSoft: '#F5F3FF' }, // Roxo-Índigo / Convencional
};

export const DEFAULT_BLOCKS: QuestionBlock[] = [
  {
    blockNumber: 1,
    title: 'Grupo 1 - Preferências Iniciais de Trabalho',
    subtitle: 'Ordene as 3 afirmações que mais representam seu estilo de atuação:',
    questions: [
      { id: 'b1_r', letter: 'R', title: 'Trabalhar com ferramentas, maquinários, instrumentos ou atividades práticas ao ar livre.' },
      { id: 'b1_i', letter: 'I', title: 'Analisar problemas complexos, pesquisar causas científicas e buscar explicações lógicas.' },
      { id: 'b1_a', letter: 'A', title: 'Criar obras originais, desenhar, escrever ou expressar sentimentos através de formas artísticas.' },
      { id: 'b1_s', letter: 'S', title: 'Ajudar pessoas a superar dificuldades, ensinar conhecimentos e promover a cooperação humana.' },
      { id: 'b1_e', letter: 'E', title: 'Liderar grupos, negociar acordos comerciais e convencer outros a atingir metas desafiadoras.' },
      { id: 'b1_c', letter: 'C', title: 'Organizar documentos, manter registros precisos, seguir procedimentos e controlar dados com exatidão.' },
    ],
  },
  {
    blockNumber: 2,
    title: 'Grupo 2 - Atividades Cotidianas e Habilidades',
    subtitle: 'Quais destas situações despertam maior interesse em você?',
    questions: [
      { id: 'b2_r', letter: 'R', title: 'Montar, desmontar ou consertar aparelhos mecânicos, elétricos ou estruturas físicas.' },
      { id: 'b2_i', letter: 'I', title: 'Ler artigos científicos, investigar teorias ou conduzir experimentos de laboratório.' },
      { id: 'b2_a', letter: 'A', title: 'Desenvolver conceitos visuais, compor músicas, atuar ou criar soluções fora do convencional.' },
      { id: 'b2_s', letter: 'S', title: 'Trabalhar voluntariamente em causas comunitárias ou orientar jovens em suas escolhas.' },
      { id: 'b2_e', letter: 'E', title: 'Abrir seu próprio negócio, administrar orçamentos e coordenar equipes de vendas.' },
      { id: 'b2_c', letter: 'C', title: 'Criar e alimentar planilhas estruturadas, gerir estoques e assegurar o cumprimento de normas.' },
    ],
  },
  {
    blockNumber: 3,
    title: 'Grupo 3 - Ambiente de Trabalho Preferido',
    subtitle: 'Em que tipo de atmosfera profissional você se sente mais produtivo?',
    questions: [
      { id: 'b3_r', letter: 'R', title: 'Oficinas, canteiros de obras, fazendas, laboratórios técnicos ou ambientes abertos.' },
      { id: 'b3_i', letter: 'I', title: 'Centros de pesquisa e desenvolvimento, bibliotecas científicas ou centros analíticos.' },
      { id: 'b3_a', letter: 'A', title: 'Estúdios de design, redações, teatros, ateliês ou agências criativas sem rotinas rígidas.' },
      { id: 'b3_s', letter: 'S', title: 'Escolas, hospitais, clínicas, centros comunitários ou espaços de acolhimento social.' },
      { id: 'b3_e', letter: 'E', title: 'Salas de reunião executivas, feiras de negócios, eventos de networking e mercados corporativos.' },
      { id: 'b3_c', letter: 'C', title: 'Escritórios organizados, departamentos contábeis, cartórios ou setores de conformidade regulatória.' },
    ],
  },
  {
    blockNumber: 4,
    title: 'Grupo 4 - Resolução de Desafios',
    subtitle: 'Diante de um desafio novo, qual abordagem você tende a adotar primeiro?',
    questions: [
      { id: 'b4_r', letter: 'R', title: 'Colocar a mão na massa imediatamente e testar fisicamente a solução prática.' },
      { id: 'b4_i', letter: 'I', title: 'Coletar dados aprofundados, verificar hipóteses e deduzir uma teoria consistente.' },
      { id: 'b4_a', letter: 'A', title: 'Imaginar saídas inovadoras e visuais que rompam com as fórmulas tradicionais.' },
      { id: 'b4_s', letter: 'S', title: 'Conversar com as pessoas envolvidas para compreender suas necessidades emocionais e coletivas.' },
      { id: 'b4_e', letter: 'E', title: 'Mobilizar recursos, delegar funções e entusiasmar o grupo para vencer o obstáculo com velocidade.' },
      { id: 'b4_c', letter: 'C', title: 'Consultar o manual de instruções, seguir o roteiro pré-estabelecido e auditar os passos.' },
    ],
  },
  {
    blockNumber: 5,
    title: 'Grupo 5 - Valores e Motivações no Trabalho',
    subtitle: 'O que traz mais satisfação e sentido para sua carreira?',
    questions: [
      { id: 'b5_r', letter: 'R', title: 'Ver o resultado concreto e tangível daquilo que você construiu ou consertou com suas próprias mãos.' },
      { id: 'b5_i', letter: 'I', title: 'Desvendar mistérios intelectuais e alcançar a compreensão profunda de como as coisas funcionam.' },
      { id: 'b5_a', letter: 'A', title: 'Ter liberdade total de imaginação sem precisar se moldar a padrões burocráticos engessados.' },
      { id: 'b5_s', letter: 'S', title: 'Saber que seu trabalho transformou positivamente a vida, a saúde ou o bem-estar de alguém.' },
      { id: 'b5_e', letter: 'E', title: 'Alcançar posições de prestígio, autonomia de comando e conquistar bons retornos financeiros.' },
      { id: 'b5_c', letter: 'C', title: 'Manter a ordem, a previsibilidade, a segurança e a precisão impecável em todas as entregas.' },
    ],
  },
  {
    blockNumber: 6,
    title: 'Grupo 6 - Como os Outros Enxergam Você',
    subtitle: 'Com qual descrição seus colegas e amigos mais costumam concordar?',
    questions: [
      { id: 'b6_r', letter: 'R', title: 'Uma pessoa prática, direta, confiável e habilidosa para resolver problemas materiais.' },
      { id: 'b6_i', letter: 'I', title: 'Uma pessoa curiosa, observadora, reflexiva e dona de raciocínio lógico afiado.' },
      { id: 'b6_a', letter: 'A', title: 'Uma pessoa expressiva, sensível, criativa e com visão estética apurada.' },
      { id: 'b6_s', letter: 'S', title: 'Uma pessoa acolhedora, ouvinte atenta, prestativa e paciente com as diferenças.' },
      { id: 'b6_e', letter: 'E', title: 'Uma pessoa comunicativa, articulada, enérgica e com espírito natural de liderança.' },
      { id: 'b6_c', letter: 'C', title: 'Uma pessoa meticulosa, pontual, criteriosa e muito responsável com prazos e normas.' },
    ],
  },
  {
    blockNumber: 7,
    title: 'Grupo 7 - Projetos e Atividades Práticas',
    subtitle: 'Se você pudesse escolher um projeto para se dedicar neste mês, qual seria?',
    questions: [
      { id: 'b7_r', letter: 'R', title: 'Construir um protótipo físico, restaurar um veículo ou instalar uma infraestrutura tecnológica.' },
      { id: 'b7_i', letter: 'I', title: 'Conduzir um estudo aprofundado com modelagem estatística para testar uma nova hipótese científica.' },
      { id: 'b7_a', letter: 'A', title: 'Produzir uma campanha artística com fotografia, vídeo, ilustração ou redação poética.' },
      { id: 'b7_s', letter: 'S', title: 'Organizar uma oficina educacional para capacitar pessoas em vulnerabilidade.' },
      { id: 'b7_e', letter: 'E', title: 'Lançar uma startup ou produto inovador no mercado e negociar parcerias estratégicas.' },
      { id: 'b7_c', letter: 'C', title: 'Auditar processos internos, padronizar fluxos de trabalho e catalogar bases de dados essenciais.' },
    ],
  },
  {
    blockNumber: 8,
    title: 'Grupo 8 - Aprendizado e Cursos de Interesse',
    subtitle: 'Qual destes temas despertaria mais seu entusiasmo numa capacitação?',
    questions: [
      { id: 'b8_r', letter: 'R', title: 'Operação de maquinário de precisão, robótica aplicada, marcenaria fina ou eletrotécnica.' },
      { id: 'b8_i', letter: 'I', title: 'Bioinformática, física quântica, genética molecular ou métodos avançados de pesquisa.' },
      { id: 'b8_a', letter: 'A', title: 'Design gráfico conceitual, cinema e roteiro, pintura contemporânea ou produção musical.' },
      { id: 'b8_s', letter: 'S', title: 'Psicologia do desenvolvimento, dinâmicas de grupo, mediação de conflitos e inclusão.' },
      { id: 'b8_e', letter: 'E', title: 'Técnicas avançadas de negociação, gestão executiva de projetos e persuasão em vendas.' },
      { id: 'b8_c', letter: 'C', title: 'Controladoria contábil, gestão tributária, modelagem de banco de dados e auditoria fiscal.' },
    ],
  },
  {
    blockNumber: 9,
    title: 'Grupo 9 - Lazer e Passatempos',
    subtitle: 'Em seu tempo livre, qual destas ocupações mais lhe atrai?',
    questions: [
      { id: 'b9_r', letter: 'R', title: 'Cuidar de plantas e animais, praticar esportes de aventura ou consertar coisas em casa.' },
      { id: 'b9_i', letter: 'I', title: 'Jogar xadrez, resolver quebra-cabeças complexos, ler artigos investigativos ou documentários densos.' },
      { id: 'b9_a', letter: 'A', title: 'Visitar museus de arte, tocar um instrumento, fotografar paisagens ou escrever contos.' },
      { id: 'b9_s', letter: 'S', title: 'Reunir amigos para longas conversas, ouvir desabafos e prestar apoio a quem precisa.' },
      { id: 'b9_e', letter: 'E', title: 'Acompanhar notícias do mercado financeiro, debater política ou organizar eventos sociais concorridos.' },
      { id: 'b9_c', letter: 'C', title: 'Organizar coleções com critérios rígidos, planejar detalhadamente itinerários de viagem e orçamentos.' },
    ],
  },
  {
    blockNumber: 10,
    title: 'Grupo 10 - Postura em Reuniões de Trabalho',
    subtitle: 'Como você geralmente contribui quando participa de um encontro com a equipe?',
    questions: [
      { id: 'b10_r', letter: 'R', title: 'Foco na viabilidade técnica: saber se temos os materiais, o maquinário e o tempo real de execução.' },
      { id: 'b10_i', letter: 'I', title: 'Questionamento criterioso: analisar se os argumentos estão respaldados em evidências sólidas.' },
      { id: 'b10_a', letter: 'A', title: 'Provocação criativa: sugerir caminhos estéticos e visuais que fujam do lugar-comum.' },
      { id: 'b10_s', letter: 'S', title: 'Cuidado interpessoal: garantir que todos tenham voz e que o clima seja harmonioso e empático.' },
      { id: 'b10_e', letter: 'E', title: 'Direcionamento executivo: focar nas metas financeiras, delegar tarefas e acelerar a tomada de decisão.' },
      { id: 'b10_c', letter: 'C', title: 'Rigor de pauta: registrar a ata, monitorar os prazos e assegurar conformidade com as diretrizes.' },
    ],
  },
  {
    blockNumber: 11,
    title: 'Grupo 11 - O Que Você Menos Tolera no Trabalho',
    subtitle: 'Qual das opções abaixo mais representaria um ambiente desestimulante para você?',
    questions: [
      { id: 'b11_r', letter: 'R', title: 'Passar o dia inteiro apenas conversando em salas fechadas sem nunca produzir algo físico real.' },
      { id: 'b11_i', letter: 'I', title: 'Ter que aceitar decisões baseadas em palpites e crenças sem nenhuma comprovação empírica.' },
      { id: 'b11_a', letter: 'A', title: 'Ser forçado a seguir regras cegas e engessadas que eliminam qualquer espaço de criação.' },
      { id: 'b11_s', letter: 'S', title: 'Trabalhar em um ambiente individualista, frio e competitivo onde as pessoas não se importam com as outras.' },
      { id: 'b11_e', letter: 'E', title: 'Ficar preso a rotinas repetitivas sem autonomia para inovar ou negociar novos horizontes.' },
      { id: 'b11_c', letter: 'C', title: 'Trabalhar em um ambiente caótico, desorganizado, sem processos claros e com prazos imprevisíveis.' },
    ],
  },
  {
    blockNumber: 12,
    title: 'Grupo 12 - Visão de Futuro e Realização Profissional',
    subtitle: 'Ao olhar para trás no auge da sua carreira, o que você mais gostaria de ter realizado?',
    questions: [
      { id: 'b12_r', letter: 'R', title: 'Ter construído obras sólidas, maquinários eficientes ou tecnologias tangíveis de grande utilidade.' },
      { id: 'b12_i', letter: 'I', title: 'Ter descoberto um princípio novo, desenvolvido uma tese relevante ou solucionado um enigma do conhecimento.' },
      { id: 'b12_a', letter: 'A', title: 'Ter criado uma obra memorável, inspirado pessoas pela beleza estética e originalidade da minha visão.' },
      { id: 'b12_s', letter: 'S', title: 'Ter formado gerações de alunos, acolhido pessoas em sofrimento e tornado a comunidade mais justa.' },
      { id: 'b12_e', letter: 'E', title: 'Ter construído uma organização próspera, liderado grandes equipes e deixado um legado empreendedor.' },
      { id: 'b12_c', letter: 'C', title: 'Ter estruturado sistemas perfeitamente organizados, com integridade e estabilidade operacional exemplar.' },
    ],
  },
];

export const PROFILES_DETAIL: Record<RiasecType, ProfileDetail> = {
  R: {
    type: 'R',
    name: 'Realista (Prático / Executor)',
    tagline: 'Foco na ação prática, ferramentas, máquinas e resultados tangíveis.',
    color: '#2563EB',
    iconName: 'Wrench',
    description: `As pessoas com perfil Realista são práticas, objetivas, concretas e orientadas para a ação. Elas preferem trabalhar com objetos físicos, ferramentas manuais ou motorizadas, aparelhos eletrônicos, plantas, animais ou atividades ao ar livre. Geralmente possuem excelente coordenação motora, aptidão mecânica e raciocínio espacial, valorizando soluções diretas para problemas do mundo real em vez de discussões puramente teóricas ou abstratas.`,
    personalityTraits: [
      'Pragmático, objetivo e focado em fatos observáveis',
      'Excelente coordenação físico-motora e visão espacial',
      'Apreciação pela natureza, atividades ao ar livre ou oficinas',
      'Comunicação direta, franca e sem rodeios',
      'Autonomia e perseverança diante de desafios mecânicos e construtivos',
    ],
    workPreferences: [
      'Operar, calibrar e reparar equipamentos e maquinários industriais',
      'Construção civil, montagem e manutenção de sistemas físicos',
      'Atividades agrícolas, florestais, ambientais ou veterinárias de campo',
      'Ambientes dinâmicos onde é possível ver o progresso tangível do trabalho',
    ],
    keySkills: [
      'Habilidade mecânica e elétrica',
      'Precisão manual e uso de instrumental técnico',
      'Raciocínio lógico-espacial e geométrico',
      'Diagnóstico prático de falhas operacionais',
    ],
    idealEnvironments: [
      'Canteiros de obras e projetos de engenharia civil',
      'Indústrias automobilísticas, aeroespaciais e de manufatura',
      'Oficinas mecânicas e laboratórios de robótica aplicada',
      'Campos agrícolas, reservas florestais e fazendas sustentáveis',
    ],
    recommendedCareers: [
      {
        category: 'Engenharias & Tecnologia Aplicada',
        jobs: ['Engenheiro Mecânico', 'Engenheiro Civil', 'Engenheiro Agrônomo', 'Engenheiro de Produção', 'Técnico em Mecatrônica'],
      },
      {
        category: 'Infraestrutura & Operações',
        jobs: ['Piloto de Aeronaves', 'Eletricista Industrial', 'Técnico em Telecomunicações', 'Operador de Maquinário Pesado', 'Mestre de Obras'],
      },
      {
        category: 'Recursos Naturais & Meio Ambiente',
        jobs: ['Zootecnista', 'Engenheiro Florestal', 'Geólogo de Campo', 'Técnico em Agropecuária', 'Guarda Ambiental'],
      },
    ],
    higherEducationCourses: ['Engenharia Mecânica', 'Engenharia Civil', 'Agronomia', 'Engenharia Florestal', 'Geologia', 'Educação Física'],
    technicalCourses: ['Técnico em Eletrotécnica', 'Técnico em Mecânica Industrial', 'Técnico em Edificações', 'Técnico em Agropecuária', 'Técnico em Manutenção Automotiva'],
  },
  I: {
    type: 'I',
    name: 'Investigativo (Analítico / Pensador)',
    tagline: 'Foco na ciência, pesquisa, raciocínio lógico e compreensão abstrata.',
    color: '#0D9488',
    iconName: 'Microscope',
    description: `Indivíduos com perfil Investigativo têm profunda curiosidade intelectual, mente analítica e espírito científico. Sentem enorme prazer em estudar fenômenos naturais, coletar evidências, testar hipóteses, resolver equações e formular teorias. Valorizam a lógica, a independência de pensamento e a precisão do conhecimento, buscando constantemente entender as leis fundamentais que regem o universo, a biologia ou a computação.`,
    personalityTraits: [
      'Intelectualmente curioso, observador e analítico',
      'Ceticismo saudável e busca constante por evidências empíricas',
      'Preferência pelo trabalho reflexivo e autônomo',
      'Paciência para mergulhar em problemas abstratos e intrincados',
      'Rigor metodológico e precisão conceitual',
    ],
    workPreferences: [
      'Pesquisar e desenvolver novas tecnologias e fármacos',
      'Analisar grandes volumes de dados (Data Science) e modelar fenômenos',
      'Diagnosticar doenças e realizar análises laboratoriais clínicas',
      'Escrever relatórios científicos e artigos acadêmicos',
    ],
    keySkills: [
      'Análise crítica e raciocínio dedutivo/indutivo',
      'Estatística e modelagem matemática',
      'Metodologia científica e redação de artigos técnicos',
      'Programação científica e análise computacional de dados',
    ],
    idealEnvironments: [
      'Institutos de pesquisa e centros universitários (USP, Unicamp, Fiocruz, Embrapa)',
      'Laboratórios clínicos, farmacêuticos e biotecnológicos',
      'Departamentos de Inteligência de Dados e P&D empresarial',
      'Centros de astronomia, meteorologia e geofísica',
    ],
    recommendedCareers: [
      {
        category: 'Ciências da Saúde & Biológicas',
        jobs: ['Médico Pesquisador', 'Biomédico', 'Biólogo Geneticista', 'Farmacêutico Bioquímico', 'Epidemiologista'],
      },
      {
        category: 'Ciências Exatas & Dados',
        jobs: ['Cientista de Dados', 'Estatístico', 'Físico Teórico/Experimental', 'Químico de Pesquisa', 'Matemático Aplicado'],
      },
      {
        category: 'Tecnologia da Informação & Computação',
        jobs: ['Engenheiro de Inteligência Artificial', 'Arquiteto de Software', 'Criptógrafo', 'Pesquisador de Cibersegurança'],
      },
    ],
    higherEducationCourses: ['Medicina', 'Biotecnologia', 'Ciência da Computação', 'Física', 'Química', 'Estatística / Ciência de Dados', 'Ciências Biológicas'],
    technicalCourses: ['Técnico em Análises Clínicas', 'Técnico em Biotecnologia', 'Técnico em Desenvolvimento de Sistemas', 'Técnico em Química'],
  },
  A: {
    type: 'A',
    name: 'Artístico (Criativo / Expressivo)',
    tagline: 'Foco na originalidade, sensibilidade estética e expressão livre.',
    color: '#D97706',
    iconName: 'Palette',
    description: `O perfil Artístico é marcado pela imaginação vívida, originalidade, inconformismo e refinada sensibilidade estética. Pessoas desse tipo apreciam ambientes livres de regras rígidas e rotinas burocráticas, onde possam manifestar suas ideias, emoções e conceitos por meio de palavras, cores, sons, movimentos ou formas visuais. Elas enxergam o mundo com lentes singulares, desafiando convenções para criar experiências transformadoras.`,
    personalityTraits: [
      'Criativo, intuitivo, original e não conformista',
      'Sensibilidade aguçada para harmonia, ritmo, cor e proporção',
      'Necessidade de independência e autonomia expressiva',
      'Aversão a rotinas repetitivas e procedimentos burocráticos engessados',
      'Abertura à ambiguidade e à exploração de novas linguagens',
    ],
    workPreferences: [
      'Desenvolver identidades visuais, ilustrações e projetos arquitetônicos',
      'Escrever roteiros, ficção, poesias ou peças publicitárias envolventes',
      'Compor trilhas sonoras, atuar, dançar ou dirigir produções audiovisuais',
      'Criar interfaces digitais interativas (UI/UX) esteticamente inovadoras',
    ],
    keySkills: [
      'Expressão visual e domínio de softwares criativos (Adobe, Figma, 3D)',
      'Escrita criativa e storytelling envolvente',
      'Composição musical e sensibilidade acústica',
      'Pensamento lateral e concepção estética inovadora',
    ],
    idealEnvironments: [
      'Estúdios de design gráfico, produto e animação',
      'Agências de publicidade, marketing de conteúdo e branding',
      'Escritórios de arquitetura e design de interiores',
      'Produtoras audiovisuais, estúdios de gravação e companhias de teatro',
    ],
    recommendedCareers: [
      {
        category: 'Design & Artes Visuais',
        jobs: ['Designer Gráfico', 'Designer de UI/UX', 'Arquiteto & Urbanista', 'Ilustrador Digital', 'Designer de Moda'],
      },
      {
        category: 'Comunicação & Escrita',
        jobs: ['Roteirista Audiovisual', 'Redator Publicitário (Copywriter)', 'Jornalista Cultural', 'Tradutor Literário'],
      },
      {
        category: 'Artes Cênicas & Música',
        jobs: ['Diretor de Cinema / Vídeo', 'Músico & Produtor Musical', 'Ator / Dublador', 'Cenógrafo', 'Fotógrafo Profissional'],
      },
    ],
    higherEducationCourses: ['Design Gráfico / Digital', 'Arquitetura e Urbanismo', 'Cinema e Audiovisual', 'Música', 'Artes Visuais', 'Publicidade e Propaganda'],
    technicalCourses: ['Técnico em Design Gráfico', 'Técnico em Produção de Áudio e Vídeo', 'Técnico em Artes Dramáticas', 'Técnico em Design de Interiores'],
  },
  S: {
    type: 'S',
    name: 'Social (Humanitário / Comunicador)',
    tagline: 'Foco na empatia, no acolhimento, no ensino e no desenvolvimento humano.',
    color: '#10B981',
    iconName: 'HeartHandshake',
    description: `As pessoas de perfil Social são profundamente empáticas, acolhedoras, generosas e comunicativas. Elas encontram seu maior propósito ao apoiar, curar, educar, orientar e promover o bem-estar coletivo. Sentem-se realizadas em trabalhos com forte interação humana, dinâmicas de grupo, mediação de conflitos e causas que promovam a justiça social e o desenvolvimento pleno do potencial humano.`,
    personalityTraits: [
      'Empático, acolhedor, solidário e compreensivo',
      'Facilidade natural de escuta ativa e comunicação interpessoal',
      'Gosto por trabalho colaborativo em equipe',
      'Paciência com as vulnerabilidades e ritmos individuais',
      'Vocação para o serviço humanitário e a promoção da igualdade',
    ],
    workPreferences: [
      'Lecionar, alfabetizar, ministrar treinamentos e tutorias',
      'Oferecer atendimento psicológico, psicoterapia ou aconselhamento de carreira',
      'Cuidar da saúde física e reabilitação de pacientes (enfermagem, fisioterapia)',
      'Mediar conflitos comunitários e desenvolver projetos de assistência social',
    ],
    keySkills: [
      'Comunicação não-violenta e escuta empática',
      'Didática pedagógica e facilitação de grupos',
      'Mediação de conflitos e resolução pacífica',
      'Diagnóstico de necessidades socioemocionais',
    ],
    idealEnvironments: [
      'Escolas, universidades e institutos de formação continuada',
      'Hospitais, unidades básicas de saúde (SUS) e clínicas integradas',
      'ONGs, fundações de assistência e órgãos de direitos humanos',
      'Departamentos de Desenvolvimento Humano e Organizacional (DHO/RH)',
    ],
    recommendedCareers: [
      {
        category: 'Educação & Pedagogia',
        jobs: ['Professor (Educação Básica ao Ensino Superior)', 'Pedagogo', 'Orientador Educacional', 'Instrutor de Treinamento'],
      },
      {
        category: 'Saúde Humanizada & Terapia',
        jobs: ['Psicólogo Clínico / Organizacional', 'Enfermeiro', 'Fisioterapeuta', 'Fonoaudiólogo', 'Terapeuta Ocupacional'],
      },
      {
        category: 'Ação Social & Gestão de Pessoas',
        jobs: ['Assistente Social', 'Especialista em Diversidade e Inclusão (D&I)', 'Mediador de Conflitos', 'Gestor de Recursos Humanos'],
      },
    ],
    higherEducationCourses: ['Psicologia', 'Pedagogia', 'Enfermagem', 'Serviço Social', 'Fisioterapia', 'Terapia Ocupacional', 'Fonoaudiologia'],
    technicalCourses: ['Técnico em Enfermagem', 'Técnico em Recursos Humanos', 'Técnico em Cuidados de Idosos', 'Técnico em Orientação Comunitária'],
  },
  E: {
    type: 'E',
    name: 'Empreendedor (Líder / Persuasivo)',
    tagline: 'Foco na liderança, metas arrojadas, influência e negócios.',
    color: '#E11D48',
    iconName: 'TrendingUp',
    description: `Indivíduos do perfil Empreendedor são energéticos, ambiciosos, carismáticos e articulados. Eles têm talento nato para liderar pessoas, assumir riscos estratégicos, fechar negócios e influenciar decisões em direção a objetivos econômicos ou organizacionais. Sentem atração pelo poder de realização, pela competição saudável e pela autonomia para gerenciar projetos, equipes e novos empreendimentos no mercado.`,
    personalityTraits: [
      'Proativo, confiante, persuasivo e comunicativo',
      'Facilidade de persuasão e negociação sob pressão',
      'Visão estratégica de oportunidades de mercado',
      'Gosto por desafios competitivos e superação de metas',
      'Gosto pela liderança e capacidade de delegar tarefas',
    ],
    workPreferences: [
      'Fundar ou acelerar startups e empresas inovadoras',
      'Negociar contratos comerciais, fusões e parcerias estratégicas',
      'Gerenciar equipes multidisciplinares com foco em metas e resultados',
      'Desenvolver campanhas de marketing e vendas em escala',
    ],
    keySkills: [
      'Liderança executiva e inteligência emocional comercial',
      'Oratória persuasiva e técnicas de negociação',
      'Gestão de riscos e visão financeira estratégica',
      'Tomada de decisão ágil em ambientes incertos',
    ],
    idealEnvironments: [
      'Startups, aceleradoras de negócios e fundos de Venture Capital',
      'Diretorias executivas de médias e grandes empresas',
      'Mercado financeiro, corretoras e bancos de investimento',
      'Bancas de advocacia empresarial e consultorias de gestão',
    ],
    recommendedCareers: [
      {
        category: 'Gestão Executiva & Negócios',
        jobs: ['CEO / Diretor Executivo', 'Gerente Geral de Operações', 'Consultor Empresarial', 'Gestor de Produtos (Product Manager)'],
      },
      {
        category: 'Comercial & Vendas Estratégicas',
        jobs: ['Diretor Comercial', 'Executivo de Vendas B2B', 'Corretor de Imóveis de Alto Padrão', 'Gestor de Franquias'],
      },
      {
        category: 'Direito & Relações Públicas',
        jobs: ['Advogado Corporativo / Tributarista', 'Relações Públicas Institucional', 'Político / Gestor Público', 'Lobbyist Regulatório'],
      },
    ],
    higherEducationCourses: ['Administração de Empresas', 'Direito', 'Economia', 'Relações Internacionais', 'Marketing', 'Engenharia de Produção'],
    technicalCourses: ['Técnico em Vendas', 'Técnico em Comércio Exterior', 'Técnico em Transações Imobiliárias', 'Técnico em Marketing'],
  },
  C: {
    type: 'C',
    name: 'Convencional (Organizado / Metódico)',
    tagline: 'Foco na precisão, na conformidade, em fluxos de trabalho e dados.',
    color: '#7C3AED',
    iconName: 'ClipboardCheck',
    description: `Pessoas com perfil Convencional destacam-se pelo apreço à ordem, organização, rigor metodológico e atenção minuciosa aos detalhes. Elas sentem segurança ao trabalhar em ambientes estruturados com normas claras, processos bem delimitados, dados exatos e rotinas previsíveis. Possuem alta confiabilidade na gestão de finanças, controle documental, auditorias e conformidade regulatória.`,
    personalityTraits: [
      'Metódico, pontual, prudente e confiável',
      'Extrema atenção aos detalhes e baixa tolerância a erros',
      'Apreço pela estabilidade, segurança e processos consolidados',
      'Facilidade para lidar com números, dados fiscais e tabelas',
      'Rigor com regras, leis, políticas e prazos estabelecidos',
    ],
    workPreferences: [
      'Auditar demonstrações contábeis e conformidade fiscal',
      'Alimentar, estruturar e gerir bancos de dados e sistemas de ERP',
      'Controlar orçamentos, fluxos de caixa e inventários físicos',
      'Assegurar o cumprimento estrito de normas ISO e leis trabalhistas/LGPD',
    ],
    keySkills: [
      'Contabilidade, auditoria e cálculo atuarial',
      'Domínio avançado de planilhas (Excel) e sistemas ERP (SAP/Totvs)',
      'Organização e indexação de dados e arquivos corporativos',
      'Compliance regulatório e verificação de conformidade',
    ],
    idealEnvironments: [
      'Escritórios de contabilidade e empresas de auditoria (Big Four)',
      'Departamentos de Controladoria e Finanças corporativas',
      'Instituições financeiras, bancos e cooperativas de crédito',
      'Órgãos públicos federais/estaduais, cartórios e tribunais de contas',
    ],
    recommendedCareers: [
      {
        category: 'Contabilidade & Controladoria',
        jobs: ['Contador / Controller', 'Auditor Fiscal / Independente', 'Perito Contábil', 'Analista de Custos'],
      },
      {
        category: 'Gestão Financeira & Riscos',
        jobs: ['Analista de Crédito & Risco', 'Atuário', 'Tesoureiro Corporativo', 'Operador de Backoffice Financeiro'],
      },
      {
        category: 'Processos & Conformidade',
        jobs: ['Analista de Compliance & LGPD', 'Arquivista / Gestor de Documentação', 'Analista de Logística e Estoque', 'Escrivão / Técnico Judiciário'],
      },
    ],
    higherEducationCourses: ['Ciências Contábeis', 'Administração de Empresas', 'Ciências Atuariais', 'Gestão Financeira', 'Biblioteconomia / Ciência da Informação'],
    technicalCourses: ['Técnico em Contabilidade', 'Técnico em Finanças', 'Técnico em Serviços Jurídicos', 'Técnico em Logística'],
  },
};

// Cohort benchmark dataset replicating the original statistical engine from Statistiques.php
// (Polytech/Escolas, cursos de engenharia e áreas, anos letivos, gêneros, pontuações)
export const COHORT_STATS_SAMPLE: ParticipantStat[] = [
  // Engenharia & Tecnologia (Polytech / Politécnica)
  { id: '1', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia de Computação', yearOfStudy: 4, gender: 'Masculino', dominantType: 'I', scores: { R: 18, I: 28, A: 10, S: 6, E: 12, C: 16 } },
  { id: '2', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia de Computação', yearOfStudy: 3, gender: 'Feminino', dominantType: 'I', scores: { R: 14, I: 26, A: 14, S: 10, E: 8, C: 18 } },
  { id: '3', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia Mecânica', yearOfStudy: 5, gender: 'Masculino', dominantType: 'R', scores: { R: 30, I: 18, A: 4, S: 6, E: 14, C: 18 } },
  { id: '4', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia Mecânica', yearOfStudy: 2, gender: 'Feminino', dominantType: 'R', scores: { R: 26, I: 20, A: 8, S: 8, E: 12, C: 16 } },
  { id: '5', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia Civil', yearOfStudy: 4, gender: 'Masculino', dominantType: 'R', scores: { R: 28, I: 16, A: 8, S: 6, E: 18, C: 14 } },
  { id: '6', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia Civil', yearOfStudy: 1, gender: 'Feminino', dominantType: 'R', scores: { R: 24, I: 18, A: 12, S: 10, E: 14, C: 12 } },
  { id: '7', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia Elétrica & Automação', yearOfStudy: 3, gender: 'Masculino', dominantType: 'I', scores: { R: 24, I: 26, A: 6, S: 4, E: 12, C: 18 } },
  { id: '8', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia de Produção', yearOfStudy: 4, gender: 'Feminino', dominantType: 'E', scores: { R: 12, I: 16, A: 8, S: 14, E: 24, C: 16 } },
  { id: '9', school: 'Escola Politécnica (Engenharias)', field: 'Engenharia de Produção', yearOfStudy: 5, gender: 'Masculino', dominantType: 'E', scores: { R: 14, I: 14, A: 6, S: 10, E: 26, C: 20 } },
  { id: '10', school: 'Escola Politécnica (Engenharias)', field: 'Biotecnologia & Alimentos', yearOfStudy: 3, gender: 'Feminino', dominantType: 'I', scores: { R: 16, I: 28, A: 10, S: 14, E: 8, C: 14 } },
  
  // Ciências da Saúde & Humanas
  { id: '11', school: 'Faculdade de Ciências da Saúde', field: 'Medicina', yearOfStudy: 4, gender: 'Feminino', dominantType: 'I', scores: { R: 12, I: 26, A: 6, S: 24, E: 10, C: 12 } },
  { id: '12', school: 'Faculdade de Ciências da Saúde', field: 'Medicina', yearOfStudy: 2, gender: 'Masculino', dominantType: 'S', scores: { R: 10, I: 22, A: 6, S: 26, E: 12, C: 14 } },
  { id: '13', school: 'Faculdade de Ciências da Saúde', field: 'Enfermagem', yearOfStudy: 3, gender: 'Feminino', dominantType: 'S', scores: { R: 8, I: 16, A: 8, S: 32, E: 8, C: 18 } },
  { id: '14', school: 'Faculdade de Ciências da Saúde', field: 'Psicologia', yearOfStudy: 4, gender: 'Feminino', dominantType: 'S', scores: { R: 4, I: 20, A: 16, S: 32, E: 8, C: 10 } },
  { id: '15', school: 'Faculdade de Ciências da Saúde', field: 'Psicologia', yearOfStudy: 3, gender: 'Masculino', dominantType: 'S', scores: { R: 6, I: 18, A: 18, S: 30, E: 10, C: 8 } },
  { id: '16', school: 'Faculdade de Ciências da Saúde', field: 'Fisioterapia', yearOfStudy: 2, gender: 'Feminino', dominantType: 'S', scores: { R: 18, I: 14, A: 6, S: 28, E: 10, C: 14 } },

  // Negócios, Gestão & Direito
  { id: '17', school: 'Escola de Negócios & Direito', field: 'Administração de Empresas', yearOfStudy: 3, gender: 'Masculino', dominantType: 'E', scores: { R: 6, I: 12, A: 8, S: 14, E: 30, C: 20 } },
  { id: '18', school: 'Escola de Negócios & Direito', field: 'Administração de Empresas', yearOfStudy: 4, gender: 'Feminino', dominantType: 'E', scores: { R: 4, I: 14, A: 10, S: 16, E: 28, C: 18 } },
  { id: '19', school: 'Escola de Negócios & Direito', field: 'Direito', yearOfStudy: 5, gender: 'Feminino', dominantType: 'E', scores: { R: 4, I: 20, A: 12, S: 16, E: 24, C: 14 } },
  { id: '20', school: 'Escola de Negócios & Direito', field: 'Ciências Contábeis', yearOfStudy: 3, gender: 'Masculino', dominantType: 'C', scores: { R: 8, I: 14, A: 4, S: 10, E: 18, C: 36 } },
  { id: '21', school: 'Escola de Negócios & Direito', field: 'Ciências Contábeis', yearOfStudy: 4, gender: 'Feminino', dominantType: 'C', scores: { R: 6, I: 16, A: 6, S: 12, E: 16, C: 34 } },
  { id: '22', school: 'Escola de Negócios & Direito', field: 'Marketing & Vendas', yearOfStudy: 2, gender: 'Feminino', dominantType: 'E', scores: { R: 4, I: 10, A: 22, S: 16, E: 28, C: 10 } },

  // Artes, Comunicação & Arquitetura
  { id: '23', school: 'Instituto de Artes & Arquitetura', field: 'Arquitetura e Urbanismo', yearOfStudy: 4, gender: 'Feminino', dominantType: 'A', scores: { R: 18, I: 16, A: 26, S: 10, E: 10, C: 10 } },
  { id: '24', school: 'Instituto de Artes & Arquitetura', field: 'Arquitetura e Urbanismo', yearOfStudy: 5, gender: 'Masculino', dominantType: 'A', scores: { R: 20, I: 14, A: 28, S: 8, E: 10, C: 10 } },
  { id: '25', school: 'Instituto de Artes & Arquitetura', field: 'Design Gráfico & UI', yearOfStudy: 3, gender: 'Feminino', dominantType: 'A', scores: { R: 10, I: 12, A: 34, S: 10, E: 14, C: 10 } },
  { id: '26', school: 'Instituto de Artes & Arquitetura', field: 'Design Gráfico & UI', yearOfStudy: 2, gender: 'Outro', dominantType: 'A', scores: { R: 8, I: 14, A: 36, S: 12, E: 12, C: 8 } },
  { id: '27', school: 'Instituto de Artes & Arquitetura', field: 'Cinema & Audiovisual', yearOfStudy: 3, gender: 'Masculino', dominantType: 'A', scores: { R: 12, I: 10, A: 32, S: 14, E: 14, C: 8 } },
  { id: '28', school: 'Instituto de Artes & Arquitetura', field: 'Publicidade e Propaganda', yearOfStudy: 4, gender: 'Feminino', dominantType: 'E', scores: { R: 6, I: 10, A: 24, S: 14, E: 26, C: 10 } },

  // Participantes Externos & Outras Áreas
  { id: '29', school: 'Candidato Externo (Mercado)', field: 'Tecnologia da Informação', yearOfStudy: 5, gender: 'Masculino', dominantType: 'I', scores: { R: 16, I: 26, A: 12, S: 8, E: 14, C: 14 } },
  { id: '30', school: 'Candidato Externo (Mercado)', field: 'Educação & Pedagogia', yearOfStudy: 5, gender: 'Feminino', dominantType: 'S', scores: { R: 4, I: 16, A: 14, S: 34, E: 10, C: 12 } },
  { id: '31', school: 'Candidato Externo (Mercado)', field: 'Gestão Financeira', yearOfStudy: 5, gender: 'Masculino', dominantType: 'C', scores: { R: 8, I: 16, A: 6, S: 10, E: 20, C: 30 } },
  { id: '32', school: 'Candidato Externo (Mercado)', field: 'Agronegócio', yearOfStudy: 4, gender: 'Masculino', dominantType: 'R', scores: { R: 28, I: 16, A: 6, S: 10, E: 20, C: 10 } },
];
