import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, act, within, waitFor } from "@testing-library/react";
import { Notifications } from "./Notifications";

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
    act(() => { pushAll(); });
    NOTIF_TYPES.forEach((type) => {
      expect(screen.getByText(TITLES[type])).toBeInTheDocument();
    });
  });

  it("ao ativar o tema escuro, o wrapper das notificações ganha a classe .dark", async () => {
    const { container } = render(<Notifications />);
    act(() => { pushAll(); });
    const stack = getFixedStack(container);
    const wrapper = stack.parentElement!;
    expect(wrapper.classList.contains("dark")).toBe(false);
    act(() => { fireEvent.click(getThemeToggle()); });
    await waitFor(() => { expect(wrapper.classList.contains("dark")).toBe(true); });
    NOTIF_TYPES.forEach((type) => {
      expect(within(stack).getByText(TITLES[type])).toBeInTheDocument();
    });
  });

  it("alterna escuro → claro e remove a classe .dark do wrapper", async () => {
    const { container } = render(<Notifications />);
    act(() => { pushAll(); });
    const stack = getFixedStack(container);
    const wrapper = stack.parentElement!;
    act(() => { fireEvent.click(getThemeToggle()); });
    await waitFor(() => { expect(wrapper.classList.contains("dark")).toBe(true); });
    act(() => { fireEvent.click(getThemeToggle()); });
    await waitFor(() => { expect(wrapper.classList.contains("dark")).toBe(false); });
    NOTIF_TYPES.forEach((type) => {
      expect(within(stack).getByText(TITLES[type])).toBeInTheDocument();
    });
  });
});
