

## Corrigir indicacao de lingua no header e mascara de telefone dinamica

### Problema 1: Header mostra "EN" em vez de "PT"

O `LanguageDetector` deteta a lingua do browser como `"pt-PT"` ou `"pt-BR"`. O i18next resolve internamente para `"pt"` e mostra o conteudo correto, mas o `LanguageSwitcher` faz comparacao exata (`l.code === i18n.language`), que falha com `"pt-PT"`, e cai no fallback `languages[0]` = EN.

**Correcao em `src/components/LanguageSwitcher.tsx`:**
- Usar `i18n.resolvedLanguage` em vez de `i18n.language` (o `resolvedLanguage` retorna o codigo da lingua que efetivamente esta a ser usada, ex: `"pt"`)
- Alternativa de fallback: comparar com `startsWith` (ex: `"pt-PT".startsWith("pt")`)

### Problema 2: Mascara de telefone dinamica por lingua

Atualmente o placeholder e fixo (`+351 912 345 678`). Deve mudar conforme a lingua selecionada.

**Correcao em `src/components/Contact.tsx`:**
- Criar um mapa de formatos por lingua:
  - `pt` -> `+351 912 345 678`
  - `es` -> `+34 612 345 678`
  - `it` -> `+39 312 345 6789`
  - `en` -> `+1 (555) 123-4567`
- Usar `i18n.resolvedLanguage` para selecionar o placeholder e o prefixo adequado
- Atualizar os ficheiros de traducao com os placeholders corretos para cada lingua

**Correcao em `src/i18n/config.ts`:**
- Adicionar `supportedLngs: ["en", "pt", "es", "it"]` na config do i18next para que o detector resolva automaticamente `"pt-PT"` para `"pt"`

### Ficheiros a modificar

| Ficheiro | Alteracao |
|---|---|
| `src/i18n/config.ts` | Adicionar `supportedLngs` para resolver linguas regionais automaticamente |
| `src/components/LanguageSwitcher.tsx` | Usar `i18n.resolvedLanguage` em vez de `i18n.language` |
| `src/i18n/locales/pt.json` | Placeholder telefone ja esta correto (`+351`) |
| `src/i18n/locales/es.json` | Atualizar placeholder para `+34 612 345 678` |
| `src/i18n/locales/it.json` | Atualizar placeholder para `+39 312 345 6789` |
| `src/i18n/locales/en.json` | Atualizar placeholder para `+1 (555) 123-4567` |

### Detalhes tecnicos

**`src/i18n/config.ts`** - adicionar `supportedLngs`:
```ts
.init({
  resources: { ... },
  supportedLngs: ["en", "pt", "es", "it"],
  fallbackLng: "en",
  ...
});
```
Isto faz com que `"pt-PT"` seja automaticamente resolvido para `"pt"`.

**`src/components/LanguageSwitcher.tsx`** - usar `resolvedLanguage`:
```ts
const current = languages.find((l) => l.code === i18n.resolvedLanguage) || languages[0];
// E na comparacao do dropdown:
lang.code === i18n.resolvedLanguage ? "text-primary" : "text-foreground/80"
```

### Resultado esperado
- O header mostra "PT" quando o site esta em portugues
- O placeholder do telefone muda automaticamente conforme a lingua (ex: `+34` para espanhol, `+39` para italiano)

