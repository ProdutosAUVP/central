/**
 * Microsoft Clarity — carregamento e API tipada.
 *
 * O script só entra se `VITE_CLARITY_PROJECT_ID` estiver definido no build.
 * Sem a variável, tudo aqui vira no-op: assim o ambiente de desenvolvimento
 * e qualquer fork não poluem as métricas de produção, e o app funciona igual
 * com ou sem a ferramenta configurada.
 *
 * O ID do projeto sai do painel do Clarity (Settings → Overview) e é
 * público por natureza — vai no HTML de qualquer forma. Mesmo assim ele
 * entra por variável de ambiente, e não fixo no código, para trocar de
 * projeto sem mexer no fonte.
 */

const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

/** Chave onde fica o identificador anônimo e estável desta pessoa. */
const ID_KEY = "auvp-clarity-id";

type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn & { q?: unknown[] };
  }
}

/** O Clarity está configurado para este build? */
export const clarityAtivo = Boolean(PROJECT_ID);

/**
 * Injeta o script do Clarity. Idempotente: chamar de novo não duplica.
 * Fica fora do React de propósito — é chamado uma vez no bootstrap.
 */
export function iniciarClarity(): void {
  if (!PROJECT_ID || typeof window === "undefined") return;
  if (window.clarity) return;

  /* A fila (`q`) precisa existir antes do script carregar, senão as chamadas
     feitas durante o carregamento se perdem. É o mesmo shim do snippet
     oficial, só escrito de forma legível. */
  window.clarity = function (...args: unknown[]) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  } as Window["clarity"];

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
  document.head.appendChild(script);
}

/** Chamada crua ao Clarity, silenciosa quando ele não está configurado. */
function chamar(...args: unknown[]): void {
  if (!PROJECT_ID || typeof window === "undefined" || !window.clarity) return;
  try {
    window.clarity(...args);
  } catch {
    /* métrica nunca pode derrubar a página */
  }
}

/**
 * Marca a sessão com uma variável. É o que permite filtrar e segmentar as
 * gravações no painel ("mostre as sessões em tema escuro", por exemplo).
 * Valores vazios são descartados — o Clarity trata "" como tag válida e
 * isso sujaria os filtros.
 */
export function clarityTag(chave: string, valor: string | string[]): void {
  const limpo = Array.isArray(valor) ? valor.filter(Boolean) : valor;
  if (!limpo || (Array.isArray(limpo) && limpo.length === 0)) return;
  chamar("set", chave, limpo);
}

/** Marca várias variáveis de uma vez. */
export function clarityTags(tags: Record<string, string | string[] | undefined>): void {
  for (const [chave, valor] of Object.entries(tags)) {
    if (valor !== undefined) clarityTag(chave, valor);
  }
}

/**
 * Associa a sessão a um identificador. A Central não tem login, então o id
 * é um pseudônimo aleatório e estável guardado no navegador: serve para
 * reconhecer a mesma pessoa entre sessões, sem dizer quem ela é.
 */
export function clarityIdentify(id: string, apelidoDaPagina?: string): void {
  chamar("identify", id, undefined, apelidoDaPagina);
}

/** Registra um evento nomeado (aparece como "Smart event" no painel). */
export function clarityEvent(nome: string): void {
  chamar("event", nome);
}

/**
 * Identificador anônimo e estável desta pessoa. Gerado na primeira visita e
 * guardado no navegador — não sai daqui e não carrega nenhum dado pessoal.
 */
export function idAnonimo(): string {
  if (typeof window === "undefined") return "desconhecido";
  try {
    const salvo = localStorage.getItem(ID_KEY);
    if (salvo) return salvo;
    const novo = `pirata-${crypto.randomUUID().slice(0, 8)}`;
    localStorage.setItem(ID_KEY, novo);
    return novo;
  } catch {
    /* navegação privada ou storage bloqueado: sessão fica sem id fixo */
    return "sem-storage";
  }
}
