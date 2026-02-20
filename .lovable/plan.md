
# Padronizar Design e Fontes do Header

## Problemas Identificados

1. **Inconsistencia de fontes**: "SERVICOS" e "PORTFOLIO" estao em uppercase (via MenuItem), enquanto "Processo" e "Planos" estao em title case (botao/link separados com classe diferente)
2. **Dropdown de Servicos**: Links simples sem destaque visual, sem icones, sem hover sofisticado
3. **Dropdown de Portfolio**: Tem imagens mas estilo diferente do de Servicos - falta padronizacao entre os dois dropdowns

## Solucao

### 1. Padronizar fonte dos itens de navegacao (sem alterar o CTA "Fale Conosco")

No `Navbar.tsx`, os botoes "Processo" e "Planos" usam classes diferentes dos MenuItems. Vou padronizar todos para usar o mesmo estilo: `font-body text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground`.

### 2. Melhorar dropdown de Servicos

Adicionar icones (Lucide) a cada link de servico e um hover mais rico com fundo highlight:
- Sites Personalizados -> icone `Globe`
- Chatbots Consultivos -> icone `MessageSquare`
- SaaS / Plataformas -> icone `LayoutDashboard`
- Marketing Digital -> icone `TrendingUp`

Cada item tera: icone + titulo + descricao curta, com hover `bg-muted/50 rounded-lg` - mesmo padrao visual do dropdown de Portfolio.

### 3. Padronizar dropdown de Portfolio

Manter o layout com imagens mas alinhar o padding, border-radius e hover com o de Servicos. Ambos usarao `p-2 rounded-lg hover:bg-muted/50`.

### 4. Melhorar o componente `navbar-menu.tsx`

- `HoveredLink`: adicionar suporte a icone e descricao como props opcionais
- `MenuItem`: manter o trigger uppercase padronizado
- Ambos os dropdowns terao cantos arredondados consistentes e mesmo box-shadow

## Ficheiros a alterar

1. **`src/components/ui/navbar-menu.tsx`** - Atualizar `HoveredLink` para suportar icone + descricao; refinar estilos do dropdown
2. **`src/components/Navbar.tsx`** - Padronizar classes dos botoes "Processo" e "Planos" para uppercase; adicionar icones e descricoes ao dropdown de Servicos

## Detalhes Tecnicos

**Navbar.tsx** - Botoes Processo e Planos:
```
className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase cursor-pointer"
```

**Dropdown Servicos** - Cada item tera layout com icone:
```
<div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
  <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
  <div>
    <p className="text-sm font-semibold text-foreground">Titulo</p>
    <p className="text-xs text-muted-foreground">Descricao curta</p>
  </div>
</div>
```

Nao sera alterado o CTA "Fale Conosco" nem o logo.
