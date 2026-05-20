import { GraduationCap } from "lucide-react";
import KnowledgeTags from "./KnowledgeTags.jsx";
import { conceptsForSuggestedAction } from "../utils/pmConcepts.js";

export default function InstructorNotes({ notes }) {
  const actionConcepts = conceptsForSuggestedAction(notes.assignment, notes.emphasis);

  return (
    <details className="instructor-notes">
      <summary>
        <GraduationCap size={18} aria-hidden="true" />
        Project Management Notes
      </summary>
      <div className="notes-body">
        <h4>Project Management Focus Areas</h4>
        <KnowledgeTags areas={notes.emphasis} label="Project management focus areas emphasized" />
        <h4>Tradeoff Focus</h4>
        <p>{notes.tradeoffs}</p>
        <h4>Project Management Reflection</h4>
        <ul>
          {notes.discussion.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Suggested Action</h4>
        <p>{notes.assignment}</p>
        <h4>Concepts Reinforced</h4>
        <div className="concept-row" aria-label="Project management concepts reinforced by the suggested action">
          {actionConcepts.map((concept) => (
            <span key={concept}>{concept}</span>
          ))}
        </div>
      </div>
    </details>
  );
}
