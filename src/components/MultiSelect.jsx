export default function MultiSelect({ pergunta, value = [], onChange }) {
  const min = pergunta.minSelecionados || 0;

  function toggle(val) {
    const next = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(next);
  }

  return (
    <div className="multiselect-group">
      {min > 0 && (
        <p className="multiselect-hint">Selecione pelo menos {min} {min === 1 ? 'opção' : 'opções'}.</p>
      )}
      <div className="multiselect-options">
        {pergunta.opcoes.map((op) => {
          const checked = value.includes(op.valor);
          return (
            <label key={op.valor} className={`multiselect-item ${checked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(op.valor)}
                className="multiselect-checkbox"
              />
              <span className="multiselect-box">
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </span>
              <span className="multiselect-text">{op.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
