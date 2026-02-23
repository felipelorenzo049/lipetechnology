

## Dashboard Admin 100% Funcional

### Problema atual

O dashboard esta conectado ao Supabase mas nao funciona porque:
1. **Sem autenticacao** -- as policies RLS exigem `authenticated`, logo o dashboard mostra dados vazios
2. **Sidebar nao funciona** -- apenas "Dashboard" tem conteudo, os outros items (Projetos, Clientes, Financeiro, etc.) nao fazem nada
3. **Sem CRUD** -- nao e possivel adicionar, editar ou eliminar projetos, leads ou pagamentos

### O que sera implementado

#### 1. Autenticacao Admin (Login)

- Pagina de login em `/admin/login` com email + password
- Componente `ProtectedRoute` que redireciona para login se nao autenticado
- Rota `/admin` protegida -- so acessivel apos login
- Botao de logout no header do dashboard

**Nota:** Sera necessario criar um utilizador admin manualmente no painel do Supabase (Authentication > Users > Add User).

#### 2. Vistas da Sidebar funcionais

Cada item da sidebar mostrara uma vista diferente:

| Vista | Funcionalidade |
|-------|----------------|
| **Dashboard** | KPIs, grafico, atividade recente, tabela resumo (ja existe) |
| **Projetos** | Tabela completa com CRUD -- adicionar, editar estado/progresso, eliminar |
| **Clientes (Leads)** | Lista de leads recebidos, alterar status (novo/contactado/convertido/perdido), ver detalhes |
| **Financeiro** | Lista de pagamentos, adicionar novo pagamento associado a projeto, total acumulado |
| **Analytics** | Placeholder com mensagem "Em breve" |
| **Mensagens** | Placeholder com mensagem "Em breve" |
| **Configuracoes** | Placeholder com mensagem "Em breve" |

#### 3. CRUD de Projetos

- Dialogo modal para criar novo projeto (nome, cliente, receita, status)
- Edicao inline ou modal para atualizar progresso e status
- Botao de eliminar com confirmacao

#### 4. Gestao de Leads

- Tabela com todos os leads (nome, email, empresa, orcamento, status, data)
- Dropdown para alterar status do lead
- Ver mensagem completa do lead

#### 5. Gestao Financeira

- Tabela de pagamentos com projeto associado, valor, descricao, data
- Formulario para registar novo pagamento
- Total acumulado no topo

### Alteracoes na base de dados

- Adicionar policy DELETE para `projects` e `payments` (apenas `authenticated`)
- Sem alteracoes de schema

### Ficheiros afetados

| Ficheiro | Acao |
|----------|------|
| Migracao SQL (DELETE policies) | Nova |
| `src/pages/AdminLoginPage.tsx` | Novo -- pagina de login |
| `src/components/admin/ProtectedRoute.tsx` | Novo -- guard de autenticacao |
| `src/components/admin/AdminDashboard.tsx` | Atualizado -- renderizar vistas por selecao da sidebar |
| `src/components/admin/ProjectsView.tsx` | Novo -- CRUD de projetos |
| `src/components/admin/LeadsView.tsx` | Novo -- gestao de leads |
| `src/components/admin/FinanceView.tsx` | Novo -- gestao financeira |
| `src/components/admin/PlaceholderView.tsx` | Novo -- vista placeholder para seccoes futuras |
| `src/hooks/use-admin-data.ts` | Atualizado -- adicionar mutations (create, update, delete) |
| `src/App.tsx` | Atualizado -- adicionar rota `/admin/login` e proteger `/admin` |

### Detalhes tecnicos

- Login via `supabase.auth.signInWithPassword()`
- `ProtectedRoute` usa `supabase.auth.onAuthStateChange()` para monitorizar sessao
- Mutations com `useMutation` do `@tanstack/react-query` com `invalidateQueries` para atualizar dados automaticamente
- Dialogos de criacao/edicao usando `@radix-ui/react-dialog` (ja instalado)
- Confirmacao de eliminacao com `@radix-ui/react-alert-dialog`
- Toda a UI mantendo o design system LIPE (glass, gradient-text, cores primary/secondary)

