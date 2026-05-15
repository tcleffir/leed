const OPTIONS = [
  {
    value: 'estruturada',
    label: 'Estruturada',
    desc: 'Documentação completa e organizada',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    cls: 'doc-green',
  },
  {
    value: 'parcial',
    label: 'Parcial',
    desc: 'Existe mas está incompleta',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    cls: 'doc-yellow',
  },
  {
    value: 'ausente',
    label: 'Ausente',
    desc: 'Não existe ou não foi localizada',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    cls: 'doc-red',
  },
  {
    value: 'verificar',
    label: 'Preciso Verificar',
    desc: 'Não tenho certeza / preciso checar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    cls: 'doc-gray',
  },
];

export default function DocStatusSelector({ value, onChange }) {
  return (
    <div className="doc-status-group">
      <p className="doc-status-heading">Status da documentação existente:</p>
      <div className="doc-status-options">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`doc-status-btn ${opt.cls} ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="doc-status-icon">{opt.icon}</span>
            <span className="doc-status-label">{opt.label}</span>
            <span className="doc-status-desc">{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
