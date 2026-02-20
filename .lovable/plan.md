

# Distribuir Logos em Circulos Concentricos

## Problema Atual
Os logos estao distribuidos em filas horizontais (1, 2, 3, 3, 4) que criam uma forma de cone/triangulo invertido. O usuario quer que os logos sejam distribuidos **ao longo dos circulos concentricos**, como na referencia 2 (imagem-27).

## Solucao

### Layout Circular
Posicionar os logos usando coordenadas polares (`sin`/`cos`) ao longo de 3 aneis concentricos, com o logo LIPE no centro absoluto (sem card wrapper).

**Distribuicao dos 13 logos em 3 aneis:**
- **Anel externo** (raio ~240px): 6 logos espacados a cada 60 graus
- **Anel medio** (raio ~160px): 4 logos espacados a cada 90 graus
- **Anel interno** (raio ~90px): 3 logos espacados a cada 120 graus
- **Centro**: Logo LIPE (texto gradient, sem card/div wrapper)

### Logo LIPE Central
Remover o `IntegrationCard` wrapper do LIPE. Usar apenas o texto estilizado `gradient-text font-headline` centrado, com tamanho maior para destaque.

### Detalhes Tecnicos

**Ficheiro a alterar:** `src/components/TechStack.tsx`

**Posicionamento circular** - cada logo sera posicionado com `absolute` usando calculo trigonometrico:
```tsx
const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // inicio no topo
const x = Math.cos(angle) * radius;
const y = Math.sin(angle) * radius;
// style={{ transform: `translate(${x}px, ${y}px)` }}
```

**Estrutura dos aneis:**
```tsx
const rings = [
  { radius: 240, items: [techs 0-5] },   // 6 logos
  { radius: 160, items: [techs 6-9] },   // 4 logos
  { radius: 90,  items: [techs 10-12] }, // 3 logos
];
```

**Container:** area quadrada com `relative` e dimensoes fixas (`min-h-[500px] md:min-h-[600px]`), todos os logos posicionados com `absolute` a partir do centro.

**Responsivo:** raios reduzidos em mobile (~60% do desktop), cards ligeiramente menores (`size-12` em mobile vs `size-14` em desktop).

**LIPE central:** substituir o `IntegrationCard` por um simples `span` com `gradient-text font-headline font-bold text-2xl tracking-widest`, posicionado no centro absoluto sem borda ou fundo.

Os arcos concentricos de fundo permanecem iguais (3 circulos com bordas sutis e gradientes).

