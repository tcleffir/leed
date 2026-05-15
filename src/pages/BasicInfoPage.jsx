import { useState } from 'react';

const RESPONDENTES = [
  { value: 'gestao_predial', label: 'Gestão Predial' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'sustentabilidade', label: 'Sustentabilidade' },
  { value: 'proprietario', label: 'Proprietário / Investidor' },
  { value: 'outro', label: 'Outro' },
];

const NIVEIS = [
  { value: 'certified', label: 'Certified',  color: '#6B7280', desc: '40–49 pts' },
  { value: 'silver',    label: 'Silver',     color: '#94A3B8', desc: '50–59 pts' },
  { value: 'gold',      label: 'Gold',       color: '#D97706', desc: '60–79 pts' },
  { value: 'platinum',  label: 'Platinum',   color: '#0EA5E9', desc: '80+ pts'   },
];

export default function BasicInfoPage({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!data.nomeAtivo?.trim())    e.nomeAtivo     = 'Informe o nome do ativo imobiliário';
    if (!data.areaConstruida)       e.areaConstruida = 'Informe a área total construída';
    if (!data.tipoProjeto)          e.tipoProjeto   = 'Selecione o tipo de projeto';
    if (!data.nivelAlmejado)        e.nivelAlmejado = 'Selecione o nível de certificação almejado';
    if (!data.respondente)          e.respondente   = 'Selecione quem está respondendo';
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

        {/* ── Identificação ── */}
        <div className="form-grid">
          <div className={`form-group ${errors.nomeAtivo ? 'has-error' : ''}`} style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Nome do(s) Ativo(s) Imobiliário(s) *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Portfólio ABC, Torre Premium, Green Park..."
              value={data.nomeAtivo || ''}
              onChange={(e) => field('nomeAtivo', e.target.value)}
            />
            {errors.nomeAtivo && <span className="form-error">{errors.nomeAtivo}</span>}
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

        {/* ── Tipo de projeto ── */}
        <div className={`form-group toggle-group ${errors.tipoProjeto ? 'has-error' : ''}`}>
          <label className="form-label">Tipo de projeto *</label>
          <div className="toggle-options">
            {[
              { v: 'nova',          l: 'Certificação Nova' },
              { v: 'recertificacao', l: 'Recertificação' },
            ].map(({ v, l }) => (
              <button
                key={v}
                type="button"
                className={`toggle-btn ${data.tipoProjeto === v ? 'active' : ''}`}
                onClick={() => field('tipoProjeto', v)}
              >
                {l}
              </button>
            ))}
          </div>
          {errors.tipoProjeto && <span className="form-error">{errors.tipoProjeto}</span>}
        </div>

        {/* ── Nível almejado ── */}
        <div className={`form-group ${errors.nivelAlmejado ? 'has-error' : ''}`}>
          <label className="form-label">Nível de certificação almejado *</label>
          <div className="radio-grid">
            {NIVEIS.map((n) => (
              <label
                key={n.value}
                className={`radio-card nivel-card ${data.nivelAlmejado === n.value ? 'selected' : ''}`}
                style={data.nivelAlmejado === n.value ? { borderColor: n.color, background: n.color + '18' } : {}}
              >
                <input
                  type="radio"
                  name="nivelAlmejado"
                  value={n.value}
                  checked={data.nivelAlmejado === n.value}
                  onChange={() => field('nivelAlmejado', n.value)}
                />
                <span
                  className="nivel-badge"
                  style={{ background: n.color + '22', color: n.color, borderColor: n.color + '55' }}
                >
                  ★
                </span>
                <span className="nivel-label">{n.label}</span>
                <span className="nivel-pts">{n.desc}</span>
              </label>
            ))}
          </div>
          {errors.nivelAlmejado && <span className="form-error">{errors.nivelAlmejado}</span>}
        </div>

        {/* ── Configuração do edifício ── */}
        <div className="form-group toggle-group">
          <label className="form-label">O edifício possui múltiplas torres ou blocos?</label>
          <div className="toggle-options">
            {[
              { v: false, l: 'Não — torre única' },
              { v: true,  l: 'Sim — múltiplas torres' },
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
              { v: true,  l: 'Sim — múltiplas áreas' },
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

        {/* ── Respondente ── */}
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
