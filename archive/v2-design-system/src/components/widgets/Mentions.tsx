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
const [open, setOpen] = useState(false);
const [query, setQuery] = useState("");
const [trigger, setTrigger] = useState<"@" | "#">("@");
const ref = useRef<HTMLTextAreaElement>(null);

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const v = e.target.value;
  setText(v);
  const pos = e.target.selectionStart;
  const before = v.slice(0, pos);
  const m = before.match(/([@#])(\\w*)$/);
  if (m) { setTrigger(m[1] as "@" | "#"); setQuery(m[2]); setOpen(true); }
  else setOpen(false);
};

const filtered = useMemo(
  () => USERS.filter((u) => u.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
  [query]
);

const insert = (s: string) => {
  if (!ref.current) return;
  const pos = ref.current.selectionStart;
  const before = text.slice(0, pos).replace(/([@#])\\w*$/, \`$1\${s} \`);
  setText(before + text.slice(pos));
  setOpen(false);
  setTimeout(() => ref.current?.focus(), 0);
};

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
            <span className="text-accent font-semibold">{trigger}</span>{u}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>`}
      htmlCode={`<style>
  .m-wrap { position:relative; max-width:480px; font-family:'Roboto', sans-serif; }
  .m-input {
    width:100%; padding:12px;
    border:1px solid hsl(var(--input, 120 10% 88%));
    border-radius:6px; font-size:14px; resize:vertical;
    background:hsl(var(--background, 0 0% 100%));
    color:hsl(var(--foreground, 110 78% 9%));
    outline:none;
  }
  .m-input:focus { border-color:hsl(var(--ring, 155 93% 11%)); box-shadow:0 0 0 2px hsl(var(--ring, 155 93% 11%) / 0.2); }
  .m-list {
    display:none; position:absolute; top:100%; left:12px; margin-top:4px;
    background:hsl(var(--popover, 0 0% 100%));
    border:1px solid hsl(var(--border, 120 10% 88%));
    border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,.1);
    list-style:none; padding:4px; min-width:160px; z-index:10;
  }
  .m-list button {
    width:100%; text-align:left; padding:6px 12px; border-radius:4px;
    cursor:pointer; font-family:'Roboto'; font-size:14px;
    background:transparent; border:none; color:hsl(var(--foreground, 110 78% 9%));
  }
  .m-list button:hover { background:hsl(var(--muted, 120 10% 95%) / 0.6); }
  .m-trigger { color:hsl(var(--accent, 155 93% 11%)); font-weight:600; }
</style>

<div class="m-wrap">
  <textarea id="m-input" class="m-input" rows="3" placeholder="Mencione alguém com @ ou marque com #" oninput="onMention(event)"></textarea>
  <ul id="m-list" class="m-list"></ul>
</div>

<script>
  const USERS = ['raul', 'bourdain', 'ana', 'carlos', 'marina', 'joao'];
  let mTrigger = '@';
  function onMention(e) {
    const t = e.target, pos = t.selectionStart, before = t.value.slice(0, pos);
    const m = before.match(/([@#])(\\w*)$/);
    const list = document.getElementById('m-list');
    if (!m) { list.style.display = 'none'; return; }
    mTrigger = m[1];
    const filtered = USERS.filter(u => u.toLowerCase().includes(m[2].toLowerCase())).slice(0, 5);
    list.innerHTML = '';
    list.style.display = filtered.length ? 'block' : 'none';
    filtered.forEach(u => {
      const li = document.createElement('li');
      const btn = document.createElement('button'); btn.type = 'button';
      btn.innerHTML = '<span class="m-trigger">' + mTrigger + '</span>' + u;
      btn.onclick = () => {
        t.value = t.value.slice(0, pos).replace(/([@#])\\w*$/, '$1' + u + ' ') + t.value.slice(pos);
        list.style.display = 'none'; t.focus();
      };
      li.appendChild(btn); list.appendChild(li);
    });
  }
</script>`}
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
