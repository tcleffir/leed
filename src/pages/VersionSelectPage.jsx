import { useState } from 'react';

const TODAY = new Date();
const CUTOFF = new Date('2026-06-30');
const FORCED_V5 = TODAY > CUTOFF;

export default function VersionSelectPage({ version, onSelect, onNext, onBack }) {
  const [startDate, setStartDate] = useState('');
  const [dateError, setDateError] = useState('');

  function handleDateChange(val) {
    setStartDate(val);
    setDateError('');
    if (!val) { onSelect('v41'); return; }
    const d = new Date(val);
    if (d > CUTOFF) {
      onSelect('v5');
    } else {
      onSelect('v41');
    }
  }

  function handleNext() {
    if (!FORCED_V5 && !version) {
      onSelect('v41'); // default
    }
    onNext();
  }

  return (
    <div className="page-content fade-in-up">
      <div className="glass-card">
        <div className="page-header">
          <div className="page-icon page-icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="page-title">Versão LEED O+M</h2>
            <p className="page-desc">
              {FORCED_V5
                ? 'A partir de 1º de julho de 2026, todos os novos projetos obrigatoriamente usam a versão V5.'
                : 'Selecione quando pretende iniciar o processo de certificação para definirmos a versão mais adequada.'}
            </p>
          </div>
        </div>

        {FORCED_V5 ? (
          <div className="version-forced glass-card--inner">
            <div className="version-forced-badge">Obrigatório após 30/06/2026</div>
            <div className="version-card version-card--v5 selected">
              <div className="version-card-header">
                <span className="version-tag">V5</span>
                <strong>LEED V5 O+M</strong>
              </div>
              <p>Versão mais recente do LEED, com foco em descarbonização, qualidade do ar, equidade e resiliência climática.</p>
              <ul className="version-features">
                <li>11 pré-requisitos obrigatórios</li>
                <li>Ênfase em saúde e bem-estar</li>
                <li>Integração com riscos climáticos</li>
                <li>Alinhado com metas net-zero</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Previsão de início do processo de certificação</label>
              <input
                type="date"
                className="form-input"
                value={startDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {!startDate && (
                <span className="form-hint">Se não souber, deixe em branco — usaremos a V4.1 por padrão.</span>
              )}
            </div>

            <div className="version-cards">
              <div
                className={`version-card ${version === 'v41' || !version ? 'selected' : ''}`}
                onClick={() => onSelect('v41')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelect('v41')}
              >
                <div className="version-card-header">
                  <span className="version-tag version-tag--blue">V4.1</span>
                  <strong>LEED V4.1 O+M</strong>
                  <span className="version-default-badge">Padrão atual</span>
                </div>
                <p>Versão consolidada e amplamente adotada no mercado brasileiro. Válida para projetos iniciados até 30/06/2026.</p>
                <ul className="version-features">
                  <li>12 pré-requisitos obrigatórios</li>
                  <li>Base sólida e documentação madura</li>
                  <li>Consultorias e auditores experientes</li>
                  <li>Alta compatibilidade com edificações existentes</li>
                </ul>
              </div>

              <div
                className={`version-card ${version === 'v5' ? 'selected' : ''}`}
                onClick={() => onSelect('v5')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelect('v5')}
              >
                <div className="version-card-header">
                  <span className="version-tag version-tag--green">V5</span>
                  <strong>LEED V5 O+M</strong>
                  <span className="version-new-badge">Novo</span>
                </div>
                <p>Versão mais recente do LEED, obrigatória para projetos iniciados após 30/06/2026.</p>
                <ul className="version-features">
                  <li>11 pré-requisitos obrigatórios</li>
                  <li>Ênfase em saúde e bem-estar</li>
                  <li>Integração com riscos climáticos</li>
                  <li>Alinhado com metas net-zero</li>
                </ul>
              </div>
            </div>

            <div className="version-info-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>
                {!startDate
                  ? 'Nenhuma data selecionada — avaliação será feita pela V4.1 (padrão).'
                  : new Date(startDate) > CUTOFF
                    ? 'Data após 30/06/2026 — versão V5 será aplicada obrigatoriamente.'
                    : 'Data até 30/06/2026 — versão V4.1 recomendada, mas V5 também é possível.'}
              </span>
            </div>
          </>
        )}

        <div className="page-actions">
          <button className="btn-secondary" onClick={onBack}>Voltar</button>
          <button className="btn-primary" onClick={handleNext}>
            Iniciar Avaliação
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
