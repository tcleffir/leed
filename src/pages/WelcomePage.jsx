export default function WelcomePage({ onStart }) {
  return (
    <div className="page-center fade-in-up">
      <div className="glass-card welcome-card">
        <div className="welcome-badge">
          <span>Ferramenta Gratuita · Lux|ESG</span>
        </div>

        <h1 className="welcome-title">
          Pré-Avaliação LEED O+M
        </h1>
        <p className="welcome-subtitle">
          Descubra em minutos o nível de prontidão do seu edifício para a certificação LEED Operations &amp; Maintenance.
        </p>

        <div className="welcome-features">
          <div className="feature-item">
            <div className="feature-icon feature-icon--blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div>
              <strong>Diagnóstico completo de pré-requisitos</strong>
              <p>Avalie todos os pré-requisitos obrigatórios das versões V4.1 e V5</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon feature-icon--green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div>
              <strong>Score de documentação e conformidade</strong>
              <p>Veja em percentual o quanto sua operação já está estruturada</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon feature-icon--purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13 1.05.35 2.08.68 3.08a2 2 0 01-.45 2.11L6.09 8.09a16 16 0 006.29 6.29l1.18-1.18a2 2 0 012.11-.45c1 .33 2.03.55 3.08.68A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div>
              <strong>Revisão técnica em até 7 dias</strong>
              <p>Nossos especialistas analisam seu resultado e entram em contato</p>
            </div>
          </div>
        </div>

        <div className="welcome-time">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Tempo estimado: <strong>15–25 minutos</strong>
        </div>

        <button className="btn-primary btn-lg welcome-cta" onClick={onStart}>
          Iniciar Pré-Avaliação
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <p className="welcome-disclaimer">
          Seus dados são usados exclusivamente para elaborar o diagnóstico. Não compartilhamos informações com terceiros.
        </p>
      </div>
    </div>
  );
}
