// Documentation readiness weights
const DOC_WEIGHTS = {
  estruturada: 1.0,
  parcial: 0.5,
  verificar: 0.25,
  ausente: 0.0,
};

export function calcDocScore(docStatuses) {
  const values = Object.values(docStatuses);
  if (!values.length) return 0;
  const sum = values.reduce((acc, s) => acc + (DOC_WEIGHTS[s] ?? 0), 0);
  return Math.round((sum / values.length) * 100);
}

// For a single prerequisite, calculate compliance score (0-100)
export function calcPrereqScore(prereq, answers) {
  if (!prereq?.perguntas?.length) return 0;
  let total = 0;
  let earned = 0;

  for (const perg of prereq.perguntas) {
    if (perg.tipo === 'radio' && perg.opcoes?.length) {
      const maxPts = Math.max(...perg.opcoes.map((o) => o.pontos ?? 0));
      total += maxPts;
      const sel = answers?.[perg.id];
      if (sel) {
        const opt = perg.opcoes.find((o) => o.valor === sel);
        earned += opt?.pontos ?? 0;
      }
    } else if (perg.tipo === 'multiselect' && perg.opcoes?.length) {
      const maxPts = perg.opcoes.reduce((a, o) => a + (o.pontos > 0 ? o.pontos : 0), 0);
      total += maxPts || perg.opcoes.length;
      const sels = answers?.[perg.id] ?? [];
      for (const val of sels) {
        const opt = perg.opcoes.find((o) => o.valor === val);
        earned += opt?.pontos ?? (sels.includes(val) ? 1 : 0);
      }
    }
  }

  return total > 0 ? Math.round((earned / total) * 100) : 0;
}

// Count how many prerequisites have estruturada documentation
export function countEstruturada(docStatuses) {
  return Object.values(docStatuses).filter((s) => s === 'estruturada').length;
}

// Overall summary across all prerequisites
export function buildSummary(prerequisites, allAnswers, allDocStatuses) {
  const prereqResults = prerequisites.map((p) => ({
    prereq: p,
    score: calcPrereqScore(p, allAnswers[p.id]),
    docStatus: allDocStatuses[p.id] ?? 'verificar',
  }));

  const docScore = calcDocScore(
    Object.fromEntries(prereqResults.map((r) => [r.prereq.id, r.docStatus]))
  );

  const avgCompliance =
    prereqResults.length > 0
      ? Math.round(prereqResults.reduce((a, r) => a + r.score, 0) / prereqResults.length)
      : 0;

  const estruturadaCount = prereqResults.filter((r) => r.docStatus === 'estruturada').length;
  const parcialCount = prereqResults.filter((r) => r.docStatus === 'parcial').length;
  const ausenteCount = prereqResults.filter((r) => r.docStatus === 'ausente').length;
  const verificarCount = prereqResults.filter((r) => r.docStatus === 'verificar').length;

  return {
    prereqResults,
    docScore,
    avgCompliance,
    estruturadaCount,
    parcialCount,
    ausenteCount,
    verificarCount,
    total: prerequisites.length,
  };
}
