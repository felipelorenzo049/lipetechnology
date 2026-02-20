

# Refatoracao Completa da Secao TechStack

## Diagnostico dos Problemas Atuais

### 1. Bug Critico: Logos Invisiveis
O sistema orbital atual esta quebrado. A animacao CSS `orbit` (que define `transform: rotate()`) sobrescreve o `transform: translate()` inline que posiciona cada logo. Resultado: todos os logos colapsam no centro e ficam invisiveis.

### 2. Arquitetura Errada
O codigo usa containers `w-0 h-0` com `absolute` para cada anel, depois tenta aplicar translate + counter-rotate separadamente. Isso nao funciona porque CSS animations sobrepoem transforms inline.

### 3. Layout e UX
- Secao do titulo e texto ficam desconectados do visual orbital
- Tabela de comparacao e generica e nao segue o estilo minimalista
- Sem hierarquia visual clara entre os elementos

---

## Solucao: Tecnica de Transforms Encadeados

A tecnica correta para orbitas CSS usa **transforms encadeados** numa unica animacao:

```text
from { transform: rotate(0deg)   translateX(RAIO) rotate(0deg);    }
to   { transform: rotate(360deg) translateX(RAIO) rotate(-360deg); }
```

Isso:
1. Roda o ponto de ancoragem (orbita)
2. Desloca para fora pelo raio
3. Contra-roda para manter o logo na vertical

Tudo num unico `transform` -- sem conflitos.

---

## Implementacao Detalhada

### Ficheiro: `src/components/TechStack.tsx` (reescrita completa da secao orbital)

### A. Remover containers orbit-ring
Eliminar os `div` wrappers com `w-0 h-0` e `animate-orbit-*`. Cada logo sera posicionado individualmente.

### B. Animacoes por logo com CSS custom properties
Cada logo recebe uma animacao unica via `@keyframes` inline (usando `style`) com:
- `--radius`: raio do seu anel (240px, 160px, 85px desktop / 145px, 95px, 52px mobile)
- `--start-angle`: angulo inicial (distribuido uniformemente)
- `--duration`: velocidade do anel (120s, 90s, 60s)
- `--direction`: normal ou reverse (alternado por anel)

Usar CSS animation com nome unico por anel + offset via `animation-delay` negativo para posicionar cada logo no angulo correto:

```text
animation: orbit-outer 120s linear infinite;
animation-delay: -(index / total * 120)s;
```

### C. Keyframes por anel (3 keyframes no CSS)
Adicionar ao `src/index.css`:

```text
@keyframes orbit-ring-1 {
  from { transform: rotate(0deg) translateX(240px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(240px) rotate(-360deg); }
}
@keyframes orbit-ring-2 {
  from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
  to   { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
}
@keyframes orbit-ring-3 {
  from { transform: rotate(0deg) translateX(85px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(85px) rotate(-360deg); }
}
```

Plus versoes mobile com raios menores.

### D. LIPE Central
- Manter `animate-breathe` e `lipe-glow`
- Adicionar um anel de luz pulsante ao redor (pseudo-element ou div extra)

### E. Efeitos Visuais
- **Circulos de fundo**: manter os 3 circulos concentricos com glow pulsante (`animate-glow-ring-*`)
- **Trilhas orbitais**: circulos dashed nos raios exatos dos logos
- **Hover**: pausa a animacao do logo individual (`animation-play-state: paused` no hover) + escala 1.2x + glow forte
- **Entrada**: framer-motion `initial/animate` para fade+scale no scroll (staggered)

### F. Tabela de Comparacao
- Adicionar fundo glass ao container da tabela
- Highlight na coluna LIPE com fundo gradiente sutil
- Hover nas linhas com glow

---

## Ficheiros a Alterar

1. **`src/components/TechStack.tsx`** -- reescrita da secao orbital (linhas 180-248) e melhorias na tabela
2. **`src/index.css`** -- adicionar keyframes `orbit-ring-1/2/3` com media query para mobile, e remover utilidades de orbital obsoletas
3. **`tailwind.config.ts`** -- sem alteracoes (keyframes existentes de glow/breathe permanecem)

---

## Resumo Visual

```text
       .  .  .  .  .  .       <-- trilha dashed outer
     .                   .
   .   [React] [Next]      .
  .  [Tail]          [TS]   .
  .       .  .  .  .       .  <-- trilha dashed middle
  .     . [OAI] [Str] .     .
   .   .    . . .    .   .
    .  . [FM]     [N8N].  .   <-- trilha dashed inner
     . .   [ LIPE ]  . .
      ..  [Lov]     ..
       .  .  .  .  .
```

Todos os logos orbitam lentamente, mantendo-se na vertical, com glow pulsante nos circulos de fundo e pausa interativa no hover.

