

## Dashboard Admin LIPE Technology

### Resumo

Criar um painel administrativo completo para a LIPE Technology, usando o componente de sidebar colapsavel fornecido como base, mas totalmente adaptado a identidade visual da LIPE (tema escuro, cores primary/secondary/accent, fontes Syne + DM Sans, efeitos glass e gradient).

### Estrutura de ficheiros

| Ficheiro | Acao |
|----------|------|
| `src/components/ui/dashboard-with-collapsible-sidebar.tsx` | Novo - componente base adaptado a LIPE |
| `src/components/admin/AdminDashboard.tsx` | Novo - pagina principal do dashboard |
| `src/pages/AdminPage.tsx` | Novo - rota `/admin` |
| `src/App.tsx` | Atualizado - adicionar rota `/admin` |

### Design e adaptacoes

O componente fornecido sera reescrito para seguir o design system da LIPE:

**Sidebar:**
- Fundo `bg-background` (216 33% 7%) com borda `border-border`
- Logo LIPE com `gradient-text` no topo
- Items da sidebar usando cores `primary`, `secondary` e `muted`
- Efeito `glass` nos elementos interativos
- Icones: Dashboard, Projetos, Clientes, Financeiro, Analytics, Mensagens, Configuracoes

**Conteudo principal:**

1. **Header** com saudacao "Bem-vindo, Admin" (font-headline Syne) e acoes rapidas
2. **KPI Cards** (4 cards glass com gradientes):
   - Projetos Ativos (com icone e variacao %)
   - Receita Mensal (em EUR)
   - Leads / Contactos recebidos
   - Taxa de Conversao
3. **Grafico de receita** usando Recharts (ja instalado) com cores primary/secondary
4. **Atividade recente** - lista de ultimas acoes (novos contactos, projetos, pagamentos)
5. **Projetos em andamento** - tabela simples com estado (em progresso, concluido, pendente)

### Detalhes tecnicos

- Sem dark/light toggle (o site LIPE ja e totalmente dark)
- Sidebar colapsavel com animacao suave via estado local
- Usa classes utilitarias existentes: `glass`, `gradient-text`, `glow-primary`, `font-headline`, `font-body`, `font-mono`
- KPI cards com o mesmo estilo dos cards do portfolio (glass + rounded-2xl)
- Recharts `AreaChart` com `fill` usando `hsl(var(--primary))` e `hsl(var(--secondary))`
- Dados mocados (estaticos) para demonstracao - podem ser conectados ao Supabase depois
- Responsivo: sidebar colapsa automaticamente em mobile

### Navegacao da sidebar

| Item | Icone |
|------|-------|
| Dashboard | LayoutDashboard |
| Projetos | Layers |
| Clientes | Users |
| Financeiro | DollarSign |
| Analytics | BarChart3 |
| Mensagens | MessageSquare |
| Configuracoes | Settings |

Inicialmente apenas a vista "Dashboard" tera conteudo real. Os restantes items serao placeholders preparados para expansao futura.

