import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, act, within, waitFor } from "@testing-library/react";
import { Notifications } from "./Notifications";

/**
 * Garante que as notificações reagem corretamente ao toggle local de
 * tema do ComponentShowcase, propagando a classe `.dark` para o
 * wrapper fixo onde os cards são renderizados (fora do showcase, via
 * detecção por MutationObserver no ancestral).
 */
describe("Notifications — alternância de tema claro/escuro", () => {
  afterEach(() => {
    document.documentElement.classList.remove("dark");
  });

  const NOTIF_TYPES = ["success", "info", "warning", "error"] as const;
  const TITLES: Record<(typeof NOTIF_TYPES)[number], string> = {
    success: "Operação concluída",
    info: "Nova atualização",
    warning: "Atenção necessária",
    error: "Algo deu errado",
  };

  function getThemeToggle() {
    return (
      screen.queryByRole("button", { name: /tema escuro/i }) ||
      screen.getByRole("button", { name: /tema claro/i })
    );
  }

  function getFixedStack(container: HTMLElement) {
    const stack = container.querySelector(".fixed.top-20.right-6") as HTMLElement | null;
    if (!stack) throw new Error("Pilha fixa de notificações não encontrada");
    return stack;
  }

  function pushAll() {
    NOTIF_TYPES.forEach((type) => {
      const btn = screen.getByRole("button", { name: new RegExp(`^${type}$`, "i") });
      fireEvent.click(btn);
    });
  }

  it("começa em tema claro: wrapper das notificações não tem classe .dark", () => {
    const { container } = render(<Notifications />);
    const stack = getFixedStack(container);
    const wrapper = stack.parentElement!;
    expect(wrapper.classList.contains("dark")).toBe(false);
  });

  it("dispara as 4 notificações e cada uma renderiza com seu título semântico", () => {
    render(<Notifications />);
    act(() => {
      pushAll();
    });
    NOTIF_TYPES.forEach((type) => {
      expect(screen.getByText(TITLES[type])).toBeInTheDocument();
    });
  });

  it("ao ativar o tema escuro, o wrapper das notificações ganha a classe .dark", async () => {
    const { container } = render(<Notifications />);

    act(() => {
      pushAll();
    });

    // Antes do toggle: sem .dark
    const stack = getFixedStack(container);
    const wrapper = stack.parentElement!;
    expect(wrapper.classList.contains("dark")).toBe(false);

    // Aciona o toggle de tema do ComponentShowcase
    act(() => {
      fireEvent.click(getThemeToggle());
    });

    // O MutationObserver é assíncrono — aguarda a propagação
    await waitFor(() => {
      expect(wrapper.classList.contains("dark")).toBe(true);
    });

    // Todos os 4 cards seguem visíveis com seus títulos
    NOTIF_TYPES.forEach((type) => {
      expect(within(stack).getByText(TITLES[type])).toBeInTheDocument();
    });
  });

  it("alterna escuro → claro e remove a classe .dark do wrapper", async () => {
    const { container } = render(<Notifications />);

    act(() => {
      pushAll();
    });

    const stack = getFixedStack(container);
    const wrapper = stack.parentElement!;

    // claro → escuro
    act(() => {
      fireEvent.click(getThemeToggle());
    });
    await waitFor(() => {
      expect(wrapper.classList.contains("dark")).toBe(true);
    });

    // escuro → claro
    act(() => {
      fireEvent.click(getThemeToggle());
    });
    await waitFor(() => {
      expect(wrapper.classList.contains("dark")).toBe(false);
    });

    // Cards permanecem
    NOTIF_TYPES.forEach((type) => {
      expect(within(stack).getByText(TITLES[type])).toBeInTheDocument();
    });
  });

  it("cada card mantém seu ícone de cor semântica (text-success/info/warning/error)", async () => {
    const { container } = render(<Notifications />);
    act(() => {
      pushAll();
    });

    const stack = getFixedStack(container);
    NOTIF_TYPES.forEach((type) => {
      const icon = stack.querySelector(`.text-${type}`);
      expect(icon, `ícone .text-${type} deveria existir`).not.toBeNull();
    });

    // Após alternar para escuro, as classes semânticas continuam (são tokens HSL)
    act(() => {
      fireEvent.click(getThemeToggle());
    });
    await waitFor(() => {
      expect(stack.parentElement!.classList.contains("dark")).toBe(true);
    });
    NOTIF_TYPES.forEach((type) => {
      const icon = stack.querySelector(`.text-${type}`);
      expect(icon, `ícone .text-${type} deveria persistir no escuro`).not.toBeNull();
    });
  });
});
