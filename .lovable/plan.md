

# Plano: Substituir TechStack, Ajustar KPIs e Alinhar Depoimentos

## 1. Substituir secao TechStack por Integrations Grid

Reescrever `src/components/TechStack.tsx` com um layout de grid de cards (inspirado no componente cnblocks), adaptado ao dark theme do site. Cada card tera:
- Logo SVG inline da tecnologia (nao texto)
- Nome da tecnologia
- Descricao curta
- Animacao de entrada com Framer Motion

Tecnologias com logos SVG inline:
- **React** (icone atomico)
- **Next.js** (N logo)
- **TypeScript** (TS logo)
- **Supabase** (icone DB)
- **Node.js** (hexagono)
- **Tailwind CSS** (vento)
- **OpenAI** (sparkle)
- **Stripe** (S logo)
- **Figma** (losango)

Manter a tabela comparativa (DIY vs Agencia vs LIPE) abaixo, pois e uma ferramenta de conversao importante.

Adaptacoes do componente original:
- Remover `Link` do Next.js (usar `react-router-dom` ou remover links)
- Remover botao "Learn More" (nao faz sentido neste contexto)
- Adaptar classes para o dark theme existente (glass, gradients)
- Usar `framer-motion` para animacoes de scroll

## 2. Ajustar KPIs

Alterar `src/components/KPIs.tsx`:
- **Projetos**: 50+ muda para **4** (numero real de projetos no portfolio)
- **Remover "Paises"**: todos os projetos sao do mesmo pais
- **Substituir por "Horas poupadas"**: ex: "500+" horas poupadas para clientes (KPI de impacto)
- **Satisfacao**: manter 4.9/5
- **Entrega no prazo**: mudar de 98% para **100%**

Novos KPIs:
| KPI | Valor | Sufixo |
|-----|-------|--------|
| Projetos entregues | 4 | (sem sufixo) |
| Horas poupadas | 500 | + |
| Satisfacao | 4.9 | /5 |
| Entrega no prazo | 100 | % |

Atualizar traducoes em todos os 4 locales.

## 3. Alinhar Depoimentos com Projetos Reais

Reescrever os 4 testimonials para corresponder aos 4 projetos do portfolio:

| Projeto | Autor | Role |
|---------|-------|------|
| EasyLine | Carlos R. | CEO, EasyLine |
| Plate Boutique | Sofia M. | Proprietaria, Plate Boutique |
| Agendamento Inteligente | Pedro M. | Diretor, Studio Wellness |
| Milan | Ricardo T. | Leiloeiro, Milan Veiculos |

Atualizar quotes em PT, EN, ES e IT com depoimentos especificos ao resultado de cada projeto.

## Ficheiros a alterar

1. `src/components/TechStack.tsx` - Reescrever com grid de cards + logos SVG
2. `src/components/KPIs.tsx` - Ajustar valores e remover "paises"
3. `src/i18n/locales/pt.json` - KPIs + testimonials
4. `src/i18n/locales/en.json` - KPIs + testimonials
5. `src/i18n/locales/es.json` - KPIs + testimonials
6. `src/i18n/locales/it.json` - KPIs + testimonials

