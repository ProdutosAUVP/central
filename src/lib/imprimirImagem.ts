/**
 * Impressão de artes (logos) — "PDF" dos cards de Marca & Logos.
 *
 * O caminho antigo (`window.open("", "_blank")` + `document.write`) falhava em
 * parte das máquinas: bloqueador de pop-up, documento que nunca era fechado
 * (`document.close()` ausente) e um `setTimeout` de 500 ms que disparava o
 * `window.print()` antes da imagem carregar. O resultado era o usuário parar
 * numa aba com o SVG e nenhuma tela de impressão.
 *
 * Aqui a regra é: iframe oculto **na mesma página** (pop-up blocker não
 * alcança), arte embutida como data URI (não depende da rede na hora de
 * imprimir) e `print()` só depois que a imagem terminou de carregar.
 * O pop-up continua como plano B e a arte aberta em aba nova como último
 * recurso.
 */

/** Tempo máximo de espera pelo carregamento da arte antes de imprimir. */
const ESPERA_IMAGEM_MS = 3000;
/** Tempo máximo do fetch da arte — depois disso imprime direto da URL. */
const ESPERA_FETCH_MS = 6000;
/** Prazo de segurança para remover o iframe caso `afterprint` não dispare. */
const LIMPEZA_MS = 60_000;

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Documento de impressão: uma página, uma arte, sem nada em volta.
 *
 * `@page { margin: 0 }` é o que apaga o cabeçalho/rodapé automático do
 * navegador (URL, data e título impressos sobre a arte — a "marca d'água"
 * que aparecia no PDF); o respiro visual vem do padding do body, que não
 * reserva espaço para eles. `object-fit: contain` + `page-break-inside`
 * garantem a arte inteira, sem distorção e sem quebra em duas páginas.
 */
export function montarDocumentoImpressao(imagem: string, titulo: string): string {
  const seguro = escaparHtml(titulo);
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${seguro}</title>
<style>
  @page { size: auto; margin: 0; }
  html, body { height: 100%; margin: 0; padding: 0; background: #fff; }
  body {
    box-sizing: border-box;
    padding: 10mm;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    break-inside: avoid;
    page-break-inside: avoid;
  }
</style>
</head>
<body><img src="${imagem}" alt="${seguro}"></body>
</html>`;
}

/** Converte a arte em data URI para a impressão não depender da rede. */
async function paraDataUri(src: string, svgRaw?: string): Promise<string> {
  if (svgRaw) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgRaw)}`;
  if (src.startsWith("data:")) return src;

  // Rede lenta ou bloqueada não pode travar o clique: passado o prazo,
  // o iframe imprime a arte direto da URL.
  const controle = new AbortController();
  const prazo = window.setTimeout(() => controle.abort(), ESPERA_FETCH_MS);
  let blob: Blob;
  try {
    const resp = await fetch(src, { signal: controle.signal });
    if (!resp.ok) throw new Error(`Falha ao carregar a arte (${resp.status})`);
    blob = await resp.blob();
  } finally {
    window.clearTimeout(prazo);
  }

  return new Promise<string>((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(String(leitor.result));
    leitor.onerror = () => reject(leitor.error ?? new Error("Falha ao ler a arte"));
    leitor.readAsDataURL(blob);
  });
}

/** Caminho principal: iframe oculto, imune a bloqueador de pop-up. */
function imprimirViaIframe(html: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");
    iframe.title = "Impressão";
    // Fora da tela, mas com tamanho real: iframe 0×0 ou display:none não
    // imprime em parte dos navegadores.
    iframe.style.cssText =
      "position:fixed;left:-10000px;top:0;width:210mm;height:297mm;border:0;";

    let limpo = false;
    const limpar = () => {
      if (limpo) return;
      limpo = true;
      iframe.remove();
    };

    iframe.onload = () => {
      const janela = iframe.contentWindow;
      if (!janela) {
        limpar();
        reject(new Error("iframe de impressão sem contentWindow"));
        return;
      }

      let disparado = false;
      const imprimir = () => {
        if (disparado) return;
        disparado = true;
        // O iframe precisa continuar vivo enquanto o diálogo está aberto
        // (Safari cancela a impressão se ele sumir antes).
        janela.addEventListener("afterprint", () => window.setTimeout(limpar, 100));
        try {
          janela.focus();
          janela.print();
        } catch (erro) {
          limpar();
          reject(erro instanceof Error ? erro : new Error("print() falhou"));
          return;
        }
        window.setTimeout(limpar, LIMPEZA_MS);
        resolve();
      };

      const arte = janela.document.images[0];
      if (!arte || arte.complete) {
        imprimir();
        return;
      }
      arte.addEventListener("load", imprimir, { once: true });
      arte.addEventListener("error", imprimir, { once: true });
      window.setTimeout(imprimir, ESPERA_IMAGEM_MS);
    };

    iframe.srcdoc = html;
    document.body.appendChild(iframe);
  });
}

/** Plano B: aba nova, agora com document.close() e print após o load. */
function imprimirViaPopup(html: string): boolean {
  const janela = window.open("", "_blank");
  if (!janela) return false;

  janela.document.open();
  janela.document.write(html);
  janela.document.close();

  const imprimir = () => {
    try {
      janela.focus();
      janela.print();
    } catch {
      /* a aba fica aberta com a arte; o usuário imprime pelo menu */
    }
  };

  if (janela.document.readyState === "complete") imprimir();
  else janela.addEventListener("load", imprimir, { once: true });

  return true;
}

/**
 * Abre a tela de impressão com a arte pronta para virar PDF.
 *
 * @param src     URL da arte (usada no fetch e como último recurso)
 * @param titulo  nome sugerido no diálogo de impressão
 * @param svgRaw  SVG em string, quando disponível — dispensa o fetch
 */
export async function imprimirImagem(src: string, titulo: string, svgRaw?: string): Promise<void> {
  let imagem: string;
  try {
    imagem = await paraDataUri(src, svgRaw);
  } catch {
    // Sem data URI (CORS, offline): imprime direto da URL.
    imagem = new URL(src, document.baseURI).href;
  }

  const html = montarDocumentoImpressao(imagem, titulo);

  try {
    await imprimirViaIframe(html);
    return;
  } catch {
    /* segue para o pop-up */
  }

  if (imprimirViaPopup(html)) return;

  // Último recurso: entrega a arte para o usuário imprimir pelo navegador.
  window.open(src, "_blank", "noopener,noreferrer");
}
