

## Corrigir navegacao dos dropdowns Servicos e Portfolio

### Problema

Os links dentro dos menus dropdown "Servicos" e "Portfolio" na navbar nao funcionam corretamente porque:

1. O `<a href="#servicos">` dispara a navegacao padrao do browser (jump instantaneo) ao mesmo tempo que o `onClick` tenta fazer scroll suave -- conflito
2. O `onClick` nao chama `e.preventDefault()`, entao o comportamento padrao do link interfere
3. O dropdown nao fecha apos o clique (falta chamar `setActive(null)`)
4. Quando o utilizador esta numa pagina diferente (ex: `/pricing`), os links `#servicos` nao funcionam porque as secoes so existem na pagina inicial (`/`)

### Solucao

**1. Atualizar `scrollTo` no `Navbar.tsx`:**
- Adicionar `e.preventDefault()` nos handlers
- Fechar o dropdown (`setActive(null)`) ao clicar
- Detetar se o utilizador esta na pagina inicial:
  - Se sim: scroll suave para a secao
  - Se nao: navegar para `/#servicos` (redirecionar para home com ancora)

**2. Atualizar `HoveredLink` no `navbar-menu.tsx`:**
- Passar `setActive` como prop opcional para poder fechar o dropdown ao clicar
- Ou alternativamente, alterar os links do Navbar para usarem `onClick` com `e.preventDefault()` e tratarem a navegacao manualmente

**3. Abordagem tecnica escolhida:**
- No `Navbar.tsx`, usar `useNavigate` e `useLocation` do react-router-dom
- Substituir os `HoveredLink` por wrappers que:
  - Chamam `e.preventDefault()`
  - Fecham o dropdown (`setActive(null)`)
  - Se estiverem em `/`, fazem scroll suave
  - Se estiverem noutra pagina, usam `navigate("/#servicos")` e apos carregar fazem scroll

### Ficheiros afetados

| Ficheiro | Alteracao |
|----------|-----------|
| `src/components/Navbar.tsx` | Adicionar `useNavigate`, `useLocation`; criar funcao `handleNavClick` que trata navegacao cross-page e fecha dropdown |
| `src/components/ui/navbar-menu.tsx` | Nao precisa mudar -- o `...rest` ja passa o `onClick` com `preventDefault` |

### Detalhes tecnicos

A funcao `handleNavClick` no Navbar ficara assim:

```text
handleNavClick(href, e):
  e.preventDefault()
  setActive(null)           // fecha dropdown
  se location.pathname === "/":
    scrollTo(href)          // scroll suave
  senao:
    navigate("/" + href)    // navega para home com ancora
```

Para garantir que o scroll funcione apos navegacao cross-page, o Index.tsx verificara se ha um hash na URL ao montar e fara scroll para a secao correspondente.

