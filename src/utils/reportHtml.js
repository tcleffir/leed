const DOC_LABEL = {
  estruturada: '✅ Estruturada',
  parcial:     '⚠️ Parcial',
  ausente:     '❌ Ausente',
  verificar:   '🔍 A Verificar',
};

const RESPONDENTE_MAP = {
  gestao_predial: 'Gestão Predial',
  facilities:     'Facilities',
  sustentabilidade: 'Sustentabilidade',
  proprietario:   'Proprietário / Investidor',
  outro:          'Outro',
};

const CAT_COLOR = {
  LT: '#3B82F6', WE: '#06B6D4', EA: '#F59E0B',
  MR: '#8B5CF6', EQ: '#10B981', IP: '#EC4899',
};

function labelOption(perg, val) {
  if (val === undefined || val === null || val === '') return '—';
  if (Array.isArray(val)) {
    if (!val.length) return '—';
    return val.map(v => perg.opcoes?.find(o => o.valor === v)?.label ?? v).join(', ');
  }
  return perg.opcoes?.find(o => o.valor === val)?.label ?? val;
}

function prereqCard(p, answers = {}, docStatus = 'verificar') {
  const color = CAT_COLOR[p.categoria] || '#03624C';
  const rows = p.perguntas
    .filter(pg => {
      const v = answers[pg.id];
      return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length);
    })
    .map(pg => `
      <tr>
        <td style="padding:8px 14px;color:#5a7a74;font-size:.84rem;border-bottom:1px solid #e8f3f1;vertical-align:top;width:55%;">${pg.pergunta}</td>
        <td style="padding:8px 14px;font-weight:600;color:#021B1A;font-size:.84rem;border-bottom:1px solid #e8f3f1;">${labelOption(pg, answers[pg.id])}</td>
      </tr>`).join('');

  const obs = answers.observacao?.trim()
    ? `<p style="margin:0;padding:8px 14px;background:#f1f7f6;font-size:.82rem;color:#5a7a74;border-top:1px solid #e8f3f1;"><strong>Obs:</strong> ${answers.observacao.trim()}</p>`
    : '';

  const body = rows
    ? `<table style="width:100%;border-collapse:collapse;">${rows}</table>${obs}`
    : `<p style="padding:10px 14px;color:#5a7a74;font-size:.84rem;font-style:italic;margin:0;">Nenhuma resposta registrada.</p>`;

  return `
    <div style="border:1px solid #e8f3f1;border-radius:10px;margin-bottom:14px;overflow:hidden;">
      <div style="background:${color}18;border-bottom:2px solid ${color}44;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span style="background:${color};color:#fff;padding:2px 10px;border-radius:999px;font-size:.74rem;font-weight:700;">${p.categoriaNome}</span>
        <span style="font-weight:700;color:#021B1A;font-size:.88rem;">${p.codigo}</span>
        <span style="flex:1;font-weight:600;color:#021B1A;font-size:.9rem;">${p.titulo}</span>
        <span style="font-size:.82rem;white-space:nowrap;">${DOC_LABEL[docStatus] ?? docStatus}</span>
      </div>
      ${body}
    </div>`;
}

