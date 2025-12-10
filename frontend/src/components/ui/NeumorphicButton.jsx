export default function NeumorphicButton({ children, onClick, disabled }) {
  return (
    <button
      className={`neo-button ${disabled ? "neo-button-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}