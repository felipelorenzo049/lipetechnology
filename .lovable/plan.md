

## Gerar Favicon "LIPE" com Gradient da Marca

### O que sera feito

1. **Gerar uma imagem** usando o modelo de IA (Gemini Flash Image) com as letras "LIPE" no estilo gradient da marca (azul primario para verde/teal secundario), fundo escuro, formato quadrado adequado para favicon (512x512px).

2. **Copiar a imagem gerada** para `public/favicon.png`.

3. **Atualizar `index.html`** para referenciar o novo favicon:
   - Adicionar `<link rel="icon" href="/favicon.png" type="image/png">` no `<head>`.

### Estilo do favicon
- Fundo escuro (cor de fundo da marca: ~hsl(216, 33%, 7%))
- Letras "LIPE" em gradient azul-para-teal (primary #3B72E9 para secondary #3BB58C)
- Fonte bold/moderna estilo Syne
- Formato quadrado, legivel mesmo em tamanhos pequenos (16x16, 32x32)

### Ficheiros afetados
- `public/favicon.png` (novo)
- `index.html` (adicionar link rel="icon")

