import { describe, it, expect } from "vitest";
import { montarDocumentoImpressao } from "@/lib/imprimirImagem";

describe("montarDocumentoImpressao", () => {
  const html = montarDocumentoImpressao("data:image/svg+xml;charset=utf-8,%3Csvg%3E", "olho-branco");

  it("zera a margem da página (some com cabeçalho/rodapé do navegador)", () => {
    expect(html).toMatch(/@page\s*\{[^}]*margin:\s*0/);
  });

  it("mantém a arte numa página só, sem quebra", () => {
    expect(html).toContain("page-break-inside: avoid");
    expect(html).toContain("break-inside: avoid");
  });

  it("preserva a proporção da arte", () => {
    expect(html).toContain("object-fit: contain");
  });

  it("usa o nome do arquivo como título do documento", () => {
    expect(html).toContain("<title>olho-branco</title>");
  });

  it("escapa o título e o alt para não quebrar o HTML", () => {
    const perigoso = montarDocumentoImpressao("data:image/png;base64,AAAA", 'logo "x" <script>');
    expect(perigoso).not.toContain("<script>");
    expect(perigoso).toContain("&lt;script&gt;");
    expect(perigoso).toContain("&quot;x&quot;");
  });

  it("embute a arte recebida", () => {
    expect(html).toContain('src="data:image/svg+xml;charset=utf-8,%3Csvg%3E"');
  });
});
