

## Idioma padrao por regiao + Precos em Real com seletor de moeda

### 1. Detecao de idioma por regiao

Atualizar `src/i18n/config.ts` para:
- Mapear `pt-BR` e `pt` para portugues automaticamente
- Qualquer outro locale abre em ingles por padrao
- Manter os outros idiomas (ES, IT) disponiveis apenas via seletor manual

Configuracao: usar `navigator` como primeira opcao de detecao (antes do `localStorage`) na primeira visita, e `localStorage` para lembrar a escolha manual.

### 2. Precos em Real (R$) como moeda principal

Atualizar os precos em todos os 4 ficheiros de traducao:
- **PT**: R$ 4.500 (Starter), A partir de R$ 18.000 (Growth), Sob consulta (Premium)
- **EN/ES/IT**: Manter os mesmos valores em R$ como padrao

Os valores em R$ serao os valores base exibidos. O seletor de moeda permitira ver em EUR e USD.

### 3. Seletor de moeda na PricingPage

Criar um componente `CurrencySwitcher` com 3 opcoes: **BRL (R$)**, **EUR**, **USD**.

Logica de conversao (taxas fixas exibidas como referencia):
- BRL e a moeda base
- EUR: valor / 6 (taxa aproximada)
- USD: valor / 5.5 (taxa aproximada)

O seletor aparecera acima dos cards de precos como botoes pill (similar ao language switcher).

Os precos serao armazenados como valores numericos no codigo do componente (nao nos JSON de traducao), e formatados dinamicamente conforme a moeda selecionada.

### 4. Atualizar orcamentos no formulario de contacto

Atualizar `budgetOptions` nos 4 JSONs para usar R$:
- PT: "R$ 10.000-30.000", "R$ 30.000-60.000", "R$ 60.000+", "Ainda nao sei"
- EN: "R$ 10,000-30,000", "R$ 30,000-60,000", "R$ 60,000+", "Not sure yet"
- ES/IT: equivalente

### Ficheiros afetados

| Ficheiro | Acao |
|----------|------|
| `src/i18n/config.ts` | Atualizar detecao de idioma |
| `src/i18n/locales/pt.json` | Precos em R$, budgets em R$ |
| `src/i18n/locales/en.json` | Precos em R$, budgets em R$ |
| `src/i18n/locales/es.json` | Precos em R$, budgets em R$ |
| `src/i18n/locales/it.json` | Precos em R$, budgets em R$ |
| `src/components/CurrencySwitcher.tsx` | Novo -- seletor de moeda |
| `src/pages/PricingPage.tsx` | Integrar seletor de moeda e conversao dinamica |

### Detalhes tecnicos

- A conversao de moeda usa taxas fixas hardcoded (nao API em tempo real) com nota "valores aproximados"
- O seletor de moeda salva a preferencia em `localStorage`
- Os precos nos JSONs ficam como strings formatadas em R$ (moeda base)
- A `PricingPage` extrai o valor numerico do preco, aplica a conversao e formata com o simbolo correto
- O plano "Premium" / "Sob consulta" nao sofre conversao (fica como texto)

