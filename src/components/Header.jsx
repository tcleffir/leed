import ThemeToggle from './ThemeToggle';

export default function Header({ theme, onToggle }) {
  return (
    <header className="app-header glass-card">
      <div className="header-inner">
        <div className="logo-group">
          <img
            src={`${import.meta.env.BASE_URL}logo-luxesg.png`}
            alt="Lux|ESG"
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
        </div>
        <div className="header-right">
          <span className="header-subtitle">Pré-Avaliação LEED O+M</span>
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </div>
    </header>
  );
}
