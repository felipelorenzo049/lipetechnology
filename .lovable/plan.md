

## Reordenar colunas da tabela de comparação — LIPE primeiro

### Alteração

Na tabela de comparação em `src/components/TechStack.tsx`, mover a coluna "LIPE" para ser a primeira após "Criteria", seguida por "DIY Builders" e "Trad. Agency".

### Ficheiro afetado

| Ficheiro | Alteração |
|----------|-----------|
| `src/components/TechStack.tsx` | Reordenar `<th>` e `<td>` — LIPE primeiro, depois DIY, depois Agency |

### Detalhes

Ordem atual: Criteria → DIY Builders → Trad. Agency → **LIPE**

Nova ordem: Criteria → **LIPE** → DIY Builders → Trad. Agency

Tanto no `<thead>` como no `<tbody>`, trocar a ordem das colunas. O estilo destacado (bg-primary/5, border, gradient-text) mantém-se na coluna LIPE.

