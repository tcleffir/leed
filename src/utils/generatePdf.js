import html2pdf from 'html2pdf.js';

export async function generatePdfBlob(reportHtml) {
  // Cria container temporário oculto
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;background:white;';
  container.innerHTML = reportHtml;
  document.body.appendChild(container);

  const opt = {
    margin:       [10, 12, 10, 12],
    filename:     'pre-avaliacao-leed.pdf',
    image:        { type: 'jpeg', quality: 0.95 },
    html2canvas:  { scale: 1.5, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  try {
    const blob = await html2pdf().set(opt).from(container).outputPdf('blob');
    return blob;
  } finally {
    document.body.removeChild(container);
  }
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function generateAndDownloadPdf(reportHtml, edificio) {
  const filename = `Pre-Avaliacao-LEED_${(edificio || 'Edificio').replace(/\s+/g, '-')}.pdf`;
  const blob = await generatePdfBlob(reportHtml);
  downloadBlob(blob, filename);
  return blob;
}
