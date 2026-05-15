import { useState } from 'react';

export default function ContactPage({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  function field(key, val) {
    onChange({ ...data, [key]: val });
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }

  function validate() {
    const e = {};
    if (!data.email?.trim()) e.email = 'Informe seu e-mail para recebermos o resultado';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'E-mail inválido';
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext();
  }

  return (
    <div className="page-content fade-in-up">
      <div className="glass-card">
        <div className="page-header">
          <div className="page-icon page-icon--purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <h2 className="page-title">Contato para Retorno</h2>
            <p className="page-desc">
              Nossa equipe técnica analisará seus resultados e entrará em contato em até <strong>7 dias úteis</strong>.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label className="form-label">E-mail *</label>
            <input
              type="email"
              className="form-input"
              placeholder="seu@email.com.br"
              value={data.email || ''}
              onChange={(e) => field('email', e.target.value)}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Telefone / WhatsApp</label>
            <input
              type="tel"
              className="form-input"
              placeholder="(11) 99999-9999"
              value={data.telefone || ''}
              onChange={(e) => field('telefone', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Há algo mais que queira nos contar?</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Contexto adicional, dúvidas específicas, prazo desejado para certificação..."
            rows={4}
            value={data.feedback || ''}
            onChange={(e) => field('feedback', e.target.value)}
          />
        </div>

        <div className="contact-privacy glass-card--inner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <span>Seus dados são utilizados exclusivamente para análise técnica. Não realizamos spam.</span>
        </div>

        <div className="page-actions">
          <button className="btn-secondary" onClick={onBack}>Voltar</button>
          <button className="btn-primary" onClick={handleNext}>
            Ver Resultado
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
