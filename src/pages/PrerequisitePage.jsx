import DocStatusSelector from '../components/DocStatusSelector';
import MultiSelect from '../components/MultiSelect';

const CATEGORY_COLORS = {
  LT: '#3B82F6',
  WE: '#06B6D4',
  EA: '#F59E0B',
  MR: '#8B5CF6',
  EQ: '#10B981',
  IP: '#EC4899',
};

export default function PrerequisitePage({ prereq, answers, docStatus, onAnswerChange, onDocStatusChange, onNext, onBack, stepInfo }) {
  const accentColor = CATEGORY_COLORS[prereq.categoria] || 'var(--accent)';

  function handleRadio(pergId, val) {
    onAnswerChange({ ...answers, [pergId]: val });
  }

  function handleMultiselect(pergId, vals) {
    onAnswerChange({ ...answers, [pergId]: vals });
  }

  function handleObservacao(val) {
    onAnswerChange({ ...answers, observacao: val });
  }

  return (
    <div className="page-content fade-in-up">
      <div className="glass-card prereq-card">
        {/* Category + code badge */}
        <div className="prereq-header">
          <div className="prereq-meta">
            <span className="prereq-categoria" style={{ background: accentColor + '22', color: accentColor, borderColor: accentColor + '44' }}>
              {prereq.categoriaNome}
            </span>
            <span className="prereq-codigo">{prereq.codigo}</span>
            {stepInfo && (
              <span className="prereq-step-info">{stepInfo.current} / {stepInfo.total}</span>
            )}
          </div>
          <h2 className="prereq-title">{prereq.titulo}</h2>
          {prereq.sobre && <p className="prereq-sobre">{prereq.sobre}</p>}
        </div>

        {/* Requisites summary */}
        {prereq.requisitos?.length > 0 && (
          <div className="prereq-requisitos glass-card--inner">
            <p className="prereq-req-label">O que este pré-requisito exige:</p>
            <ul className="prereq-req-list">
              {prereq.requisitos.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Questions */}
        <div className="prereq-perguntas">
          {prereq.perguntas.map((perg, idx) => (
            <div key={perg.id} className="pergunta-block">
              <p className="pergunta-label">
                <span className="pergunta-num">{idx + 1}</span>
                {perg.pergunta}
              </p>

              {perg.tipo === 'radio' && (
                <div className="radio-options">
                  {perg.opcoes.map((op) => (
                    <label
                      key={op.valor}
                      className={`radio-option ${answers?.[perg.id] === op.valor ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`${prereq.id}-${perg.id}`}
                        value={op.valor}
                        checked={answers?.[perg.id] === op.valor}
                        onChange={() => handleRadio(perg.id, op.valor)}
                      />
                      <span className="radio-dot" />
                      <span className="radio-text">{op.label}</span>
                      {op.pontos > 0 && (
                        <span className="radio-pts">{op.pontos}pt</span>
                      )}
                    </label>
                  ))}
                </div>
              )}

              {perg.tipo === 'multiselect' && (
                <MultiSelect
                  pergunta={perg}
                  value={answers?.[perg.id] ?? []}
                  onChange={(vals) => handleMultiselect(perg.id, vals)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Documentation status */}
        <DocStatusSelector value={docStatus} onChange={onDocStatusChange} />

        {/* Documents list */}
        {prereq.documentos?.length > 0 && (
          <div className="prereq-docs glass-card--inner">
            <p className="prereq-docs-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              Documentos típicos para este requisito:
            </p>
            <ul className="prereq-docs-list">
              {prereq.documentos.map((doc, i) => (
                <li key={i}>{typeof doc === 'string' ? doc : doc.nome}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Observation */}
        <div className="form-group">
          <label className="form-label">Observações adicionais (opcional)</label>
          <textarea
            className="form-input form-textarea"
            placeholder={prereq.observacaoPlaceholder || 'Descreva qualquer detalhe relevante sobre a situação atual...'}
            value={answers?.observacao || ''}
            onChange={(e) => handleObservacao(e.target.value)}
            rows={3}
          />
        </div>

        <div className="page-actions">
          <button className="btn-secondary" onClick={onBack}>Anterior</button>
          <button className="btn-primary" onClick={onNext}>
            Próximo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
