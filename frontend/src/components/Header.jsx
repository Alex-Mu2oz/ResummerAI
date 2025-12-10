import { FileText, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neu-bg/90 backdrop-blur-md shadow-neu-flat">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-neu-bg shadow-neu-flat text-neu-accent">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neu-text tracking-tight">
              ResummerAI
            </h1>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-neu-bg shadow-neu-pressed text-sm font-medium text-neu-text">
          <Sparkles className="w-4 h-4 text-neu-accent" />
          <span>Powered by Gemini 3.0</span>
        </div>
      </div>
    </header>
  );
}
