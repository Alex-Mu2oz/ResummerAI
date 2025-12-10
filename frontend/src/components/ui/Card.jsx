export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-neu-bg rounded-[30px] shadow-neu-flat p-8 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
