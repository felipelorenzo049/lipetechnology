

## Limpar Dados Fictícios do Dashboard

### Problema

Os dados que aparecem no dashboard nao sao hardcoded no codigo -- vem do Supabase. Porem, foram inseridos como dados de exemplo (seed data) na migracao inicial para que o dashboard tivesse conteudo desde o inicio. Agora que o dashboard esta funcional, esses dados devem ser removidos para comecar com dados reais.

### O que sera feito

Executar comandos SQL para eliminar todos os dados de exemplo das 3 tabelas:

1. **Eliminar pagamentos** (primeiro, porque referenciam projetos)
2. **Eliminar projetos** (EasyLine, Plate Boutique, Sistema de Agendamento, Milan Couture)
3. **Eliminar leads de teste** (Joao Silva, Maria Santos, Carlos Mendes, Ana Ferreira)

### Detalhes tecnicos

Sera executado via SQL no Supabase:

```sql
DELETE FROM payments;
DELETE FROM projects;
DELETE FROM leads;
```

Isto apaga todos os registos de exemplo. O dashboard ficara vazio e pronto para receber dados reais:
- Leads reais via formulario de contacto do site
- Projetos e pagamentos criados manualmente no painel admin

### Ficheiros afetados

Nenhum ficheiro de codigo sera alterado -- apenas dados na base de dados.

### Alternativa

Se preferires manter alguns dados e apenas atualizar para dados reais, diz-me quais projetos/leads queres manter ou adicionar.

