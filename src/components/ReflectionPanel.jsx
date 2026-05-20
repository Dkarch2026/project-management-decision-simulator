export default function ReflectionPanel({ prompts, value, onChange, disabled }) {
  return (
    <section className="reflection-panel">
      <h3>Reflection</h3>
      <div className="reflection-prompts">
        {prompts.map((prompt) => (
          <p key={prompt}>{prompt}</p>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter your reflection for this decision. Your notes will appear in the final debrief export."
        disabled={disabled}
      />
    </section>
  );
}
