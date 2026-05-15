import { buildSummary } from '../utils/scoring';

const DOC_LABELS = {
  estruturada: { label: 'Estruturada', cls: 'badge-green' },
  parcial: { label: 'Parcial', cls: 'badge-yellow' },
  ausente: { label: 'Ausente', cls: 'badge-red' },
  verificar: { label: 'Verificar', cls: 'badge-gray' },
};

function ScoreRing({ value, size = 120, label }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = value >= 70 ? '#22C55E' : value >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div className="score-ring-wrap">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="8"/>
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ / 4}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <text x="50" y="46" textAnchor="middle" fontSize="20" fontWeight="700" fill={color}>{value}%</text>
        <text x="50" y="60" textAnchor="middle" fontSize="9" fill="var(--text-muted)">{label}</text>
      </svg>
    </div>
  );
}

function getScoreLevel(score) {
  if (score >= 80) return { label: 'Excelente', cls: 'level-green' };
  if (score >= 60) return { label: 'Bom', cls: 'level-blue' };
  if (score >= 40) return { label: 'Regular', cls: 'level-yellow' };
  return { label: 'Atenção', cls: 'level-red' };
}

export default function SummaryPage({ prerequisites, allAnswers, allDocStatuses, basicInfo, version, onSubmit, onBack, submitting }) {
  const summary = buildSummary(prerequisites, allAnswers, allDocStatuses);
  const docLevel = getScoreLevel(summary.docScore);
  const compLevel = getScoreLevel(summary.avgCompliance);

  return (
    <div className="page-content fade-in-up">
      <div className="glass-card">
        <div className="page-header">
          <div className="page-icon page-icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div>
            <h2 className="page-title">Resumo da Pré-Avaliação</h2>
            <p className="page-desc">
              {basicInfo.nomeEdificio || 'Edifício'} · {version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M'}
            </p>
          </div>
        </div>

        {/* Score overview */}
        <div className="summary-scores">
          <div className="score-item">
            <ScoreRing value={summary.docScore} label="Documentação" />
            <div className="score-meta">
              <span className={`level-badge ${docLevel.cls}`}>{docLevel.label}</span>
              <p>Prontidão documental</p>
            </div>
          </div>
          <div className="score-divider" />
          <div className="score-item">
            <ScoreRing value={summary.avgCompliance} label="Conformidade" />
            <div className="score-meta">
              <span className={`level-badge ${compLevel.cls}`}>{compLevel.label}</span>
              <p>Conformidade técnica</p>
            </div>
          </div>
        </div>

        {/* Doc status breakdown */}
        <div className="summary-breakdown glass-card--inner">
          <p className="summary-breakdown-title">Distribuição da documentação</p>
          <div className="breakdown-grid">
            <div className="breakdown-item breakdown-green">
              <span className="breakdown-count">{summary.estruturadaCount}</span>
              <span>Estruturada</span>
            </div>
            <div className="breakdown-item breakdown-yellow">
              <span className="breakdown-count">{summary.parcialCount}</span>
              <span>Parcial</span>
            </div>
            <div className="breakdown-item breakdown-red">
              <span className="breakdown-count">{summary.ausenteCount}</span>
              <span>Ausente</span>
            </div>
            <div className="breakdown-item breakdown-gray">
              <span className="breakdown-count">{summary.verificarCount}</span>
              <span>A Verificar</span>
            </div>
          </div>
        </div>

        {/* Per-prereq list */}
        <div className="prereq-review">
          <p className="prereq-review-title">Revisão por pré-requisito</p>
          {summary.prereqResults.map(({ prereq, score, docStatus }) => {
            const ds = DOC_LABELS[docStatus] || DOC_LABELS.verificar;
            return (
              <div key={prereq.id} className="prereq-review-item glass-card--inner">
                <div className="prereq-review-left">
                  <span className="prereq-review-code">{prereq.codigo}</span>
                  <span className="prereq-review-name">{prereq.titulo}</span>
                </div>
                <div className="prereq-review-right">
                  <span className={`badge ${ds.cls}`}>{ds.label}</span>
                  <div className="prereq-score-bar-wrap">
                    <div className="prereq-score-bar">
                      <div
                        className="prereq-score-fill"
                        style={{
                          width: `${score}%`,
                          background: score >= 70 ? '#22C55E' : score >= 40 ? '#F59E0B' : '#EF4444',
                        }}
                      />
                    </div>
                    <span className="prereq-score-num">{score}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next steps */}
        <div className="next-steps glass-card--inner">
          <div className="next-steps-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <strong>Próximos Passos — Lux|ESG</strong>
          </div>
          <ol className="next-steps-list">
            <li>
              <span className="step-num">1</span>
              <div>
                <strong>Envio automático</strong>
                <p>Seus resultados são enviados à nossa equipe assim que você confirmar abaixo.</p>
              </div>
            </li>
            <li>
              <span className="step-num">2</span>
              <div>
                <strong>Análise técnica (até 7 dias úteis)</strong>
                <p>Nossa equipe de consultores LEED revisará cada pré-requisito e identificará as principais lacunas.</p>
              </div>
            </li>
            <li>
              <span className="step-num">3</span>
              <div>
                <strong>Proposta personalizada</strong>
                <p>Enviaremos um diagnóstico detalhado com estimativa de tempo, esforço e investimento para a certificação.</p>
              </div>
            </li>
            <li>
              <span className="step-num">4</span>
              <div>
                <strong>Reunião de alinhamento</strong>
                <p>Agendamos uma call para apresentar os resultados e responder suas dúvidas.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="page-actions">
          <button className="btn-secondary" onClick={onBack} disabled={submitting}>Voltar</button>
          <button className="btn-primary btn-lg" onClick={onSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Enviar Pré-Avaliação
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
