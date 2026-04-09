

## Dashboard Admin 100% Funcional — Plano Completo

### Diagnóstico atual

| Secção | Estado | Problema |
|--------|--------|----------|
| Dashboard | Funcional | OK — KPIs, gráfico e atividade recente já ligados ao DB |
| Projetos | Funcional | CRUD completo já implementado |
| Clientes (Leads) | Funcional | Listagem + mudança de estado + detalhe OK |
| Financeiro | Funcional | Criar pagamentos + listagem OK |
| **Mensagens** | **Placeholder** | Mostra "em breve" — badge hardcoded `notifs={3}` |
| **Analytics** | **Placeholder** | Mostra "em breve" |
| **Configurações** | **Placeholder** | Mostra "em breve" |
| Sidebar badge | Bug | `notifs={3}` é estático, não reflete dados reais |

### O que vou implementar

#### 1. Mensagens — view funcional com leads como inbox
Em vez de criar uma tabela separada de mensagens (o formulário de contacto já grava em `leads` com campo `message`), a secção "Mensagens" vai mostrar os leads que têm mensagem, como um inbox:
- Lista de leads com mensagem, ordenados por data
- Badge na sidebar mostra contagem real de leads com status `novo` que têm mensagem
- Marcar como lido (muda status de `novo` para `contactado`)
- Visualizar mensagem completa inline
- Responder via link mailto (abre email)

#### 2. Analytics — métricas reais a partir dos dados existentes
Vista com gráficos e estatísticas calculadas a partir de projects, leads e payments:
- Gráfico de leads por mês (bar chart)
- Gráfico de receita acumulada (area chart)
- Taxa de conversão ao longo do tempo
- Distribuição de leads por status (pie/donut)
- Distribuição de projetos por status

#### 3. Configurações — perfil admin básico
- Exibir email do admin logado
- Botão de alterar password (via `supabase.auth.updateUser`)
- Botão de logout

#### 4. Sidebar — badge dinâmico
- Passar contagem real de leads `novo` com mensagem para a sidebar
- Remover o `notifs={3}` hardcoded

### Ficheiros afetados

| Ficheiro | Ação |
|----------|------|
| `src/components/admin/MessagesView.tsx` | **Criar** — inbox de mensagens dos leads |
| `src/components/admin/AnalyticsView.tsx` | **Criar** — dashboards analíticos |
| `src/components/admin/SettingsView.tsx` | **Criar** — configurações do admin |
| `src/components/admin/AdminDashboard.tsx` | **Editar** — substituir PlaceholderViews, passar contagem de notificações à sidebar |
| `src/components/ui/dashboard-with-collapsible-sidebar.tsx` | **Editar** — aceitar `notifCount` como prop dinâmico em vez de hardcoded |
| `src/hooks/use-admin-data.ts` | **Editar** — adicionar hook `useUnreadMessages` para contagem de leads novos com mensagem |

### Detalhes técnicos

- Sem alterações na base de dados — todos os dados já existem nas tabelas `leads`, `projects` e `payments`
- Analytics usa Recharts (já instalado) com `BarChart`, `PieChart` e `AreaChart`
- Mensagens reutiliza a query de leads com filtro `message IS NOT NULL`
- Badge da sidebar recebe prop dinâmico do `AdminDashboard` via query em tempo real
- Configurações usa `supabase.auth.getUser()` e `supabase.auth.updateUser()`

