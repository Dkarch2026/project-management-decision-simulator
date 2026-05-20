export default function KnowledgeTags({ areas, label }) {
  return (
    <div className="knowledge-tag-group">
      {label && <span className="tag-label">{label}</span>}
      <div className="tag-row" aria-label={label || "Project management focus areas"}>
        {areas.map((area) => (
          <span className="knowledge-tag" key={area}>
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
