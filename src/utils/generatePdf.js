import { jsPDF } from 'jspdf';

// ── Paleta de cores ──────────────────────────────────────────────
const GREEN      = [34, 197, 94];
const GREEN_DARK = [16, 120, 56];
const AMBER      = [245, 158, 11];
const RED        = [239, 68, 68];
const SLATE      = [100, 116, 139];
const GRAY_900   = [17, 24, 39];
const GRAY_700   = [55, 65, 81];
const GRAY_500   = [107, 114, 128];
const GRAY_200   = [229, 231, 235];
const GRAY_50    = [248, 250, 252];
const WHITE      = [255, 255, 255];

const PAGE_W    = 210;
const PAGE_H    = 297;
const ML        = 14;
const MR        = 14;
const CONTENT_W = PAGE_W - ML - MR;
const FOOTER_H  = 10;
const CONTENT_BOTTOM = PAGE_H - FOOTER_H - 6;

// ── Helpers ──────────────────────────────────────────────────────
function scoreColor(v) {
  if (v >= 70) return GREEN;
  if (v >= 40) return AMBER;
  return RED;
}

function trunc(text, max) {
  if (!text) return '—';
  const s = String(text);
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

const DOC_LABEL = {
  estruturada: 'Estruturada',
  parcial:     'Parcial',
  ausente:     'Ausente',
  verificar:   'A Verificar',
};
const DOC_COLOR = {
  estruturada: GREEN,
  parcial:     AMBER,
  ausente:     RED,
  verificar:   SLATE,
};

function respondenteName(val) {
  const map = {
    gestao_predial: 'Gestão Predial',
    facilities:     'Facilities',
    sustentabilidade: 'Sustentabilidade',
    proprietario:   'Proprietário / Investidor',
    outro:          'Outro',
  };
  return map[val] ?? val ?? 'Não informado';
}

function labelOption(perg, val) {
  if (val === undefined || val === null || val === '') return '—';
  if (Array.isArray(val)) {
    if (!val.length) return '—';
    return val.map((v) => perg.opcoes?.find((o) => o.valor === v)?.label ?? v).join(', ');
  }
  return perg.opcoes?.find((o) => o.valor === val)?.label ?? String(val);
}

// ── PDF Principal ────────────────────────────────────────────────
export function generatePdfBlob({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, summary, contact }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  let y = 0;

  // Verifica espaço e adiciona página se necessário
  function needSpace(h) {
    if (y + h > CONTENT_BOTTOM) {
      doc.addPage();
      y = 18;
      drawPageHeader();
    }
  }

  // Cabeçalho sutil em páginas secundárias
  function drawPageHeader() {
    doc.setFillColor(...GREEN_DARK);
    doc.rect(0, 0, PAGE_W, 10, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...WHITE);
    doc.text('Lux|ESG — Pré-Avaliação LEED O+M', ML, 7);
    doc.setFont('helvetica', 'normal');
    doc.text(trunc(basicInfo?.nomeEdificio || 'Edifício', 50), PAGE_W - MR, 7, { align: 'right' });
  }

  // ── CAPA ─────────────────────────────────────────────────────────
  // Fundo verde escuro
  doc.setFillColor(...GREEN_DARK);
  doc.rect(0, 0, PAGE_W, 48, 'F');
  // Faixa verde clara
  doc.setFillColor(...GREEN);
  doc.rect(0, 36, PAGE_W, 12, 'F');

  // Título
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Lux|ESG', ML, 16);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório de Pré-Avaliação LEED O+M', ML, 25);

  doc.setFontSize(9);
  doc.text(version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M', ML, 33);
  doc.text(new Date().toLocaleDateString('pt-BR', { dateStyle: 'long' }), PAGE_W - MR, 33, { align: 'right' });

  // Nome do edifício na faixa verde
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(trunc(basicInfo?.nomeEdificio || 'Edifício', 60), ML, 44);
  if (basicInfo?.cidade) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(basicInfo.cidade, PAGE_W - MR, 44, { align: 'right' });
  }

  y = 56;

  // ── IDENTIFICAÇÃO ────────────────────────────────────────────────
  const idItems = [
    ['Ativo(s) Imobiliário(s)', basicInfo?.nomeAtivo || '—'],
    ['Cidade / Estado',         basicInfo?.cidade || '—'],
    ['Área construída',         basicInfo?.areaConstruida ? `${basicInfo.areaConstruida} m²` : '—'],
    ['Versão LEED',             version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M'],
    ['Respondente',             respondenteName(basicInfo?.respondente)],
    ['Nome do contato',         contact?.nome || '—'],
    ['E-mail',                  contact?.email || '—'],
    ['Telefone',                contact?.telefone || '—'],
  ];

  const colW = CONTENT_W / 3;
  idItems.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const ix = ML + col * colW;
    const iy = y + row * 13;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY_500);
    doc.text(label.toUpperCase(), ix, iy);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY_900);
    doc.text(trunc(value, 28), ix, iy + 5);
  });

  y += 32;

  // ── SCORES ───────────────────────────────────────────────────────
  const docScore  = summary?.docScore ?? 0;
  const compScore = summary?.avgCompliance ?? 0;
  const cardW = (CONTENT_W - 6) / 2;
  const cardH = 22;

  [[docScore, 'PRONTIDÃO DOCUMENTAL', ML],
   [compScore, 'CONFORMIDADE TÉCNICA', ML + cardW + 6]
  ].forEach(([score, title, cx]) => {
    doc.setFillColor(...GRAY_50);
    doc.roundedRect(cx, y, cardW, cardH, 3, 3, 'F');
    doc.setDrawColor(...GRAY_200);
    doc.roundedRect(cx, y, cardW, cardH, 3, 3, 'S');
    doc.setFillColor(...scoreColor(score));
    doc.rect(cx, y, 3, cardH, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY_500);
    doc.text(title, cx + 6, y + 7);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...scoreColor(score));
    doc.text(`${score}%`, cx + 6, y + 18);
  });

  y += cardH + 8;

  // ── DISTRIBUIÇÃO ─────────────────────────────────────────────────
  const gridItems = [
    { label: 'Estruturada', count: summary?.estruturadaCount ?? 0, color: GREEN },
    { label: 'Parcial',     count: summary?.parcialCount ?? 0,     color: AMBER },
    { label: 'Ausente',     count: summary?.ausenteCount ?? 0,     color: RED   },
    { label: 'A Verificar', count: summary?.verificarCount ?? 0,   color: SLATE },
  ];

  const gW = (CONTENT_W - 12) / 4;
  gridItems.forEach((item, i) => {
    const gx = ML + i * (gW + 4);
    doc.setFillColor(...GRAY_50);
    doc.roundedRect(gx, y, gW, 16, 2, 2, 'F');
    doc.setFillColor(...item.color);
    doc.rect(gx, y, 3, 16, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...item.color);
    doc.text(String(item.count), gx + 8, y + 9);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY_500);
    doc.text(item.label, gx + 8, y + 14);
  });

  y += 24;

  // ── TÍTULO DA SEÇÃO ──────────────────────────────────────────────
  doc.setFillColor(...GREEN_DARK);
  doc.rect(ML, y, CONTENT_W, 8, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.text('DETALHAMENTO DOS PRÉ-REQUISITOS', ML + 3, y + 5.5);
  y += 13;

  // ── PRÉ-REQUISITOS ───────────────────────────────────────────────
  for (const prereq of (prerequisites || [])) {
    const answers   = allAnswers?.[prereq.id] ?? {};
    const docStatus = allDocStatuses?.[prereq.id] ?? 'verificar';
    const dColor    = DOC_COLOR[docStatus] ?? SLATE;
    const dLabel    = DOC_LABEL[docStatus] ?? docStatus;

    // Linhas de resposta
    const lines = [];
    for (const perg of (prereq.perguntas || [])) {
      const raw = answers[perg.id];
      if (raw === undefined || raw === null || raw === '' || (Array.isArray(raw) && !raw.length)) continue;
      lines.push({ q: perg.pergunta, a: labelOption(perg, raw) });
    }
    if (answers.observacao?.trim()) lines.push({ q: 'Observação', a: answers.observacao.trim() });

    needSpace(12 + lines.length * 9 + 6);

    // Cabeçalho do pré-requisito
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(ML, y, CONTENT_W, 10, 2, 2, 'F');
    doc.setFillColor(...dColor);
    doc.rect(ML, y, 3, 10, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY_900);
    doc.text(`${prereq.codigo} — ${trunc(prereq.titulo, 55)}`, ML + 6, y + 6.5);

    // Badge de status
    const badgeW = 26;
    const badgeX = PAGE_W - MR - badgeW;
    doc.setFillColor(...dColor);
    doc.roundedRect(badgeX, y + 2, badgeW, 6, 1.5, 1.5, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...WHITE);
    doc.text(dLabel, badgeX + badgeW / 2, y + 6.3, { align: 'center' });

    y += 12;

    if (lines.length === 0) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...GRAY_500);
      doc.text('Sem respostas registradas.', ML + 4, y + 4);
      y += 8;
    } else {
      for (const line of lines) {
        needSpace(10);
        // Pergunta
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...GRAY_500);
        const qWrapped = doc.splitTextToSize('• ' + line.q, CONTENT_W - 6);
        doc.text(qWrapped, ML + 4, y + 3.5);
        y += qWrapped.length * 3.8;
        // Resposta
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GRAY_700);
        const aWrapped = doc.splitTextToSize('→ ' + line.a, CONTENT_W - 12);
        doc.text(aWrapped, ML + 10, y + 3.5);
        y += aWrapped.length * 3.8 + 2;
      }
    }

    // Separador
    doc.setDrawColor(...GRAY_200);
    doc.setLineWidth(0.2);
    doc.line(ML, y + 1, PAGE_W - MR, y + 1);
    y += 5;
  }

  // ── CONTATO ──────────────────────────────────────────────────────
  needSpace(50);
  y += 2;
  doc.setFillColor(...GREEN_DARK);
  doc.rect(ML, y, CONTENT_W, 8, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.text('INFORMAÇÕES DE CONTATO', ML + 3, y + 5.5);
  y += 13;

  const cFields = [
    ['Nome',                contact?.nome     || '—'],
    ['E-mail',              contact?.email    || '—'],
    ['Telefone / WhatsApp', contact?.telefone || '—'],
  ];
  if (contact?.feedback?.trim()) cFields.push(['Mensagem', contact.feedback.trim()]);

  for (const [lbl, val] of cFields) {
    needSpace(10);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY_500);
    doc.text(lbl + ':', ML + 2, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY_900);
    const wrapped = doc.splitTextToSize(val, CONTENT_W - 35);
    doc.text(wrapped, ML + 40, y + 4);
    y += wrapped.length * 5 + 2;
  }

  // ── RODAPÉ EM TODAS AS PÁGINAS ───────────────────────────────────
  const total = doc.internal.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFillColor(...GRAY_200);
    doc.rect(0, PAGE_H - FOOTER_H, PAGE_W, FOOTER_H, 'F');
    doc.setFillColor(...GREEN);
    doc.rect(0, PAGE_H - FOOTER_H, 3, FOOTER_H, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY_500);
    doc.text('Lux|ESG — Pré-Avaliação LEED O+M  |  esg@luxenergia.com.br', ML, PAGE_H - 3.5);
    doc.text(`Página ${p} de ${total}`, PAGE_W - MR, PAGE_H - 3.5, { align: 'right' });
  }

  return doc.output('blob');
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 300);
}

// Mantém compatibilidade com imports antigos
export async function generateAndDownloadPdf(reportHtml, edificio) {
  console.warn('generateAndDownloadPdf(html) está obsoleto — use generatePdfBlob + downloadBlob.');
}
