

# Portfolio Restructuring -- LIPE Timeline

## What Changes

Replace the current portfolio grid with a **timeline-style layout** showing LIPE's evolution through its products and client projects.

### Updated Project Data

1. **EasyLine Platform** -- stays as-is (client project, e-commerce for queue management leader)

2. **Plate Boutique by LIPE** -- replaces "Historia no Prato"
   - LIPE's own restaurant website program
   - Serves local restaurants across all of Portugal
   - Tagline: "Programa de sites para restaurantes locais em todo Portugal"
   - Features: sites personalizados que contam a historia de cada restaurante, menu online, sistema de reservas, integracoes locais
   - Metrics updated to reflect program scale (e.g. "Todo Portugal", "Restaurantes locais", "Identidade unica")

3. **De Bairro para o Mundo** -- repositioned as a **result/product born from Plate Boutique by LIPE**
   - Tagline updated: "Resultado do Plate Boutique by LIPE"
   - Shows how a local restaurant/shop expanded online through LIPE's program
   - Keeps the expansion narrative (12 cities, local identity)

4. **Agendamento Inteligente** -- repositioned as a LIPE product/solution
   - Presented as a LIPE-built scheduling platform
   - Keeps AI scheduling, reminders, payment integration

5. **Milan** -- added as a new client project
   - Client company project
   - Will have placeholder content (title, brief tagline, basic description, tech stack) since no details were provided yet

### Layout Change

Transform from alternating left-right cards to a **vertical timeline** layout:
- A connecting vertical line runs down the center (desktop) or left side (mobile)
- Each project is a node on the timeline with a date/phase marker
- Projects labeled as either "Produto LIPE" (Plate Boutique, Agendamento) or "Cliente" (EasyLine, Milan)
- "De Bairro para o Mundo" labeled as "by Plate Boutique"
- Alternating left-right positioning on desktop
- Cards keep existing content structure (title, tagline, description, metrics, tech, outcome)

### Section Header

Updated to: "Nossa Jornada" or "Timeline LIPE" with subtitle reflecting the evolution narrative.

---

## Technical Details

### Files Modified

- **`src/components/Portfolio.tsx`** -- Complete rewrite:
  - New `projects` array with 5 entries (EasyLine, Plate Boutique, De Bairro para o Mundo, Agendamento Inteligente, Milan)
  - Each project gets a `type` field: `"produto"` or `"cliente"` and optional `parent` field (e.g. De Bairro -> parent: "Plate Boutique")
  - New timeline layout with vertical connecting line using CSS pseudo-elements
  - Timeline node markers (circles/dots) at each project
  - Badge showing "Produto LIPE" or "Projeto Cliente" on each card
  - "by Plate Boutique" sub-badge for De Bairro para o Mundo
  - Scroll-triggered animations remain (framer-motion useInView)
  - Mobile: timeline line moves to left side, all cards align right

### No other files need changes -- the Portfolio component is self-contained and already imported in Index.tsx.

