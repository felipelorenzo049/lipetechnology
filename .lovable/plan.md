

# Refazer TechStack com Layout de Arcos Concentricos (Referencia Exata)

## Problema
O layout atual usa posicionamento manual com coordenadas absolutas que nao reproduz fielmente o design de referencia com arcos concentricos e gradientes coloridos.

## Solucao
Reescrever o `TechStack.tsx` seguindo a estrutura exata do componente `demo.tsx` fornecido, adaptando para o tema escuro do site.

## Layout (baseado na imagem de referencia)

O design usa uma area central com:
1. **Arcos concentricos** (3 circulos com bordas sutis e gradiente) como fundo decorativo
2. **Icones em 4 filas** distribuidos simetricamente:
   - Fila 1 (topo): 1 icone centrado
   - Fila 2: 2 icones
   - Fila 3: 3 icones
   - Fila 4: 3 icones
   - Centro (embaixo): Logo LIPE com destaque
3. **Texto abaixo**: titulo + subtitulo + botao CTA
4. **Tabela comparativa** mantida abaixo

## Detalhes Tecnicos

### Estrutura do layout de arcos
Usar `grid` com posicionamento relativo em vez de coordenadas absolutas. Cada fila sera um `flex` centrado com `gap` e `justify-center`. Os arcos serao circulos concentricos posicionados com `absolute` e gradientes sutis usando as cores do tema (primary, secondary).

### Gradientes dos arcos (adaptados ao tema escuro)
- Arco externo: `border-border/20` com gradiente sutil de `primary/10` a `secondary/10`
- Arco medio: `border-border/15`
- Arco interno: `border-primary/20`

### Cards dos icones
Manter o `IntegrationCard` existente com hover effects.

### CTA
Adicionar botao "Fale Conosco" (link para secao de contato) abaixo do subtitulo, usando `Button` com variante `outline`.

## Ficheiro a alterar

1. **`src/components/TechStack.tsx`** - Reescrever a secao de arcos com layout em filas centradas + arcos concentricos como fundo decorativo, mantendo a tabela comparativa intacta

