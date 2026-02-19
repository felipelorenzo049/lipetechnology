

## Transicao quase imperceptivel entre Hero e Manifesto

### Problema atual
Na imagem ve-se uma linha de corte visivel entre o fundo do Hero (com sparkles) e a secao "A Nossa Filosofia". Isto acontece porque:
- A fade do Hero tem apenas `h-32` (curta demais)
- O Manifesto tem uma fade de `from-background/50` (semi-transparente, nao cobre totalmente)
- O separador decorativo horizontal marca visualmente a divisao
- O padding superior do Manifesto (`py-24`) cria um espaco vazio que expoe o corte

### Alteracoes

**`src/components/Hero.tsx`**
- Aumentar a fade inferior de `h-32` para `h-48` para uma dissolucao mais gradual

**`src/components/Manifesto.tsx`**
- Mudar a fade do topo de `from-background/50` para `from-background` (opacidade total) e aumentar de `h-24` para `h-40`
- Remover o separador decorativo horizontal (a linha `via-primary/30`) que marca a divisao entre secoes
- Reduzir o padding superior de `py-24 md:py-32` para `pt-12 pb-24 md:pt-16 md:pb-32` para aproximar o conteudo e eliminar o espaco vazio

### Resultado esperado
O fundo do Hero dissolve-se suavemente numa area maior, sem nenhuma marca visual de separacao, criando a ilusao de uma unica secao continua.
