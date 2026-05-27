import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

const USERS = ["raul", "bourdain", "ana", "carlos", "marina", "joao"];

export function MentionsWidget() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [trigger, setTrigger] = useState<"@" | "#">("@");
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setText(v);
    const pos = e.target.selectionStart;
    const before = v.slice(0, pos);
    const m = before.match(/([@#])(\w*)$/);
    if (m) {
      setTrigger(m[1] as "@" | "#");
      setQuery(m[2]);
      setOpen(true);
    } else setOpen(false);
  };

  const filtered = useMemo(
    () => USERS.filter((u) => u.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [query]
  );

  const insert = (s: string) => {
    if (!ref.current) return;
    const pos = ref.current.selectionStart;
    const before = text.slice(0, pos).replace(/([@#])\w*$/, `$1${s} `);
    setText(before + text.slice(pos));
    setOpen(false);
    setTimeout(() => ref.current?.focus(), 0);
  };

  return (
    <ComponentShowcase
      title="Mentions (menções e tags)"
      description="Textarea que detecta '@' ou '#' enquanto você digita e abre um popover com sugestões. Padrão para comentários, posts da comunidade e descrições de operação."
      code={`const USERS = ["raul", "bourdain", "ana", "carlos", "marina", "joao"];
const [text, setText] = useState("");
// ... (see full source)`}
      htmlCode={`<!-- See full source -->`}
    >
      <div className="w-full max-w-md relative">
        <textarea
          ref={ref}
          value={text}
          placeholder="Mencione alguém com @ ou marque com #"
          onChange={onChange}
          rows={3}
          className="w-full p-3 rounded-md border border-input bg-background text-sm font-roboto resize-y focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {open && filtered.length > 0 && (
          <ul className="absolute left-3 top-full mt-1 z-10 bg-popover border rounded-md shadow-md p-1 min-w-[160px]">
            {filtered.map((u) => (
              <li key={u}>
                <button
                  type="button"
                  onClick={() => insert(u)}
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-muted/60 font-roboto"
                >
                  <span className="text-accent font-semibold">{trigger}</span>
                  {u}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ComponentShowcase>
  );
}
