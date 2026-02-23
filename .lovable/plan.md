

## Conectar Dashboard Admin ao Supabase

### Resumo

Criar 3 tabelas no Supabase (projetos, leads, pagamentos) e atualizar o dashboard para buscar dados reais em vez de dados mocados. Tambem sera necessario implementar autenticacao admin para proteger o acesso.

### 1. Criar tabelas no Supabase (migracoes SQL)

**Tabela `projects`:**
- `id` (uuid, PK)
- `name` (text, not null)
- `client` (text)
- `status` (text: 'em_progresso', 'concluido', 'pendente')
- `progress` (integer, 0-100)
- `revenue` (numeric) - valor do projeto
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Tabela `leads`:**
- `id` (uuid, PK)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text)
- `company` (text)
- `budget` (text)
- `message` (text)
- `status` (text: 'novo', 'contactado', 'convertido', 'perdido')
- `created_at` (timestamptz)

**Tabela `payments`:**
- `id` (uuid, PK)
- `project_id` (uuid, FK para projects)
- `amount` (numeric, not null)
- `description` (text)
- `paid_at` (timestamptz)
- `created_at` (timestamptz)

### 2. Politicas RLS

Todas as tabelas terao RLS ativado. As politicas permitirao apenas leitura/escrita para utilizadores autenticados (admin). Inicialmente, qualquer utilizador autenticado pode aceder -- depois pode-se restringir com roles.

- `SELECT`, `INSERT`, `UPDATE` para `authenticated` em todas as tabelas

### 3. Inserir dados iniciais

Inserir os projetos atuais (EasyLine, Plate Boutique, Sistema de Agendamento, Milan Couture) e alguns pagamentos de exemplo para o dashboard ter dados desde o inicio.

### 4. Atualizar formulario de contacto

Modificar `src/components/Contact.tsx` para guardar os leads na tabela `leads` do Supabase ao submeter o formulario (alem de eventualmente enviar email).

### 5. Atualizar AdminDashboard.tsx

Substituir todos os dados mocados por queries ao Supabase usando `@tanstack/react-query`:

- **KPIs**: contar projetos ativos, somar receita do mes, contar leads, calcular taxa de conversao
- **Grafico**: agregar pagamentos por mes para o grafico de receita
- **Atividade recente**: combinar ultimos leads + pagamentos ordenados por data
- **Tabela de projetos**: buscar projetos reais da tabela `projects`

Criar hooks customizados:
- `useProjects()` - buscar projetos
- `useLeads()` - buscar leads
- `usePayments()` - buscar pagamentos
- `useDashboardKPIs()` - calcular KPIs agregados

### 6. Adicionar estados de loading

Usar o componente `Skeleton` existente para mostrar placeholders enquanto os dados carregam.

### Ficheiros afetados

| Ficheiro | Acao |
|----------|------|
| Migracao SQL (3 tabelas + RLS) | Nova |
| `src/components/Contact.tsx` | Atualizado - guardar lead no Supabase |
| `src/hooks/use-admin-data.ts` | Novo - hooks para buscar dados |
| `src/components/admin/AdminDashboard.tsx` | Atualizado - dados reais |

### Nota importante

Como ainda nao existe autenticacao implementada, o dashboard ficara acessivel publicamente. Sera necessario implementar autenticacao (login) numa fase posterior para proteger a rota `/admin`. As politicas RLS exigirao um utilizador autenticado para aceder aos dados.

