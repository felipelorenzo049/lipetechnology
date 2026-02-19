
## Transicao suave entre Hero e Manifesto

### Problema atual
Na imagem, ve-se um corte abrupto entre o fundo do Hero (com sparkles e gradient mesh) e a secao do Manifesto ("A nossa filosofia"). Nao ha transicao visual, o que quebra a fluidez do design.

### Solucao

Adicionar um elemento de fade-out na parte inferior do Hero e um fade-in sutil no topo do Manifesto, criando uma transicao continua entre as duas secoes.

### Ficheiros a modificar

**`src/components/Hero.tsx`**
- Adicionar uma div com gradiente na parte inferior da secao Hero:
  - `absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-[2]`
  - Isto cria um fade suave do conteudo do Hero para a cor de fundo do site

**`src/components/Manifesto.tsx`**
- Adicionar uma div com gradiente no topo da secao Manifesto:
  - `absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/50 to-transparent`
  - Reforca a transicao suave vinda do Hero
- Adicionar um separador decorativo sutil (linha horizontal com gradiente) entre as duas secoes para dar mais elegancia

### Resultado esperado
Uma transicao fluida onde o fundo escuro com sparkles do Hero se dissolve suavemente para a secao do Manifesto, sem cortes visuais abruptos.
