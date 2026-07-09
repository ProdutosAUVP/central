import type { Config } from "tailwindcss";

export default {
  // Variante custom em vez de ["class"]: os previews do Design System forçam
  // tema claro localmente (wrapper .light) mesmo sob html.dark. Com ["class"]
  // (seletor `.dark &`) os utilitários dark: continuavam ativos dentro desses
  // previews. O :not(...) desliga dark: em qualquer subtree .light.
  darkMode: ["variant", "&:is(.dark *):not(:is(.light, .light *))"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        anek: ['"Anek Latin"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
        sora: ['"Sora"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          emphasis: "hsl(var(--primary-emphasis))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          emphasis: "hsl(var(--secondary-emphasis))",
        },
        cta: {
          DEFAULT: "hsl(var(--cta))",
          foreground: "hsl(var(--cta-foreground))",
          emphasis: "hsl(var(--cta-emphasis))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          dark: "hsl(var(--brand-dark))",
          hover: "hsl(var(--brand-hover))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        floatPiggy: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        snortShake: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(-10deg) scale(1.1)" },
          "50%": { transform: "rotate(10deg) scale(1.1)" },
          "75%": { transform: "rotate(-5deg) scale(1)" },
          "100%": { transform: "rotate(0deg) scale(1)" },
        },
        slideUpEntrance: {
          from: { transform: "translateY(150px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        waPulseRing: {
          "0%": { transform: "scale(0.98)", opacity: "0.32" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        waSoftPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.012)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        orbitReverse: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        softPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.12)", opacity: "0.9" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        orbit: "orbit 64s linear infinite",
        "orbit-reverse": "orbitReverse 64s linear infinite",
        "soft-pulse": "softPulse 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        marquee: "marquee 28s linear infinite",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
