export default function NeumorphicInput({ value, onChange, placeholder }) {
  return (
    <textarea
      className="neo-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}