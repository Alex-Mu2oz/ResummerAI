export default function NeumorphicContainer({ children, style }) {
  return (
    <div className="neo-container" style={style}>
      {children}
    </div>
  );
}