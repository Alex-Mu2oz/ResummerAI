import NeumorphicInput from './ui/NeumorphicInput';

export default function TextArea({ text, onChange }) {
  return (
    <div className="relative group">
      <NeumorphicInput
        value={text}
        onChange={onChange}
        placeholder="Pega el contenido de tu texto aquí..."
        className="h-64 resize-none"
      />
      <div className="absolute bottom-6 right-6 text-xs font-bold text-gray-400 bg-neu-bg shadow-neu-flat px-3 py-1 rounded-full pointer-events-none">
        {text.length} caracteres
      </div>
    </div>
  );
}
