import { describe, it, expect } from "vitest";
import {
  marcosOrdenados,
  marcoVemPorAi,
  indiceFronteira,
  indiceMarcoAtual,
  proximoMarco,
} from "@/data/roadmapMarcos";

/**
 * A trilha do Hub não pode deixar um marco "Vem por aí" cair atrás da linha
 * do "hoje" — isso faria a Central insinuar um atraso de cronograma que não
 * existe. As datas dos planejados são estimativas e vencem sozinhas, então o
 * que sustenta a garantia é a ordenação por estado, não a data.
 */
describe("ordem da trilha de marcos", () => {
  it("põe todos os 'Vem por aí' depois do que já aconteceu", () => {
    const primeiroPlanejado = marcosOrdenados.findIndex(marcoVemPorAi);
    if (primeiroPlanejado === -1) return;
    const depoisDaFronteira = marcosOrdenados.slice(primeiroPlanejado);
    expect(depoisDaFronteira.every(marcoVemPorAi)).toBe(true);
  });

  it("mantém a ordem cronológica dentro de cada grupo", () => {
    for (const grupo of [
      marcosOrdenados.filter((m) => !marcoVemPorAi(m)),
      marcosOrdenados.filter(marcoVemPorAi),
    ]) {
      const datas = grupo.map((m) => m.data);
      expect(datas).toEqual([...datas].sort());
    }
  });

  it("aponta a fronteira e o próximo marco para o primeiro 'Vem por aí'", () => {
    expect(indiceFronteira).toBe(marcosOrdenados.findIndex(marcoVemPorAi));
    expect(proximoMarco()).toBe(marcosOrdenados[indiceFronteira]);
    expect(marcoVemPorAi(marcosOrdenados[indiceMarcoAtual()])).toBe(true);
  });
});
