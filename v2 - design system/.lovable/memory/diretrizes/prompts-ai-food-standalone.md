---
name: Prompts AI-Food Standalone
description: Cada prompt do AI-Food deve ser auto-contido, sem referenciar outros prompts ou conceitos definidos em outras seções
type: preference
---
Cada prompt do AI-Food (em TomEVozAIFoodData.ts) precisa funcionar como texto standalone.

Regras:
- Repetir o bloco [CONTEXTO AUVP — LEIA ANTES DE ESCREVER] em todos os prompts (empresa, Raul Sena, Buy and Hold, Diagrama do Cerrado, ecossistema)
- Repetir [VOZ AUVP — ATRIBUTOS INEGOCIÁVEIS], [VOCABULÁRIO OBRIGATÓRIO] e [REGRAS UNIVERSAIS] em todos
- Nunca escrever "siga as diretrizes da seção X" ou "como definido no Marketing"
- Cada prompt termina com "Agora escreva o texto solicitado abaixo."
- O usuário copia o prompt para uma IA externa (ChatGPT, Claude, etc.) e ele precisa funcionar isolado
