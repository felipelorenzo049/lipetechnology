

## Plano: Seed de Dados Reais + Refinamentos no Dashboard

### Contexto
A base de dados está **completamente vazia** — zero projetos, leads e pagamentos. O dashboard funciona mas mostra tudo a zero. Vou inserir dados reais baseados nos projetos do portfólio da LIPE Technology e adicionar melhorias de UX.

### 1. Seed de dados reais via migração SQL

Inserir registos com dados consistentes com o site público:

**Projetos (4):**
| Nome | Cliente | Status | Progresso | Receita |
|------|---------|--------|-----------|---------|
| EasyLine Platform | EasyLine | concluido | 100 | 4500 |
| Plate Boutique | LIPE (interno) | concluido | 100 | 0 |
| Agendamento Inteligente | LIPE (interno) | em_progresso | 65 | 0 |
| Milan Website | Milan | concluido | 100 | 2800 |

**Pagamentos (3-4):** associados aos projetos com clientes, com datas distribuídas nos últimos meses.

**Leads (4-5):** leads de exemplo com mensagens, distribuídos em datas variadas e com estados mistos (novo, contactado, convertido) para que os gráficos e a inbox tenham dados.

### 2. Refinamentos no Dashboard

- **Header dinâmico**: Mostrar o nome real do admin (extraído do email) em vez de "Admin" hardcoded
- **KPI extra**: Adicionar "Receita Total" como KPI no Dashboard (não apenas mensal)
- **Tabela do Dashboard**: Filtrar para mostrar apenas projetos `em_progresso` e `pendente` (não os concluídos)
- **Empty states**: Adicionar mensagens amigáveis quando não há dados em cada secção (em vez de simplesmente ficar em branco)
- **Notif badge**: Corrigir para não mostrar badge quando `notifs === 0` (atualmente o `{notifs && ...}` mostra para `0` como falsy mas convém usar `notifs > 0`)

### Ficheiros afetados

| Ficheiro | Ação |
|----------|------|
| `supabase/migrations/seed_data.sql` | **Criar** — migração com INSERT de projetos, pagamentos e leads de exemplo |
| `src/components/admin/AdminDashboard.tsx` | **Editar** — header dinâmico com nome do admin, filtrar tabela, empty states |
| `src/components/ui/dashboard-with-collapsible-sidebar.tsx` | **Editar** — corrigir condição do badge para `notifs > 0` |
| `src/hooks/use-admin-data.ts` | **Editar** — adicionar receita total ao `useDashboardKPIs` |

### Detalhes técnicos

- A migração usa UUIDs gerados com `gen_random_uuid()` e CTEs para associar pagamentos aos projetos corretos
- O nome do admin é extraído do email via `supabase.auth.getUser()` já disponível no componente
- Nenhuma tabela nova — apenas dados inseridos nas existentes

