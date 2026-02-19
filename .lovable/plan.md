

# Melhorias no Header, FAQ e Pricing

## 1. Navbar - Design e Fluxo

### Problemas identificados (das imagens):
- Falta link para a pagina de Precos/Planos no navbar
- O dropdown do LanguageSwitcher usa classe `glass` que pode ficar semi-transparente em certos contextos
- Navbar desktop nao tem link direto para `/pricing`
- Mobile: falta link para Precos no menu drawer

### Alteracoes:
**`src/components/Navbar.tsx`**:
- Adicionar link "Planos" no navbar desktop (entre "Processo" e LanguageSwitcher) usando `react-router-dom` `Link` apontando para `/pricing`
- Adicionar link "Planos" no menu mobile
- Traduzir label via `t("nav.pricing")`

**`src/components/LanguageSwitcher.tsx`**:
- Substituir classe `glass` no dropdown por background solido: `bg-card border border-border backdrop-blur-xl` para garantir opacidade total e evitar transparencia

### Novas chaves i18n em todos os 4 locales:
- `nav.pricing`: "Planos" (PT), "Plans" (EN), "Planes" (ES), "Piani" (IT)

---

## 2. FAQ - Alinhar com dados reais

### Problemas atuais:
- "Trabalham com clientes em 12 paises" - inconsistente (todos os projetos sao do mesmo pais)
- "Projetos comecam em 2.000 euros" - desatualizado (Starter agora e 750 euros)
- Tom generico, nao reflete a identidade do site

### Alteracoes nos 4 locales:
Reescrever as 6 respostas do FAQ para:

1. **Quanto tempo demora?** - Manter, esta ok
2. **Quanto custa?** - Atualizar: "Os nossos projetos comecam em 750 euros para landing pages. O plano Growth comeca em 3.000 euros e o Premium e sob consulta. Fornecemos sempre um orcamento detalhado antes de comecar."
3. **Trabalham com empresas fora de Portugal?** - Reescrever: remover "12 paises", dizer que trabalham remotamente com empresas de qualquer localizacao
4. **O que acontece apos o lancamento?** - Manter, esta ok
5. **Posso atualizar o conteudo sozinho?** - Manter, esta ok
6. **Que tecnologias utilizam?** - Manter, esta ok

---

## 3. Pricing - Atualizar precos

### Novos valores:
| Plano | Preco |
|-------|-------|
| Starter | 750 euros |
| Growth | 3.000 euros |
| Premium | Consultar / Sob consulta |

### Alteracoes nos 4 locales (`pricing.plans`):

**Starter**: "750 euros" (PT), "€750" (EN), "750€" (ES), "750€" (IT)
**Growth**: "3.000 euros" (PT: "A partir de €3.000"), (EN: "From €3,000"), etc.
**Premium**: "Sob consulta" (PT), "Custom quote" (EN), "A consultar" (ES), "Su preventivo" (IT)

---

## Ficheiros a alterar

1. `src/components/Navbar.tsx` - Adicionar link Planos (desktop + mobile)
2. `src/components/LanguageSwitcher.tsx` - Background solido no dropdown
3. `src/i18n/locales/pt.json` - nav.pricing + FAQ + Pricing prices
4. `src/i18n/locales/en.json` - nav.pricing + FAQ + Pricing prices
5. `src/i18n/locales/es.json` - nav.pricing + FAQ + Pricing prices
6. `src/i18n/locales/it.json` - nav.pricing + FAQ + Pricing prices

