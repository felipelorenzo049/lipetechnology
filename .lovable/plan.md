

## Criar Admin felipe@lipe.com com Sistema de Roles

### Resumo

Criar o utilizador admin no Supabase Auth, implementar um sistema de roles seguro (tabela `user_roles` com funcao `has_role`), e atualizar o `ProtectedRoute` para verificar a role `admin` no servidor.

### 1. Migracao SQL - Sistema de Roles

Criar a infraestrutura de roles seguindo as melhores praticas de seguranca:

- Enum `app_role` com valores: `admin`, `moderator`, `user`
- Tabela `user_roles` com RLS ativado
- Funcao `has_role()` como `SECURITY DEFINER` para evitar recursao RLS
- Atualizar as policies das tabelas `projects`, `leads` e `payments` para usar `has_role(auth.uid(), 'admin')` em vez de apenas `authenticated`

### 2. Criar Utilizador Admin

Usar a API do Supabase para criar o utilizador:
- Email: `felipe@lipe.com`
- Password: `Formula1#`
- Inserir registo na tabela `user_roles` com role `admin`

**Nota:** O utilizador sera criado via o painel do Supabase (Authentication > Users > Add User). A role sera atribuida via migracao SQL apos o utilizador ser criado. Alternativamente, podemos criar um trigger que atribui a role automaticamente.

**Abordagem escolhida:** Criar um trigger `on_auth_user_created` que verifica se o email e `felipe@lipe.com` e atribui automaticamente a role `admin`. Para outros utilizadores, nao atribui role nenhuma.

### 3. Atualizar ProtectedRoute

O componente `ProtectedRoute` passara a verificar se o utilizador autenticado tem a role `admin` na tabela `user_roles`, em vez de apenas verificar se esta autenticado.

### 4. Atualizar RLS Policies

Substituir todas as policies que usam `auth.role() = 'authenticated'` por `has_role(auth.uid(), 'admin')`:
- `projects`: SELECT, INSERT, UPDATE, DELETE
- `payments`: SELECT, INSERT, UPDATE, DELETE  
- `leads`: SELECT, UPDATE, DELETE (INSERT mantem para anon -- formulario de contacto)

### Ficheiros afetados

| Ficheiro | Acao |
|----------|------|
| Migracao SQL (roles + policies) | Nova |
| `src/components/admin/ProtectedRoute.tsx` | Atualizado -- verificar role admin |
| `src/pages/AdminLoginPage.tsx` | Sem alteracoes (login ja funciona) |

### Nota importante

Apos a implementacao, sera necessario registar o utilizador `felipe@lipe.com` com a password `Formula1#` atraves do painel do Supabase (Authentication > Users > Add User) ou diretamente pela pagina de login se adicionarmos signup. O trigger atribuira automaticamente a role admin.

