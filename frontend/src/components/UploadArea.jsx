import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { useCallback } from 'react';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicContainer from './ui/NeumorphicContainer';

export default function UploadArea({ onFileSelect, selectedFile, onClear }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false
  });

  if (selectedFile) {
    return (
      <NeumorphicContainer className="flex items-center justify-between animate-fadeIn">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-neu-bg shadow-neu-flat text-neu-accent">
            <File className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-neu-text">{selectedFile.name}</p>
            <p className="text-sm text-gray-400 font-medium">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <NeumorphicButton onClick={onClear}>
          <X className="w-5 h-5 text-red-400" />
        </NeumorphicButton>
      </NeumorphicContainer>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`rounded-[20px] p-16 text-center cursor-pointer transition-all duration-300 group
        ${isDragActive 
          ? 'bg-neu-bg shadow-neu-pressed' 
          : 'bg-neu-bg shadow-neu-flat hover:shadow-neu-convex'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-6">
        <div className={`p-6 rounded-full transition-all duration-300 ${isDragActive ? 'bg-neu-bg shadow-neu-pressed text-neu-accent' : 'bg-neu-bg shadow-neu-flat text-neu-text group-hover:text-neu-accent'}`}>
          <Upload className="w-10 h-10" />
        </div>
        <div>
          <p className="text-lg font-bold text-neu-text group-hover:text-neu-accent transition-colors">
            {isDragActive ? "Suelta el archivo ahora" : "Carga tu PDF aquí"}
          </p>
          <p className="text-sm text-gray-400 mt-2 font-medium">Arrastra o haz clic para explorar</p>
        </div>
      </div>
    </div>
  );
}
