

# LIPE Technology — Website Implementation Plan

## Phase 1: Foundation & Design System
Set up the LIPE brand design system — custom color palette (#3B7DE8 blue, #2BB8A0 teal, #0A0F18 dark, #FF6B35 accent), typography (Syne for headlines, DM Sans for body, JetBrains Mono for code/tech), and reusable UI primitives (gradient mesh backgrounds, glass-morphism cards, circuit-inspired decorative elements).

## Phase 2: Navigation & Layout Shell
Build the responsive navbar with the LIPE logo, smooth-scroll navigation links (Serviços, Portfólio, Processo, Contato), hamburger menu on mobile, and a sticky footer with social links, service tags, and copyright. All navigation uses smooth scrolling on the single-page home layout.

## Phase 3: Hero Section
Animated hero with gradient mesh background (blue → teal), floating abstract shapes, and grid overlay. Portuguese headline "Tecnologia que amplifica quem você é", subheadline, and two CTAs — "Ver nossos projetos" (scrolls to portfolio) and "Fale conosco" (scrolls to contact/opens WhatsApp). Staggered fade-in entrance animations.

## Phase 4: Manifesto Section
Clean, typography-focused section with LIPE's philosophy about building technology that tells stories and amplifies identity. Elegant layout with subtle accent lines and scroll-triggered fade-up animation.

## Phase 5: Services Bento Grid
Asymmetric bento grid displaying the 5 core services (Sites Personalizáveis, Chatbots Consultivos, SaaS/Plataformas, Estratégia de Marketing Digital, Manutenção & Suporte). Each card features a custom Lucide icon, service name, short description, and "Saiba mais" expandable details. Hover effects with lift and gradient glow.

## Phase 6: Featured Work / Portfolio
Full-width portfolio section with 4 case study cards (EasyLine, Restaurant, Local Shop, Service Business). Each card shows a placeholder hero image, client name + tagline, key outcome metrics, tech stack tags, and a brief description. Alternating left-right layout for visual rhythm with project-specific color accents.

## Phase 7: How We Work (Process Timeline)
Vertical timeline with 4 steps (Descoberta → Estratégia → Construção → Crescimento), each with an icon, title, and description. Steps expand on click for more detail. Scroll-triggered reveal animations with connecting lines.

## Phase 8: Tech Stack & Comparison
- **Tech badge cloud**: Animated floating badges for React, TypeScript, Supabase, Three.js, Tailwind, OpenAI, Stripe, etc. with subtle glow effects.
- **Comparison table**: 3-column table (DIY Builders vs Traditional Agency vs LIPE Technology) across 6 criteria with star ratings highlighting LIPE's advantages.

## Phase 9: Testimonials & Pricing
- **Testimonial carousel**: Rotating cards with client quotes, names, and placeholder photos. Smooth fade transitions.
- **Pricing section**: 3 tiers (Essencial R$8-12k, Profissional R$15-25k, Enterprise sob consulta) with feature lists and a note about custom scoping.

## Phase 10: Contact Section & Final Polish
- **Contact form** with validated fields (Nome, Email, Telefone/WhatsApp, Empresa, Mensagem, Orçamento dropdown). Form submission shows a success toast (no backend yet — can integrate EmailJS or Supabase later).
- **WhatsApp CTA button** linking to WhatsApp with pre-filled message.
- Final polish pass on micro-interactions, scroll animations, responsive behavior across all breakpoints, and overall visual consistency.

