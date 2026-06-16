import React, { useCallback, useRef, useState } from "react";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";

interface FileItem {
  id: string;
  name: string;
  size: number;
  url: string;
  progress: number;
  done: boolean;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadComPreview() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    Array.from(list).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const id = `${Date.now()}-${Math.random()}`;
      const url = URL.createObjectURL(file);
      const item: FileItem = { id, name: file.name, size: file.size, url, progress: 0, done: false };
      setFiles((prev) => [...prev, item]);

      // Simula upload progressivo
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id !== id) return f;
            const next = Math.min(100, f.progress + 12 + Math.random() * 18);
            const done = next >= 100;
            if (done) clearInterval(interval);
            return { ...f, progress: next, done };
          })
        );
      }, 300);
    });
  }, []);

  const remove = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <ComponentShowcase
      title="Upload com preview"
      description="Dropzone para imagens com preview em grid, barra de progresso simulada, tamanho do arquivo e remover individual. Suporta drag-and-drop e clique."
      code={`interface FileItem { id: string; name: string; size: number; url: string; progress: number; done: boolean }

function formatSize(bytes: number) {
  if (bytes < 1024) return \`\${bytes} B\`;
  if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(1)} KB\`;
  return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`;
}

const [files, setFiles] = useState<FileItem[]>([]);
const [dragOver, setDragOver] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);

const addFiles = useCallback((list: FileList | null) => {
  if (!list) return;
  Array.from(list).forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const id = \`\${Date.now()}-\${Math.random()}\`;
    const url = URL.createObjectURL(file);
    setFiles((prev) => [...prev, { id, name: file.name, size: file.size, url, progress: 0, done: false }]);

    // Simula upload progressivo
    const interval = setInterval(() => {
      setFiles((prev) => prev.map((f) => {
        if (f.id !== id) return f;
        const next = Math.min(100, f.progress + 12 + Math.random() * 18);
        const done = next >= 100;
        if (done) clearInterval(interval);
        return { ...f, progress: next, done };
      }));
    }, 300);
  });
}, []);

const remove = (id: string) => setFiles((prev) => {
  const f = prev.find((x) => x.id === id);
  if (f) URL.revokeObjectURL(f.url);
  return prev.filter((x) => x.id !== id);
});

const onDrop = (e: React.DragEvent) => {
  e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files);
};

<div className="w-full space-y-4">
  <div
    onClick={() => inputRef.current?.click()}
    onDrop={onDrop}
    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
    onDragLeave={() => setDragOver(false)}
    className={cn(
      "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
      dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
    )}
  >
    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
    <p className="text-sm font-anek font-semibold mb-1">Arraste imagens aqui ou clique para selecionar</p>
    <p className="text-xs text-muted-foreground font-roboto">PNG, JPG, WEBP — múltiplos arquivos suportados</p>
    <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => addFiles(e.target.files)} />
  </div>

  {files.length > 0 && (
    <>
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>{files.length} arquivo(s) — {formatSize(files.reduce((s, f) => s + f.size, 0))}</span>
        <button onClick={() => { files.forEach((f) => URL.revokeObjectURL(f.url)); setFiles([]); }}
          className="hover:text-foreground transition-colors">Limpar tudo</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {files.map((f) => (
          <div key={f.id} className="relative group rounded-lg overflow-hidden border bg-card">
            <div className="aspect-square bg-muted overflow-hidden">
              <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
            </div>
            {!f.done && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 text-accent animate-spin" />
                <div className="w-3/4 h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: \`\${f.progress}%\` }} />
                </div>
              </div>
            )}
            <button onClick={() => remove(f.id)}
              className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remover">
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="p-2 space-y-0.5">
              <p className="text-[11px] font-roboto truncate" title={f.name}>{f.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{formatSize(f.size)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>`}
      htmlCode={`<div id="dropzone" onclick="document.getElementById('finput').click()"
  ondragover="event.preventDefault(); this.classList.add('drag')"
  ondragleave="this.classList.remove('drag')"
  ondrop="event.preventDefault(); this.classList.remove('drag'); addFiles(event.dataTransfer.files)"
  style="border:2px dashed #d1d5db; border-radius:12px; padding:32px; text-align:center; cursor:pointer; background:#f9fafb;">
  <p style="font-family:'Anek Latin'; font-weight:600;">⬆ Arraste imagens ou clique para selecionar</p>
  <p style="font-size:12px; color:#6b7280;">PNG, JPG, WEBP — múltiplos arquivos</p>
  <input id="finput" type="file" multiple accept="image/*" style="display:none" onchange="addFiles(this.files)" />
</div>

<div id="grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px; margin-top:16px;"></div>

<style>
  #dropzone.drag { border-color:hsl(var(--primary)); background:rgba(11,41,4,.05); }
  .upl-card { position:relative; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; background:#fff; }
  .upl-card img { width:100%; aspect-ratio:1; object-fit:cover; display:block; }
  .upl-card__rm { position:absolute; top:6px; right:6px; width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,.9); border:none; cursor:pointer; }
  .upl-card__name { padding:6px 8px; font-size:11px; font-family:'Roboto'; }
</style>

<script>
  function addFiles(list) {
    [...list].filter(f=>f.type.startsWith('image/')).forEach(f => {
      const url = URL.createObjectURL(f);
      const el = document.createElement('div'); el.className = 'upl-card';
      el.innerHTML = \`<img src="\${url}" /><button class="upl-card__rm" onclick="this.parentElement.remove()">×</button><div class="upl-card__name">\${f.name}</div>\`;
      document.getElementById('grid').appendChild(el);
    });
  }
</script>`}
    >
      <div className="w-full space-y-4">
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
          )}
        >
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-anek font-semibold mb-1">
            Arraste imagens aqui ou clique para selecionar
          </p>
          <p className="text-xs text-muted-foreground font-roboto">
            PNG, JPG, WEBP — múltiplos arquivos suportados
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {files.length > 0 && (
          <>
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>{files.length} arquivo(s) — {formatSize(files.reduce((s, f) => s + f.size, 0))}</span>
              <button
                onClick={() => {
                  files.forEach((f) => URL.revokeObjectURL(f.url));
                  setFiles([]);
                }}
                className="hover:text-foreground transition-colors"
              >
                Limpar tudo
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((f) => (
                <div key={f.id} className="relative group rounded-lg overflow-hidden border bg-card">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                  </div>
                  {!f.done && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 text-accent animate-spin" />
                      <div className="w-3/4 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => remove(f.id)}
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remover"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="p-2 space-y-0.5">
                    <p className="text-[11px] font-roboto truncate" title={f.name}>
                      {f.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {formatSize(f.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ComponentShowcase>
  );
}
