

## Adicionar link externo ao projeto EasyLine no portfolio

### O que sera feito

Adicionar o link `https://easylinetheway.com` ao projeto EasyLine para que o botao "Ver projeto completo" redirecione para o site real.

### Alteracoes tecnicas

**1. `src/components/Portfolio.tsx`**

- Adicionar campo opcional `url?: string` ao tipo `Project`
- Adicionar `url: "https://easylinetheway.com"` ao projeto EasyLine na lista de projetos
- Transformar o botao "Ver projeto completo" num link `<a>` que abre o URL numa nova aba (`target="_blank"`) quando o projeto tiver URL definido; caso contrario, manter o botao atual

**Antes:**
```tsx
<button className="flex items-center gap-2 ...">
  {t("portfolio.viewProject")} <ExternalLink size={14} />
</button>
```

**Depois:**
```tsx
{project.url ? (
  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ...">
    {t("portfolio.viewProject")} <ExternalLink size={14} />
  </a>
) : (
  <button className="flex items-center gap-2 ...">
    {t("portfolio.viewProject")} <ExternalLink size={14} />
  </button>
)}
```

### Ficheiros afetados

| Ficheiro | Acao |
|----------|------|
| `src/components/Portfolio.tsx` | Atualizado |

