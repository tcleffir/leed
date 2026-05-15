import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import WelcomePage from './pages/WelcomePage';
import BasicInfoPage from './pages/BasicInfoPage';
import VersionSelectPage from './pages/VersionSelectPage';
import PrerequisitePage from './pages/PrerequisitePage';
import ContactPage from './pages/ContactPage';
import SummaryPage from './pages/SummaryPage';
import ThankYouPage from './pages/ThankYouPage';
import { prerequisitesV41 } from './data/prerequisites-v41';
import { prerequisitesV5 } from './data/prerequisites-v5';
import { buildSummary } from './utils/scoring';
import { generateReportHtml } from './utils/reportHtml';
import { generatePdfBlob, downloadBlob } from './utils/generatePdf';

const STEP_WELCOME = 'welcome';
const STEP_BASIC = 'basic';
const STEP_VERSION = 'version';
const STEP_PREREQ = 'prereq';
const STEP_CONTACT = 'contact';
const STEP_SUMMARY = 'summary';
const STEP_THANKYOU = 'thankyou';

function getPrerequisites(version) {
  return version === 'v5' ? prerequisitesV5 : prerequisitesV41;
}

function buildStepList(version) {
  const prereqs = getPrerequisites(version);
  return [
    STEP_WELCOME,
    STEP_BASIC,
    STEP_VERSION,
    ...prereqs.map((_, i) => `${STEP_PREREQ}_${i}`),
    STEP_CONTACT,
    STEP_SUMMARY,
    STEP_THANKYOU,
  ];
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('lux_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [step, setStep] = useState(STEP_WELCOME);
  const [version, setVersion] = useState('v41');
  const [basicInfo, setBasicInfo] = useState({});
  const [contact, setContact] = useState({});
  const [allAnswers, setAllAnswers] = useState({});
  const [allDocStatuses, setAllDocStatuses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reportHtml, setReportHtml] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lux_theme', theme);
  }, [theme]);

  const prerequisites = getPrerequisites(version);
  const steps = buildStepList(version);

  const progressSteps = steps.filter((s) => s !== STEP_WELCOME && s !== STEP_THANKYOU);
  const progressIdx = progressSteps.indexOf(step);
  const showProgress = step !== STEP_WELCOME && step !== STEP_THANKYOU;

  function goTo(s) {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goNext() {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) goTo(steps[idx + 1]);
  }

  function goBack() {
    const idx = steps.indexOf(step);
    if (idx > 0) goTo(steps[idx - 1]);
  }

  function handleVersionSelect(v) {
    setVersion(v);
    setAllAnswers({});
    setAllDocStatuses({});
  }

  function handlePrereqAnswers(prereqId, answers) {
    setAllAnswers((prev) => ({ ...prev, [prereqId]: answers }));
  }

  function handleDocStatus(prereqId, status) {
    setAllDocStatuses((prev) => ({ ...prev, [prereqId]: status }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const summary = buildSummary(prerequisites, allAnswers, allDocStatuses);
      const html = generateReportHtml({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, summary, contact });
      setReportHtml(html);

      // 1. Gera e faz download do PDF
      const pdfBlob = generatePdfBlob({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, summary, contact });
      const nomeAtivo   = basicInfo.nomeAtivo || 'Ativo';
      const pdfFilename = `Pre-Avaliacao-LEED_${nomeAtivo.replace(/\s+/g, '-')}.pdf`;
      downloadBlob(pdfBlob, pdfFilename);

      // 2. Abre cliente de e-mail com mensagem de cotação após pequeno delay
      const versionLabel = version === 'v5' ? 'LEED V5 O+M' : 'LEED V4.1 O+M';
      const cidade       = basicInfo.cidade       || 'Não informado';
      const area         = basicInfo.areaConstruida ? `${basicInfo.areaConstruida} m²` : 'Não informado';
      const respondente  = respondenteName(basicInfo.respondente);
      const nomeContato  = contact.nome     || 'Não informado';
      const emailContato = contact.email    || '—';
      const telContato   = contact.telefone || '—';
      const docScore     = summary.docScore ?? 0;
      const compScore    = summary.avgCompliance ?? 0;

      const tipoProjetoLabel = { nova: 'Certificação Nova', recertificacao: 'Recertificação' };
      const nivelLabel       = { certified: 'Certified', silver: 'Silver', gold: 'Gold', platinum: 'Platinum' };
      const tipoProjeto  = tipoProjetoLabel[basicInfo.tipoProjeto]  || '—';
      const nivelAlmejado = nivelLabel[basicInfo.nivelAlmejado]     || '—';

      const mailSubject = `Solicitação de Proposta LEED O+M – ${nomeAtivo} (${nivelAlmejado})`;
      const mailBody = [
        `Olá, equipe Lux|ESG!`,
        ``,
        `Acabei de concluir a pré-avaliação LEED O+M pela plataforma e gostaria de solicitar uma proposta comercial para a certificação.`,
        ``,
        `⚠️  ATENÇÃO: O relatório completo em PDF foi baixado automaticamente no seu`,
        `dispositivo. Por favor, anexe o arquivo PDF a este e-mail antes de enviá-lo.`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `IDENTIFICAÇÃO DO ATIVO IMOBILIÁRIO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `Ativo(s)         : ${nomeAtivo}`,
        `Cidade / Estado  : ${cidade}`,
        `Área construída  : ${area}`,
        `Versão LEED      : ${versionLabel}`,
        `Tipo de projeto  : ${tipoProjeto}`,
        `Nível almejado   : ${nivelAlmejado}`,
        `Respondente      : ${respondente}`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `RESULTADOS DA PRÉ-AVALIAÇÃO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `Prontidão documental : ${docScore}%`,
        `Conformidade técnica : ${compScore}%`,
        ``,
        `Estruturada : ${summary.estruturadaCount} pré-req`,
        `Parcial     : ${summary.parcialCount} pré-req`,
        `Ausente     : ${summary.ausenteCount} pré-req`,
        `A verificar : ${summary.verificarCount} pré-req`,
        `Total       : ${summary.total} pré-req`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `CONTATO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `Nome     : ${nomeContato}`,
        `E-mail   : ${emailContato}`,
        `Telefone : ${telContato}`,
        contact.feedback ? `\nMensagem : ${contact.feedback.trim()}` : '',
        ``,
        `📎 O relatório PDF foi baixado automaticamente — lembre-se de anexá-lo a este e-mail.`,
        ``,
        `Fico no aguardo do contato da equipe Lux|ESG para prosseguirmos.`,
        ``,
        `Atenciosamente,`,
        nomeContato,
      ].filter((l) => l !== undefined).join('\n');

      setTimeout(() => {
        const href = `mailto:esg@luxenergia.com.br?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = href;
      }, 900);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
    } finally {
      setSubmitting(false);
      goTo(STEP_THANKYOU);
    }
  }

  function respondenteName(val) {
    const map = {
      gestao_predial:   'Gestão Predial',
      facilities:       'Facilities',
      sustentabilidade: 'Sustentabilidade',
      proprietario:     'Proprietário / Investidor',
      outro:            'Outro',
    };
    return map[val] ?? val ?? 'Não informado';
  }

  let currentPrereqIdx = -1;
  if (step.startsWith(STEP_PREREQ + '_')) {
    currentPrereqIdx = parseInt(step.split('_')[1], 10);
  }

  const summary = buildSummary(prerequisites, allAnswers, allDocStatuses);

  return (
    <div className="app-root">
      <Header theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      {showProgress && (
        <div className="progress-container">
          <ProgressBar
            current={progressIdx + 1}
            total={progressSteps.length}
            label={getStepLabel(step, currentPrereqIdx, prerequisites)}
          />
        </div>
      )}

      <main className="app-main">
        {step === STEP_WELCOME && (
          <WelcomePage onStart={() => goTo(STEP_BASIC)} />
        )}

        {step === STEP_BASIC && (
          <BasicInfoPage
            data={basicInfo}
            onChange={setBasicInfo}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === STEP_VERSION && (
          <VersionSelectPage
            version={version}
            onSelect={handleVersionSelect}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {currentPrereqIdx >= 0 && currentPrereqIdx < prerequisites.length && (
          <PrerequisitePage
            prereq={prerequisites[currentPrereqIdx]}
            answers={allAnswers[prerequisites[currentPrereqIdx].id] ?? {}}
            docStatus={allDocStatuses[prerequisites[currentPrereqIdx].id] ?? 'verificar'}
            onAnswerChange={(ans) => handlePrereqAnswers(prerequisites[currentPrereqIdx].id, ans)}
            onDocStatusChange={(s) => handleDocStatus(prerequisites[currentPrereqIdx].id, s)}
            onNext={goNext}
            onBack={goBack}
            stepInfo={{ current: currentPrereqIdx + 1, total: prerequisites.length }}
          />
        )}

        {step === STEP_CONTACT && (
          <ContactPage
            data={contact}
            onChange={setContact}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === STEP_SUMMARY && (
          <SummaryPage
            prerequisites={prerequisites}
            allAnswers={allAnswers}
            allDocStatuses={allDocStatuses}
            basicInfo={basicInfo}
            version={version}
            onSubmit={handleSubmit}
            onBack={goBack}
            submitting={submitting}
          />
        )}

        {step === STEP_THANKYOU && (
          <ThankYouPage
            basicInfo={basicInfo}
            version={version}
            summary={summary}
            reportHtml={reportHtml}
          />
        )}
      </main>
    </div>
  );
}

function getStepLabel(step, prereqIdx, prerequisites) {
  if (step === STEP_BASIC) return 'Informações do Edifício';
  if (step === STEP_VERSION) return 'Versão LEED';
  if (step === STEP_CONTACT) return 'Seus Dados de Contato';
  if (step === STEP_SUMMARY) return 'Resumo e Envio';
  if (step.startsWith(STEP_PREREQ + '_') && prereqIdx >= 0 && prerequisites[prereqIdx]) {
    return `${prerequisites[prereqIdx].codigo} – ${prerequisites[prereqIdx].titulo}`;
  }
  return '';
}
