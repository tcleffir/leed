import emailjs from '@emailjs/browser';

const SERVICE_ID   = 'service_lux_esg';
const TEMPLATE_ID  = 'template_leed_preassessment';
const PUBLIC_KEY   = 'YOUR_EMAILJS_PUBLIC_KEY'; // substituir no painel EmailJS

const DOC_LABEL = {
  estruturada: '✅ Estruturada',
  parcial:     '⚠️  Parcial',
  ausente:     '❌ Ausente',
  verificar:   '🔍 Preciso Verificar',
};

function labelOption(perg, val) {
  if (!val) return '—';
  if (Array.isArray(val)) {
    if (!val.length) return '—';
    return val
      .map((v) => perg.opcoes?.find((o) => o.valor === v)?.label ?? v)
      .join(', ');
  }
  return perg.opcoes?.find((o) => o.valor === val)?.label ?? val;
}

function buildPrereqBlock(prereq, answers, docStatus) {
  const lines = [];
  lines.push(`► ${prereq.codigo} — ${prereq.titulo}`);
  lines.push(`  Documentação: ${DOC_LABEL[docStatus] ?? docStatus}`);
  for (const perg of prereq.perguntas) {
    const raw = answers?.[perg.id];
    if (raw === undefined || raw === null || raw === '' || (Array.isArray(raw) && !raw.length)) continue;
    lines.push(`  • ${perg.pergunta}`);
    lines.push(`    → ${labelOption(perg, raw)}`);
  }
  if (answers?.observacao?.trim()) {
    lines.push(`  Obs: ${answers.observacao.trim()}`);
  }
  return lines.join('\n');
}

function respondenteName(val) {
  const map = {
    gestao_predial: 'Gestão Predial',
    facilities: 'Facilities',
    sustentabilidade: 'Sustentabilidade',
    proprietario: 'Proprietário / Investidor',
    outro: 'Outro',
  };
  return map[val] ?? val ?? 'Não informado';
}

// ─── EmailJS (requer configuração no painel) ─────────────────────────────────
export async function sendAssessmentEmail({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, contact, summary, pdfBase64 }) {
  if (PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') throw new Error('EmailJS não configurado');

  const templateParams = {
    edificio:      basicInfo.nomeEdificio || 'Não informado',
    cidade:        basicInfo.cidade || 'Não informado',
    respondente:   respondenteName(basicInfo.respondente),
    versao_leed:   version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M',
    email_contato: contact.email || '—',
    telefone:      contact.telefone || '—',
    feedback:      contact.feedback || '—',
    score_doc:     `${summary.docScore}%`,
    score_conf:    `${summary.avgCompliance}%`,
    estruturadas:  summary.estruturadaCount,
    parciais:      summary.parcialCount,
    ausentes:      summary.ausenteCount,
    a_verificar:   summary.verificarCount,
    total_prereqs: summary.total,
    data_envio:    new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' }),
  };

  // Anexa o PDF se disponível (requer plano Personal+ no EmailJS)
  if (pdfBase64) {
    const filename = `Pre-Avaliacao-LEED_${(basicInfo.nomeEdificio || 'Edificio').replace(/\s+/g, '-')}.pdf`;
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
      blockHeadless: true,
    }).then(() => {}).catch(() => {
      // tenta envio simples sem anexo se falhar
      return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    });
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}

// ─── Fallback: abre cliente de e-mail com resumo completo ────────────────────
export function buildMailtoFallback({ basicInfo, version, summary, contact, prerequisites, allAnswers, allDocStatuses }) {
  const subject = `Pré-Avaliação LEED – ${basicInfo.nomeEdificio || 'Edifício'} – ${version === 'v5' ? 'V5' : 'V4.1'}`;

  const divider = '─'.repeat(52);

  // Bloco de resumo
  const headerLines = [
    'Olá equipe Lux|ESG,',
    '',
    'Acabei de concluir a pré-avaliação LEED O+M pela plataforma.',
    'Seguem abaixo os resultados completos:',
    '',
    divider,
    'IDENTIFICAÇÃO',
    divider,
    `Edifício  : ${basicInfo.nomeEdificio || 'Não informado'}`,
    `Cidade    : ${basicInfo.cidade || 'Não informado'}`,
    `Respondeu : ${respondenteName(basicInfo.respondente)}`,
    `Versão    : ${version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M'}`,
    '',
    divider,
    'SCORES',
    divider,
    `📋 Prontidão documental : ${summary.docScore}%`,
    `✅ Conformidade técnica  : ${summary.avgCompliance}%`,
    '',
    `Estruturada   : ${summary.estruturadaCount} pré-req`,
    `Parcial       : ${summary.parcialCount} pré-req`,
    `Ausente       : ${summary.ausenteCount} pré-req`,
    `A verificar   : ${summary.verificarCount} pré-req`,
    `Total avaliado: ${summary.total} pré-req`,
    '',
    divider,
    'DETALHES POR PRÉ-REQUISITO',
    divider,
  ];

  // Bloco detalhado de cada pré-requisito
  const prereqLines = (prerequisites || []).map((p) =>
    buildPrereqBlock(p, allAnswers?.[p.id], allDocStatuses?.[p.id])
  );

  const footerLines = [
    '',
    divider,
    'CONTATO',
    divider,
    `E-mail  : ${contact.email || '—'}`,
    `Telefone: ${contact.telefone || '—'}`,
    contact.feedback ? `\nMensagem: ${contact.feedback}` : '',
    '',
    'Aguardo o contato da equipe Lux|ESG para prosseguirmos.',
    '',
    'Atenciosamente.',
  ];

  const fullBody = [
    ...headerLines,
    ...prereqLines,
    ...footerLines,
  ].join('\n');

  // mailto tem limite prático de ~2000 chars; truncamos de forma segura
  const MAX_BODY = 1800;
  const safeBody = fullBody.length > MAX_BODY
    ? fullBody.slice(0, MAX_BODY) + '\n\n[... conteúdo truncado — contate-nos para o relatório completo]'
    : fullBody;

  return `mailto:esg@luxenergia.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`;
}
