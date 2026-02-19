

## Plano de Alteracoes

### 1. Padronizar titulos entre idiomas

O problema e que alguns titulos em portugues ficam com 3 linhas enquanto em ingles ficam com 2. Vou encurtar os textos traduzidos para manter o mesmo layout visual em todas as linguas.

Secoes afetadas:
- **Hero**: "Tecnologia que amplifica quem voce e" vs "Technology that amplifies who you are"
- **Services**: "Tudo o que precisa para crescer digital" (mais longo)
- **Manifesto**, **Process**, **Portfolio** - revisar todos os titulos

Abordagem: encurtar as traducoes PT/ES/IT para que o numero de linhas seja consistente com o ingles.

### 2. Remover secao de Pricing (Planos)

Como tem mais de um produto, os planos fixos nao fazem sentido. Vou:
- Remover o componente `Pricing` da pagina principal (`Index.tsx`)
- Remover o link "Plans" do menu de navegacao (`Navbar.tsx`)
- Remover as chaves `pricing` e `nav.plans/starter/professional/enterprise` dos 4 ficheiros de traducao
- Remover o ficheiro `src/components/Pricing.tsx`

### 3. Criar pagina dedicada ao Portfolio

Vou criar uma rota `/portfolio` com uma pagina completa:
- **Nova pagina** `src/pages/PortfolioPage.tsx` com Navbar, conteudo do portfolio expandido e Footer
- **Nova rota** em `App.tsx`: `/portfolio`
- Na pagina principal, o portfolio fica como um resumo/preview com um botao "Ver todos os projetos" que leva a `/portfolio`
- O componente `Portfolio.tsx` existente sera adaptado para a pagina dedicada, com mais espaco e detalhes
- A pagina principal tera uma versao resumida com 2 projetos e um CTA

---

### Detalhes tecnicos

**Ficheiros a criar:**
- `src/pages/PortfolioPage.tsx` - pagina dedicada com layout completo

**Ficheiros a modificar:**
- `src/App.tsx` - adicionar rota `/portfolio`
- `src/pages/Index.tsx` - remover `Pricing`, manter `Portfolio` como preview
- `src/components/Portfolio.tsx` - adaptar para aceitar prop `preview` (mostra 2 items) vs completo
- `src/components/Navbar.tsx` - remover menu "Plans", atualizar link Portfolio para `/portfolio`
- `src/i18n/locales/en.json` - remover pricing, adicionar chave "viewAll", encurtar titulos
- `src/i18n/locales/pt.json` - idem + padronizar comprimento dos titulos
- `src/i18n/locales/es.json` - idem
- `src/i18n/locales/it.json` - idem

**Ficheiros a remover:**
- `src/components/Pricing.tsx`

