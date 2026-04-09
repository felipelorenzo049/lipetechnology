

## Limpar Dados Fictícios do Dashboard

### Problema
Os 5 leads e respetivas mensagens que aparecem no dashboard são **dados de seed fictícios** inseridos via migração SQL. Nomes como "João Silva", "Maria Costa" não são reais e podem confundir ao misturar-se com leads verdadeiros que chegarem pelo formulário de contacto.

### Solução
Eliminar todos os leads fictícios da base de dados via migração SQL, mantendo apenas os projetos e pagamentos (que representam trabalho real da LIPE).

### Migração SQL

```sql
DELETE FROM public.leads
WHERE email IN (
  'joao@empresa.pt',
  'maria.costa@gmail.com',
  'ricardo@mendesarq.pt',
  'ana.ferreira@startup.io',
  'carlos@oliveira.com'
);
```

### Resultado
- Secção **Mensagens**: ficará vazia até chegarem leads reais pelo formulário
- Secção **Analytics**: gráficos de leads ficarão a zero (normal — reflete a realidade)
- **Projetos e Pagamentos**: mantêm-se (EasyLine, Milan, etc. são projetos reais do portfólio)
- Badge de notificações: mostrará 0

### Ficheiros afetados
| Ficheiro | Ação |
|----------|------|
| Nova migração SQL | **Criar** — DELETE dos leads fictícios |

Nenhuma alteração de código necessária.

