import ThemeToggle from './ThemeToggle';

export default function Header({ theme, onToggle }) {
  return (
    <header className="app-header glass-card">
      <div className="header-inner">
        <div className="logo-group">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#1B4332"/>
            <text x="5" y="26" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="13" fill="#A3E635">LUX</text>
            <text x="5" y="37" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" fill="#A3E635" letterSpacing="1">ESG</text>
          </svg>
          <div className="logo-text">
            <span className="logo-lux">LUX</span>
            <span className="logo-esg">ESG</span>
          </div>
        </div>
        <div className="header-right">
          <span className="header-subtitle">Pré-Avaliação LEED O+M</span>
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </div>
    </header>
  );
}
