import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import UploadArea from './components/UploadArea';
import TextArea from './components/TextArea';
import ResultCard from './components/ResultCard';
import NeumorphicContainer from './components/ui/NeumorphicContainer';
import NeumorphicButton from './components/ui/NeumorphicButton';

function App() {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'text'
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
    setResult(null);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError('');
    setResult(null);
  };

  const generatePdfFromText = (textContent) => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(textContent, 180);
    let cursorY = 10;
    
    splitText.forEach(line => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = 10;
      }
      doc.text(line, 10, cursorY);
      cursorY += 7;
    });

    return doc.output('blob');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    
    try {
      if (activeTab === 'upload') {
        if (!file) throw new Error("Por favor selecciona un archivo PDF.");
        formData.append('file', file);
      } else {
        if (!text.trim()) throw new Error("Por favor ingresa texto para resumir.");
        const pdfBlob = generatePdfFromText(text);
        const textFile = new File([pdfBlob], "texto_manual.pdf", { type: "application/pdf" });
        formData.append('file', textFile);
      }

      const response = await axios.post('http://localhost:8000/api/v1/summarize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col pt-24">
      <Header />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neu-text mb-6 tracking-tight leading-tight">
            Resúmenes Académicos <br />
            <span className="text-neu-accent">Inteligentes</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Transforma documentos complejos en conocimientos claros y estructurados en segundos.
          </p>
        </div>

        <NeumorphicContainer>
          {/* Tabs Navigation */}
          <div className="flex bg-neu-bg shadow-neu-pressed rounded-2xl p-2 mb-10">
            <NeumorphicButton
              onClick={() => setActiveTab('upload')}
              active={activeTab === 'upload'}
              className="flex-1"
            >
              <Upload className="w-4 h-4" />
              Subir PDF
            </NeumorphicButton>
            <NeumorphicButton
              onClick={() => setActiveTab('text')}
              active={activeTab === 'text'}
              className="flex-1"
            >
              <FileText className="w-4 h-4" />
              Pegar Texto
            </NeumorphicButton>
          </div>

          <div className="space-y-8">
            <div className="transition-all duration-300 ease-in-out">
              {activeTab === 'upload' ? (
                <UploadArea
                  onFileSelect={handleFileSelect}
                  selectedFile={file}
                  onClear={() => setFile(null)}
                />
              ) : (
                <TextArea text={text} onChange={handleTextChange} />
              )}
            </div>

            {error && (
              <NeumorphicContainer inset className="border-l-4 border-red-400">
                <div className="flex items-center gap-3 text-red-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              </NeumorphicContainer>
            )}

            <NeumorphicButton
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                'Generar Resumen Ahora'
              )}
            </NeumorphicButton>
          </div>
        </NeumorphicContainer>

        {result && <ResultCard result={result} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