export function generateReportHtml({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, summary, contact }) {
  const date  = new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' });
  const vLabel = version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M';
  const prereqsHtml = prerequisites
    .map(p => prereqCard(p, allAnswers[p.id], allDocStatuses[p.id]))
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pré-Avaliação LEED – ${basicInfo.nomeAtivo || 'Ativo'}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F1F7F6;color:#021B1A;padding:0;}
  @page{margin:18mm 14mm}
  @media print{
    .no-print{display:none!important}
    body{background:#fff}
    .page{box-shadow:none;padding:0}
  }
  .page{max-width:820px;margin:0 auto;padding:28px 20px 48px}
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#03624C 0%,#2CC295 100%);border-radius:16px;padding:28px 32px;color:#fff;margin-bottom:22px;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:18px;">
      <div>
        <div style="font-size:1.5rem;font-weight:800;letter-spacing:-.5px;">Lux<span style="color:#00DF81;letter-spacing:2px;">|ESG</span></div>
        <div style="font-size:.8rem;opacity:.8;margin-top:2px;">Relatório de Pré-Avaliação LEED O+M</div>
      </div>
      <div style="text-align:right;font-size:.8rem;opacity:.85;">
        <div>${date}</div>
        <div style="font-weight:700;margin-top:2px;">${vLabel}</div>
      </div>
    </div>
    <h1 style="font-size:1.45rem;font-weight:800;margin-bottom:4px;">${basicInfo.nomeAtivo || 'Ativo não informado'}</h1>
    <div style="font-size:.875rem;opacity:.9;">
      ${basicInfo.cidade ? basicInfo.cidade + ' · ' : ''}Respondido por: ${RESPONDENTE_MAP[basicInfo.respondente] ?? basicInfo.respondente ?? 'Não informado'}
    </div>
  </div>

  <!-- Scores -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
    <div style="background:#fff;border-radius:12px;padding:22px;text-align:center;border:1px solid #e8f3f1;">
      <div style="font-size:2.4rem;font-weight:800;color:#03624C;">${summary.docScore}%</div>
      <div style="font-size:.82rem;color:#5a7a74;margin-top:4px;">Prontidão Documental</div>
    </div>
    <div style="background:#fff;border-radius:12px;padding:22px;text-align:center;border:1px solid #e8f3f1;">
      <div style="font-size:2.4rem;font-weight:800;color:#03624C;">${summary.avgCompliance}%</div>
      <div style="font-size:.82rem;color:#5a7a74;margin-top:4px;">Conformidade Técnica</div>
    </div>
  </div>

  <!-- Breakdown -->
  <div style="background:#fff;border-radius:12px;padding:18px;margin-bottom:16px;border:1px solid #e8f3f1;">
    <div style="font-size:.78rem;font-weight:700;color:#03624C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;">Status da Documentação</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
      <div style="text-align:center;padding:12px 6px;border-radius:8px;background:#00c4720f;border:1px solid #00c47230;">
        <div style="font-size:1.4rem;font-weight:800;color:#00a862;">${summary.estruturadaCount}</div>
        <div style="font-size:.72rem;color:#5a7a74;margin-top:2px;">Estruturada</div>
      </div>
      <div style="text-align:center;padding:12px 6px;border-radius:8px;background:#f5a6230f;border:1px solid #f5a62330;">
        <div style="font-size:1.4rem;font-weight:800;color:#c47900;">${summary.parcialCount}</div>
        <div style="font-size:.72rem;color:#5a7a74;margin-top:2px;">Parcial</div>
      </div>
      <div style="text-align:center;padding:12px 6px;border-radius:8px;background:#e53e3e0f;border:1px solid #e53e3e30;">
        <div style="font-size:1.4rem;font-weight:800;color:#c53030;">${summary.ausenteCount}</div>
        <div style="font-size:.72rem;color:#5a7a74;margin-top:2px;">Ausente</div>
      </div>
      <div style="text-align:center;padding:12px 6px;border-radius:8px;background:#a0aec00f;border:1px solid #a0aec030;">
        <div style="font-size:1.4rem;font-weight:800;color:#718096;">${summary.verificarCount}</div>
        <div style="font-size:.72rem;color:#5a7a74;margin-top:2px;">A Verificar</div>
      </div>
    </div>
  </div>

  <!-- Prerequisites detail -->
  <div style="background:#fff;border-radius:12px;padding:18px;margin-bottom:16px;border:1px solid #e8f3f1;">
    <div style="font-size:.78rem;font-weight:700;color:#03624C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px;">Detalhes por Pré-Requisito</div>
    ${prereqsHtml}
  </div>

  <!-- Contact -->
  <div style="background:#fff;border-radius:12px;padding:18px;margin-bottom:22px;border:1px solid #e8f3f1;">
    <div style="font-size:.78rem;font-weight:700;color:#03624C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;">Dados de Contato</div>
    <table style="border-collapse:collapse;width:100%;">
      <tr><td style="padding:5px 0;color:#5a7a74;font-size:.875rem;width:110px;">E-mail</td><td style="padding:5px 0;font-weight:600;font-size:.875rem;">${contact.email || '—'}</td></tr>
      <tr><td style="padding:5px 0;color:#5a7a74;font-size:.875rem;">Telefone</td><td style="padding:5px 0;font-weight:600;font-size:.875rem;">${contact.telefone || '—'}</td></tr>
      ${contact.feedback ? `<tr><td style="padding:5px 0;color:#5a7a74;font-size:.875rem;vertical-align:top;">Mensagem</td><td style="padding:5px 0;font-size:.875rem;">${contact.feedback}</td></tr>` : ''}
    </table>
  </div>

  <!-- Print CTA -->
  <div class="no-print" style="text-align:center;margin-bottom:28px;">
    <button onclick="window.print()" style="background:#03624C;color:#fff;border:none;border-radius:999px;padding:13px 36px;font-size:.95rem;font-weight:600;cursor:pointer;margin-right:10px;">
      🖨️ Imprimir / Salvar como PDF
    </button>
    <a href="mailto:esg@luxenergia.com.br?subject=Pré-Avaliação LEED – ${encodeURIComponent(basicInfo.nomeAtivo || 'Ativo')}" style="display:inline-block;background:#f1f7f6;color:#03624C;border:1.5px solid #2CC295;border-radius:999px;padding:13px 28px;font-size:.95rem;font-weight:600;text-decoration:none;">
      ✉️ Enviar por e-mail
    </a>
    <p style="font-size:.78rem;color:#5a7a74;margin-top:10px;">No diálogo de impressão, selecione <strong>Salvar como PDF</strong> para gerar o arquivo.</p>
  </div>

  <!-- Footer -->
  <div style="text-align:center;font-size:.75rem;color:#a0aec0;border-top:1px solid #e8f3f1;padding-top:16px;">
    Gerado pela plataforma Lux|ESG &middot; <a href="mailto:esg@luxenergia.com.br" style="color:#03624C;text-decoration:none;">esg@luxenergia.com.br</a>
  </div>

</div>
</body>
</html>`;
}
