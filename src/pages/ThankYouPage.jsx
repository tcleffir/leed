export default function ThankYouPage({ basicInfo, version, summary, reportHtml }) {
  const docScore = summary?.docScore ?? 0;
  const compScore = summary?.avgCompliance ?? 0;

  function openReport() {
    if (!reportHtml) return;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(reportHtml);
      win.document.close();
    }
  }

  return (
    <div className="page-center fade-in-up">
      <div className="glass-card thankyou-card">
        <div className="thankyou-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h1 className="thankyou-title">Pré-Avaliação Concluída!</h1>
        <p className="thankyou-subtitle">
          Obrigado, <strong>{basicInfo?.respondente ? respondenteName(basicInfo.respondente) : 'equipe'}</strong>. Seu relatório do{' '}
          <strong>{basicInfo?.nomeEdificio || 'edifício'}</strong> foi gerado e aberto em uma nova aba.
        </p>

        <div className="thankyou-scores">
          <div className="thankyou-score-item">
            <div className="thankyou-score-val" style={{ color: scoreColor(docScore) }}>{docScore}%</div>
            <div className="thankyou-score-lbl">Prontidão documental</div>
          </div>
          <div className="thankyou-score-div" />
          <div className="thankyou-score-item">
            <div className="thankyou-score-val" style={{ color: scoreColor(compScore) }}>{compScore}%</div>
            <div className="thankyou-score-lbl">Conformidade técnica</div>
          </div>
        </div>

        <div className="thankyou-timeline glass-card--inner">
          <p className="thankyou-timeline-title">O que acontece agora?</p>
          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="timeline-dot timeline-dot--done">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="timeline-content">
                <strong>Dados recebidos</strong>
                <span>Agora</span>
              </div>
            </div>
            <div className="timeline-connector" />
            <div className="timeline-step">
              <div className="timeline-dot timeline-dot--pending">2</div>
              <div className="timeline-content">
                <strong>Análise técnica detalhada</strong>
                <span>Até 7 dias úteis</span>
              </div>
            </div>
            <div className="timeline-connector" />
            <div className="timeline-step">
              <div className="timeline-dot timeline-dot--pending">3</div>
              <div className="timeline-content">
                <strong>Proposta e roadmap LEED</strong>
                <span>Após a análise</span>
              </div>
            </div>
          </div>
        </div>

        <div className="thankyou-contact glass-card--inner">
          <p>Dúvidas ou urgências? Fale conosco:</p>
          <a href="mailto:esg@luxenergia.com.br" className="thankyou-email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            esg@luxenergia.com.br
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          {reportHtml && (
            <button className="btn-primary" onClick={openReport}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Ver / Baixar Relatório PDF
            </button>
          )}
          <button
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            Iniciar nova avaliação
          </button>
        </div>
      </div>
    </div>
  );
}

function respondenteName(val) {
  const map = {
    gestao_predial: 'Gestão Predial',
    facilities: 'Facilities',
    sustentabilidade: 'Sustentabilidade',
    proprietario: 'Proprietário',
    outro: 'equipe',
  };
  return map[val] || val;
}

function scoreColor(v) {
  if (v >= 70) return '#22C55E';
  if (v >= 40) return '#F59E0B';
  return '#EF4444';
}
