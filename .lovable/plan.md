

## Corrigir navegacao dos dropdowns + melhorias

### Problema identificado

Os links dos dropdowns "Servicos" e "Portfolio" nao direcionam corretamente por dois motivos:

1. **Race condition com o dropdown**: Ao clicar, `setActive(null)` fecha o dropdown imediatamente, o que dispara `onMouseLeave` no `<nav>`, criando um conflito de timing com o scroll
2. **Delay desnecessario no `scrollTo`**: A funcao `scrollTo` tem um `setTimeout` de 350ms (pensado para o menu mobile fechar antes), mas no desktop isso causa lag e potenciais conflitos
3. **Tag `<a>` com href e onClick**: Mesmo com `preventDefault`, o browser pode processar o `href="#servicos"` antes do React handler em certos casos

### Solucao

**1. Separar logica desktop/mobile no `scrollTo`:**
- No desktop (dropdown), fazer scroll imediato sem delay
- No mobile, manter o delay de 350ms para o menu animar antes do scroll

**2. Usar `<button>` em vez de `<a>` nos HoveredLink do Navbar:**
- Evita conflitos entre `href` nativo e `onClick` do React
- Alternativa: manter `<a>` mas garantir que `preventDefault` funciona antes de qualquer acao

**3. Melhorar o `handleNavClick`:**
- Remover o `setTimeout` no fluxo desktop
- Adicionar `window.scrollTo` como fallback se `querySelector` nao encontrar o elemento

**4. Melhorias sugeridas:**
- Cada item do dropdown Portfolio pode linkar para a pagina `/portfolio` com filtro do tipo de projeto (ex: `/portfolio?type=ecommerce`)
- Cada item do dropdown Servicos pode linkar diretamente para o card correspondente na secao servicos (usar IDs individuais nos cards)
- Adicionar feedback visual (highlight) na secao de destino apos o scroll

### Ficheiros afetados

| Ficheiro | Alteracao |
|----------|-----------|
| `src/components/Navbar.tsx` | Refatorar `scrollTo` e `handleNavClick` para scroll imediato no desktop; adicionar IDs especificos para cada servico/portfolio item |
| `src/components/ui/navbar-menu.tsx` | Adicionar suporte a `onClick` como `<button>` alternativo no `HoveredLink` para evitar conflito com `<a href>` |
| `src/components/Services.tsx` | Adicionar IDs individuais aos cards de servico (ex: `id="servico-websites"`) |

### Detalhes tecnicos

A funcao `handleNavClick` refatorada:

```text
handleNavClick(href, e):
  e.preventDefault()
  e.stopPropagation()
  setActive(null)
  se location.pathname === "/":
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  senao:
    navigate("/" + href)
```

No `HoveredLink`, quando receber `onClick`, renderizar como `<div role="button">` em vez de `<a>` para evitar conflito com o href nativo:

```text
se onClick fornecido:
  renderizar <div role="button" tabIndex={0} onClick={onClick}>
senao:
  renderizar <a href={href}>
```

Isto elimina completamente o conflito entre navegacao nativa do browser e o handler React.
