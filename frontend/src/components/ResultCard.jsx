import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { CheckCircle, Download, FileText, Loader2 } from 'lucide-react';
import NeumorphicContainer from './ui/NeumorphicContainer';
import NeumorphicButton from './ui/NeumorphicButton';

export default function ResultCard({ result }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(`http://localhost:8000${result.pdf_download_url}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const filename = result.pdf_download_url.split('/').pop() || 'Resumen_Academico.pdf';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Hubo un problema al iniciar la descarga. Por favor intenta nuevamente.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-16 animate-slideUp">
      <div className="flex items-center gap-4 mb-8 pl-4">
        <div className="p-4 rounded-full bg-neu-bg shadow-neu-flat text-green-500">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-extrabold text-neu-text tracking-tight">Resultado del Análisis</h3>
      </div>

      <NeumorphicContainer>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-neu-text font-bold text-lg">Resumen Generado</p>
            <p className="text-sm text-gray-500 mt-1">Listo para su revisión</p>
          </div>
          
          <NeumorphicButton
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto"
          >
            {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            <span className="ml-2">{downloading ? 'Descargando...' : 'Descargar PDF'}</span>
          </NeumorphicButton>
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vista Previa</span>
          </div>
          <NeumorphicContainer inset>
            <div className="prose prose-slate max-w-none text-neu-text leading-relaxed font-medium text-justify">
              <ReactMarkdown>{result.summary_text}</ReactMarkdown>
            </div>
          </NeumorphicContainer>
        </div>
      </NeumorphicContainer>
    </div>
  );
}
