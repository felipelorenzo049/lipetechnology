
## Analise e Melhorias de UX/UI na Secao de Servicos

### Problemas identificados

1. **Layout do grid desequilibrado**: O card "Custom Websites" ocupa 2 colunas mas tem pouco conteudo para preencher o espaco. O card "Consultative Chatbots" ocupa 2 linhas mas visualmente nao se diferencia. O card "Maintenance & Support" fica sozinho na ultima linha, criando um espaco vazio assimetrico.

2. **Falta de hierarquia visual**: Todos os cards parecem iguais (mesma cor de icone, mesmo peso visual). Nao ha destaque para o servico principal ou mais popular.

3. **Interacao pouco evidente**: O chevron de expansao e pequeno e discreto. Nao ha indicacao clara de que os cards sao clicaveis (hover apenas adiciona glow, sem feedback forte).

4. **Ausencia de CTA**: Depois de ler sobre um servico, o utilizador nao tem um caminho claro para agir (contactar, pedir orcamento).

5. **Descricoes curtas sem diferenciacao**: O texto muted-foreground e pequeno, dificultando a leitura rapida dos beneficios.

6. **Sem subtitulo da secao**: A secao tem apenas titulo, sem contexto adicional que ajude o utilizador a entender o que vai encontrar.

### Melhorias propostas

**1. Adicionar subtitulo a secao**
- Texto breve abaixo do titulo para contextualizar (ex: "Solucoes completas para a sua presenca digital")

**2. Badge de destaque no servico principal**
- Adicionar um badge "Mais popular" ou "Recomendado" no card de Sites Personalizaveis para criar hierarquia

**3. Melhorar feedback de interacao**
- Adicionar borda com gradiente no hover (border-primary/50)
- Adicionar texto "Ver detalhes" junto ao chevron para tornar a acao mais explicita
- Animacao de scale sutil no hover (scale 1.02)

**4. Adicionar CTA em cada card expandido**
- Botao "Pedir orcamento" ou "Saber mais" no final da lista de detalhes expandida
- Link direto para a secao de contacto com o servico pre-selecionado

**5. Icones com cores diferenciadas**
- Cada servico com uma cor de icone diferente (primary, secondary, accent) para facilitar scan visual

**6. Melhorar layout do grid**
- Reorganizar para que o ultimo card nao fique sozinho: fazer "Maintenance" ocupar as 2 colunas restantes ou reorganizar para 2 colunas em desktop

### Ficheiros a modificar

**`src/components/Services.tsx`**
- Adicionar subtitulo na secao
- Adicionar badge "Mais popular" ao primeiro card
- Melhorar hover com `hover:scale-[1.02]` e `hover:border-primary/50`
- Adicionar texto "Ver detalhes" junto ao chevron
- Adicionar botao CTA dentro da area expandida que linka para `#contacto`
- Diferenciar cores dos icones por servico (primary, secondary, accent)
- Ajustar span do ultimo card para `md:col-span-2` equilibrando o grid

**`src/i18n/locales/pt.json`** (e en.json, es.json, it.json)
- Adicionar chave `services.subtitle` com texto contextual
- Adicionar chave `services.viewDetails` para o texto do botao
- Adicionar chave `services.getQuote` para o CTA
- Adicionar chave `services.popular` para o badge

### Resultado esperado
Secao de servicos com hierarquia visual clara, feedback de interacao forte, caminho de conversao direto em cada card, e layout equilibrado sem espacos vazios.
