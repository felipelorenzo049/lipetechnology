

# Fix: Logos Empilhados no Centro

## Problema
Os logos estao todos empilhados no centro porque os elementos `absolute` nao tem `top` e `left` definidos. O `transform: translate(Xpx, Ypx)` precisa de um ponto de ancoragem no centro do container para funcionar corretamente.

## Solucao

Alteracao simples em **uma linha** no ficheiro `src/components/TechStack.tsx`:

### Linha 202-203 (motion.div dos logos)

**De:**
```tsx
className="absolute z-10"
style={{ transform: `translate(${x}px, ${y}px)` }}
```

**Para:**
```tsx
className="absolute z-10 left-1/2 top-1/2"
style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
```

Isso ancora cada logo no centro exato do container (50%, 50%) e depois desloca com as coordenadas polares calculadas (`x`, `y`). O `-50%` compensa o tamanho do proprio card para centralizar.

### Mesma correcao no logo LIPE central (linha 219)

Adicionar `left-1/2 top-1/2` e `style={{ transform: 'translate(-50%, -50%)' }}` ao `motion.div` do LIPE para garantir centralizacao perfeita.

