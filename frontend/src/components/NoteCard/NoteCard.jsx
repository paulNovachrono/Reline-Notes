import { useEffect, useRef, useState } from "react";
import { BlurStaggeredText } from "../ui/BlurStaggerText";

export default function NoteCard({ note, index, handelDeleteNote, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const el = descRef.current;
    if (el) {
      setOverflows(el.scrollHeight > el.clientHeight);
    }
  }, [note.description]);

  return (
    <article
      onClick={() => overflows && setExpanded(!expanded)}
      className={`w-72 min-h-48 h-auto p-4 rounded-2xl bg-neutral-200 text-neutral-700 
      flex flex-col gap-3 border-2 border-neutral-300 relative
      ${overflows ? "cursor-pointer" : "cursor-default"}
      ${index % 2 === 0 ? "md:rotate-3" : "md:-rotate-3"}
      hover:-translate-y-4 transition-all ease-in-out duration-200`}
    >
      <h2 className="text-2xl font-semibold truncate">
        <BlurStaggeredText text={note.title} />
      </h2>

      <div
        ref={descRef}
        className={`font-Kameron ${!expanded ? "line-clamp-3" : ""}`}
      >
        <BlurStaggeredText text={note.description} />
      </div>

      {overflows && !expanded && (
        <span className="text-xs text-neutral-500">Click to read more</span>
      )}

      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-blue-600 cursor-pointer absolute bottom-2"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handelDeleteNote();
          }}
          className="text-rose-600 absolute top-2 right-2 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
