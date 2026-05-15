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
import { sendAssessmentEmail } from './utils/emailSender';
import { generateReportHtml } from './utils/reportHtml';

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
    const summary = buildSummary(prerequisites, allAnswers, allDocStatuses);
    const html = generateReportHtml({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, summary, contact });
    setReportHtml(html);

    // Open report in new tab immediately (before async, avoids popup blocker)
    const reportWin = window.open('', '_blank');
    if (reportWin) {
      reportWin.document.write(html);
      reportWin.document.close();
    }

    // Try EmailJS silently in background
    sendAssessmentEmail({ basicInfo, version, prerequisites, allAnswers, allDocStatuses, contact, summary }).catch(() => {});

    setSubmitting(false);
    goTo(STEP_THANKYOU);
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
