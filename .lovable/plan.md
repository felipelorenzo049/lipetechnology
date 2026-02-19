

## Corrigir Sparkles no Hero

### Problema identificado

O componente `SparklesCore` recebe `particleColor="hsl(var(--primary))"`, mas a biblioteca tsparticles nao consegue resolver variaveis CSS (`var(--primary)`). Ela espera um valor de cor concreto (hex, rgb, etc). Como resultado, as particulas sao renderizadas com cor invalida e ficam invisiveis.

A mesma situacao pode estar a acontecer no Portfolio, que tambem usa o SparklesCore.

### Solucao

Substituir `hsl(var(--primary))` por um valor de cor concreto baseado na variavel `--primary: 220 78% 57%`, que corresponde a `#2563EB` (azul).

### Ficheiros a modificar

**`src/components/Hero.tsx`** (linha 26):
- De: `particleColor="hsl(var(--primary))"`
- Para: `particleColor="#4B83F0"` (azul primario da marca)

**`src/components/Portfolio.tsx`** (se tambem usar `hsl(var(--primary))`):
- Aplicar a mesma correcao

### Resultado esperado

Particulas brilhantes azuis visiveis sobre o fundo gradient do Hero, criando o efeito sparkles desejado.

