import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { iniciarClarity } from "@/lib/clarity";

/* Antes do React: a fila do Clarity precisa existir desde o primeiro
   evento, senão as chamadas feitas na montagem se perdem. */
iniciarClarity();

createRoot(document.getElementById("root")!).render(<App />);
