export default function Footer() {
  return (
    <footer className="mt-24 py-10 bg-neu-bg">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} ResummerAI. Hecho con <span className="text-red-400">♥</span> y Neumorfismo.
        </p>
      </div>
    </footer>
  );
}
