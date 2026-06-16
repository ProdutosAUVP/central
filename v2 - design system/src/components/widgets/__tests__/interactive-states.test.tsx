/**
 * Snapshots de estados interativos
 * ---------------------------------
 * Garante que cada widget interativo renderiza markup estável
 * em cada estado relevante (hover, tab ativa, item ativo/concluído/bloqueado,
 * seleção de estrelas e tags). Snapshots inline ficam ao lado da asserção
 * para revisão fácil. Quando o markup mudar de propósito, basta rodar
 * `vitest -u` para atualizar.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";
import { BrandProvider } from "@/contexts/BrandContext";

import { TooltipsPopups } from "../TooltipsPopups";
import { PlataformaPlaylist } from "../PlataformaPlaylist";
import { PlataformaRating } from "../PlataformaRating";
import { ContagemRegressiva } from "../ContagemRegressiva";
import { TabelaPrecos } from "../TabelaPrecos";

const wrap = (ui: React.ReactElement) =>
  render(<BrandProvider>{ui}</BrandProvider>);

/** Reduz o HTML a um fingerprint estável (tag + texto + classes principais). */
function fingerprint(el: Element | null): string {
  if (!el) return "";
  const clone = el.cloneNode(true) as Element;
  // Remove SVGs (ícones lucide) que poluem o snapshot
  clone.querySelectorAll("svg").forEach((s) => s.replaceWith("[svg]"));
  // Normaliza espaços
  return clone.innerHTML
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

describe("TooltipsPopups — 4 posições", () => {
  it("renderiza balões em top/bottom/left/right com texto fixo", () => {
    const { container } = wrap(<TooltipsPopups />);
    const tooltips = container.querySelectorAll('[role="tooltip"]');
    expect(tooltips.length).toBe(4);
    tooltips.forEach((t) => {
      expect(t.textContent).toContain("Clique para interagir");
    });
    const positions = Array.from(tooltips).map((t) => {
      const cls = t.className;
      if (cls.includes("bottom-full")) return "top";
      if (cls.includes("top-full")) return "bottom";
      if (cls.includes("right-full")) return "left";
      if (cls.includes("left-full")) return "right";
      return "?";
    });
    expect(positions).toMatchInlineSnapshot(`
      [
        "top",
        "bottom",
        "left",
        "right",
      ]
    `);
  });
});

describe("TabelaPrecos — alternância de tabs", () => {
  it("muda entre Individual e Pacotes preservando estrutura", () => {
    const { container, getByRole } = wrap(<TabelaPrecos />);
    // Tab "Individual" inicial
    const initial = container.textContent || "";
    expect(initial).toMatch(/AUVP Sempre|AUVP Anal/);

    // Click na tab Pacotes
    const pacotesBtn = getByRole("button", { name: /pacotes?/i });
    fireEvent.click(pacotesBtn);
    const after = container.textContent || "";
    expect(after).toMatch(/Pacote/);

    // Volta para Individual
    const indBtn = getByRole("button", { name: /individual/i });
    fireEvent.click(indBtn);
    expect(container.textContent || "").toMatch(/AUVP Sempre|AUVP Anal/);
  });
});

describe("PlataformaPlaylist — três estados de item", () => {
  it("renderiza item ativo, concluído e bloqueado", () => {
    const { container } = wrap(<PlataformaPlaylist />);
    const text = container.textContent || "";
    expect(text).toContain("Aulas do Módulo");
    expect(text).toContain("01. O despertar financeiro");
    expect(text).toContain("Assistindo");
    expect(text).toContain("02. Entendendo a inflação");
    expect(text).toContain("Concluído");
    expect(text).toContain("03. O poder dos juros compostos");

    // Estados via classes
    const items = container.querySelectorAll(".rounded-lg.flex.gap-3");
    const states = Array.from(items).slice(0, 4).map((el) => {
      const cls = el.className;
      if (cls.includes("bg-accent/10")) return "ativo";
      if (el.querySelector("svg.text-emerald-500, svg.text-emerald-500\\/80")) return "concluido";
      if (el.textContent?.includes(":") && cls.includes("border-transparent")) {
        return el.querySelector(".bg-muted") ? "bloqueado" : "concluido";
      }
      return "?";
    });
    expect(states).toMatchInlineSnapshot(`
      [
        "ativo",
        "concluido",
        "bloqueado",
        "bloqueado",
      ]
    `);
  });
});

describe("ContagemRegressiva — 4 unidades de tempo", () => {
  it("renderiza Dias/Horas/Minutos/Segundos com valores demo", () => {
    const { container } = wrap(<ContagemRegressiva />);
    const labels = Array.from(container.querySelectorAll(".font-roboto.uppercase.text-accent"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean);
    expect(labels).toMatchInlineSnapshot(`
      [
        "Dias",
        "Horas",
        "Minutos",
        "Segundos",
      ]
    `);
    const values = Array.from(container.querySelectorAll(".font-anek.text-3xl, .font-anek.text-\\[42px\\]"))
      .map((el) => el.textContent?.trim())
      .filter((v) => v && /^\d{2}$/.test(v));
    expect(values).toEqual(["05", "12", "30", "45"]);
  });
});

describe("PlataformaRating — fluxo de seleção", () => {
  it("inicia com placeholder e habilita conteúdo após escolher estrela", () => {
    const { container, getAllByRole } = wrap(<PlataformaRating />);

    // Estado inicial
    expect(container.textContent).toContain("Selecione uma nota");
    expect(container.querySelector("textarea")).toBeNull();
    const submit = getAllByRole("button", { name: /enviar avalia/i })[0] as HTMLButtonElement;
    expect(submit.disabled).toBe(true);

    // Clica na 4ª estrela
    const starButtons = container.querySelectorAll(".flex.items-center.justify-center.gap-2.mb-4 > button");
    expect(starButtons.length).toBe(5);
    fireEvent.click(starButtons[3]);

    expect(container.textContent).toContain("Boa");
    expect(container.querySelector("textarea")).not.toBeNull();
    expect(submit.disabled).toBe(false);

    // Toggle de 2 tags
    const tag1 = within(container as HTMLElement).getByRole("button", { name: /didática excelente/i });
    const tag2 = within(container as HTMLElement).getByRole("button", { name: /conteúdo prático/i });
    fireEvent.click(tag1);
    fireEvent.click(tag2);
    expect(tag1.className).toContain("border-accent");
    expect(tag2.className).toContain("border-accent");

    // Destoggle
    fireEvent.click(tag1);
    expect(tag1.className).not.toContain("bg-accent/10");
  });

  it("mostra label correta para cada nota", () => {
    const { container } = wrap(<PlataformaRating />);
    const stars = container.querySelectorAll(".flex.items-center.justify-center.gap-2.mb-4 > button");
    const expected = ["Péssima", "Ruim", "OK", "Boa", "Excelente!"];
    expected.forEach((label, i) => {
      fireEvent.click(stars[i]);
      expect(container.textContent).toContain(label);
    });
  });
});
