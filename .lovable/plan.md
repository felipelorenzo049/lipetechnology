

# Melhorar Logos das Integracoes e Adicionar Logo LIPE

## O que sera feito

1. **Adicionar mais tecnologias** para preencher melhor o espaco dos arcos concentricos. Atualmente sao 9 icones -- vou adicionar mais 4 para totalizar 13, redistribuidos em 5 filas: 1, 2, 3, 3, 3, mais o logo LIPE centralizado embaixo.

2. **Melhorar os SVGs existentes** -- tornar os icones mais reconheciveis e com melhor proporcao dentro dos cards.

3. **Usar o logo LIPE do header** (texto "LIPE" com `gradient-text` e `font-headline`) no card central inferior, em vez do SVG generico atual.

## Novas tecnologias a adicionar

- **Vercel** (deploy/hosting)
- **Framer Motion** (animacoes)
- **N8N** (automacao)
- **Lovable** (ou outro relevante)

## Nova distribuicao em filas

```text
         [ 1 ]           <- Fila 1: 1 icone
       [ 2 ] [ 3 ]       <- Fila 2: 2 icones
     [ 4 ] [ 5 ] [ 6 ]   <- Fila 3: 3 icones
   [ 7 ] [ 8 ] [ 9 ]     <- Fila 4: 3 icones
  [10 ] [11 ] [12 ] [13]  <- Fila 5: 4 icones (preenche arco externo)
        [ LIPE ]          <- Logo central
```

## Logo LIPE no centro

Substituir o `LipeLogo` SVG atual por um componente que usa o mesmo estilo do header:
- `font-headline` (Syne)
- `gradient-text` (gradiente primary -> secondary)
- Texto "LIPE" com `font-bold tracking-widest`

## Detalhes Tecnicos

### Ficheiro a alterar
- `src/components/TechStack.tsx`

### Alteracoes:
1. Adicionar 4 novos componentes SVG inline (Vercel, Framer Motion, N8N, Lovable)
2. Atualizar array `techs` com 13 itens
3. Atualizar `rows` para 5 filas: `[1], [2], [3], [3], [4]`
4. Substituir `LipeLogo` por texto estilizado com `gradient-text font-headline`
5. Aumentar ligeiramente o tamanho dos arcos concentricos para acomodar a fila extra
6. Manter toda a logica de animacao e a tabela comparativa intactas

