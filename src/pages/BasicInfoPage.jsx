import { useState } from 'react';

const RESPONDENTES = [
  { value: 'gestao_predial', label: 'Gestão Predial' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'sustentabilidade', label: 'Sustentabilidade' },
  { value: 'proprietario', label: 'Proprietário / Investidor' },
  { value: 'outro', label: 'Outro' },
];

export default function BasicInfoPage({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!data.nomeEdificio?.trim()) e.nomeEdificio = 'Informe o nome do edifício';
    if (!data.areaConstruida)       e.areaConstruida = 'Informe a área total construída';
    if (!data.respondente)          e.respondente = 'Selecione quem está respondendo';
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext();
  }

  function field(key, value) {
    onChange({ ...data, [key]: value });
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }

  return (
    <div className="page-content fade-in-up">
      <div className="glass-card">
        <div className="page-header">
          <div className="page-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <h2 className="page-title">Informações do Edifício</h2>
            <p className="page-desc">Conte-nos um pouco sobre a edificação que será avaliada.</p>
          </div>
        </div>

        <div className="form-grid">
          <div className={`form-group ${errors.nomeEdificio ? 'has-error' : ''}`}>
            <label className="form-label">Nome do Edifício *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Torre Paulista, Green Office Park..."
              value={data.nomeEdificio || ''}
              onChange={(e) => field('nomeEdificio', e.target.value)}
            />
            {errors.nomeEdificio && <span className="form-error">{errors.nomeEdificio}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Cidade / Estado</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: São Paulo, SP"
              value={data.cidade || ''}
              onChange={(e) => field('cidade', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ano de Construção (aproximado)</label>
            <input
              type="number"
              className="form-input"
              placeholder="Ex: 2015"
              min="1900"
              max="2030"
              value={data.anoConstrucao || ''}
              onChange={(e) => field('anoConstrucao', e.target.value)}
            />
          </div>

          <div className={`form-group ${errors.areaConstruida ? 'has-error' : ''}`}>
            <label className="form-label">Área total construída (m²) *</label>
            <input
              type="number"
              className="form-input"
              placeholder="Ex: 12500"
              min="0"
              value={data.areaConstruida || ''}
              onChange={(e) => field('areaConstruida', e.target.value)}
            />
            {errors.areaConstruida && <span className="form-error">{errors.areaConstruida}</span>}
          </div>
        </div>

        <div className="form-group toggle-group">
          <label className="form-label">O edifício possui múltiplas torres ou blocos?</label>
          <div className="toggle-options">
            {[
              { v: false, l: 'Não — torre única' },
              { v: true, l: 'Sim — múltiplas torres' },
            ].map(({ v, l }) => (
              <button
                key={String(v)}
                type="button"
                className={`toggle-btn ${data.torres === v ? 'active' : ''}`}
                onClick={() => field('torres', v)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group toggle-group">
          <label className="form-label">Existem áreas com gestão separada dentro do edifício?</label>
          <div className="toggle-options">
            {[
              { v: false, l: 'Não — gestão unificada' },
              { v: true, l: 'Sim — múltiplas áreas' },
            ].map(({ v, l }) => (
              <button
                key={String(v)}
                type="button"
                className={`toggle-btn ${data.areasSeparadas === v ? 'active' : ''}`}
                onClick={() => field('areasSeparadas', v)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className={`form-group ${errors.respondente ? 'has-error' : ''}`}>
          <label className="form-label">Quem está respondendo esta avaliação? *</label>
          <div className="radio-grid">
            {RESPONDENTES.map((r) => (
              <label key={r.value} className={`radio-card ${data.respondente === r.value ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="respondente"
                  value={r.value}
                  checked={data.respondente === r.value}
                  onChange={() => field('respondente', r.value)}
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
          {errors.respondente && <span className="form-error">{errors.respondente}</span>}
        </div>

        <div className="page-actions">
          <button className="btn-secondary" onClick={onBack}>Voltar</button>
          <button className="btn-primary" onClick={handleNext}>
            Continuar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
