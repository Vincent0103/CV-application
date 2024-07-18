const Btn = ({ handleClick, children }) => (
  <div className="flex max-w-full justify-center">
    <div tabIndex="0" role="button" aria-label="Export CV as PDF" onClick={handleClick}
    className="bg-slate-900 border-slate-950 focus:ring-black focus:border-black
    h-12 rounded-md shadow-lg flex justify-center items-center cursor-pointer my-4 group
    px-4 transition-transform hover:scale-[1.02] max-sm:h-10 max-sm:px-3" >
      { children }
    </div>
  </div>
);

const exportPDF = async () => {
  try {
    const CVPreview = document.getElementById('CV-preview');

    const html2canvas = await import('html2canvas');
    const jsPDF = await import('jspdf');

    const canvas = await html2canvas.default(CVPreview);
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF.default({ orientation: 'portrait' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('CV.pdf');
  } catch (error) {
    console.error('Failed to export CV to PDF:', error);
  }
};

const CVExporter = () => {
  const DownloadPDFIcon = <svg className='size-8 max-sm:size-6' xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z" /></svg>;

  return (
    <Btn handleClick={exportPDF}>
      {DownloadPDFIcon}
      <p className="text-white text-2xl font-bold p-4 pr-2 text-nowrap max-sm:text-lg
      max-sm:p-3 max-sm:pr-1">Export to PDF</p>
    </Btn>
  );
};

export default CVExporter;
