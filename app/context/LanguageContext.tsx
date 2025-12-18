"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

// Strict types for supported languages
export type Language = "en" | "pt";

// Translation keys type
export type TranslationKey =
    | "nav_about"
    | "nav_projects"
    | "nav_development"
    | "nav_web"
    | "nav_contact"
    | "nav_quote"
    | "hero_status"
    | "hero_subtitle"
    | "hero_desc"
    | "hero_explore"
    | "hero_solutions"
    | "hero_title"
    | "hero_cta"
    | "about_title"
    | "about_edu_title"
    | "about_edu_desc"
    | "about_edu_note"
    | "about_status"
    | "about_freelance"
    | "about_freelance_desc"
    | "feature_title"
    | "feature_desc"
    | "feature_cta"
    | "services_title"
    | "services_desc"
    | "services_audit_placeholder"
    | "services_audit_btn"
    | "service1_title"
    | "service1_desc"
    | "service2_title"
    | "service2_desc"
    | "service3_title"
    | "service3_desc"
    | "projects_title"
    | "projects_scroll_hint"
    | "footer_tagline"
    | "footer_copyright"
    | "footer_built"
    | "toast_email_copied"
    | "toast_url_error"
    | "toast_audit_complete"
    | "marquee_subtitle"
    | "compare_title"
    | "compare_agencies"
    | "compare_bad1"
    | "compare_bad2"
    | "compare_bad3"
    | "compare_bad4"
    | "compare_recommended"
    | "compare_good1"
    | "compare_good2"
    | "compare_good3"
    | "compare_good4"
    | "process_title"
    | "process_step1_title"
    | "process_step1_desc"
    | "process_step2_title"
    | "process_step2_desc"
    | "process_step3_title"
    | "process_step3_desc"
    | "pricing_title"
    | "pricing_desc"
    | "pricing_perk1"
    | "pricing_perk2"
    | "pricing_perk3"
    | "pricing_cta"
    | "faq_title"
    | "faq_q1"
    | "faq_a1"
    | "faq_q2"
    | "faq_a2"
    | "faq_q3"
    | "faq_a3"
    | "contact_title"
    | "contact_desc";

// Translation dictionary type
type TranslationDictionary = Record<TranslationKey, Record<Language, string>>;

// All translations
export const translations: TranslationDictionary = {
    // Navigation
    nav_about: { en: "About", pt: "Sobre" },
    nav_projects: { en: "Projects", pt: "Projetos" },
    nav_development: { en: "Web Development", pt: "Desenvolvimento Web" },
    nav_web: { en: "My Work", pt: "O Meu Trabalho" },
    nav_contact: { en: "Let's Talk", pt: "Falar Comigo" },
    nav_quote: { en: "Let's Talk", pt: "Falar Comigo" },

    // Hero (Home)
    hero_status: { en: "Open to new projects", pt: "Aberto a novos projetos" },
    hero_subtitle: {
        en: "I turn complex code into simple digital experiences.",
        pt: "Transformo código complexo em experiências digitais simples.",
    },
    hero_desc: {
        en: 'Software Engineering student @ <span class="text-white">Técnico Lisboa</span>. Precision engineering for the web.',
        pt: 'Estudante de Engenharia Informática @ <span class="text-white">Técnico Lisboa</span>. Engenharia de precisão para a web.',
    },
    hero_explore: { en: "Explore", pt: "Explorar" },
    hero_solutions: { en: "See My Work", pt: "Ver O Meu Trabalho" },

    // Hero (Web)
    hero_title: {
        en: 'I turn your website into<br>your <span class="text-electric-400">best employee</span>.',
        pt: 'Transformo o seu site no<br>seu <span class="text-electric-400">melhor funcionário</span>.',
    },
    hero_cta: { en: "Get a Free Audit", pt: "Auditoria Gratuita" },

    // About Section
    about_title: { en: "About Me", pt: "Sobre Mim" },
    about_edu_title: { en: "Instituto Superior Técnico", pt: "Instituto Superior Técnico" },
    about_edu_desc: {
        en: '3rd Year Computer Engineering @ IST.<br>I focus on <span class="text-white">Algorithms</span>, <span class="text-white">Distributed Systems</span>, and <span class="text-white">High-Performance Computing</span>.',
        pt: '3º Ano de Engenharia Informática @ IST.<br>O meu foco é em <span class="text-white">Algoritmos</span>, <span class="text-white">Sistemas Distribuídos</span> e <span class="text-white">Computação de Alto Desempenho</span>.',
    },
    about_edu_note: { en: "Top Technical University in Portugal", pt: "Melhor Universidade Técnica de Portugal" },
    about_status: { en: "Available", pt: "Disponível" },
    about_freelance: { en: "Open for Projects", pt: "Disponível para Projetos" },
    about_freelance_desc: { en: "New projects & collaborations", pt: "Novos projetos & colaborações" },

    // Feature Section
    feature_title: { en: "It's not about<br>saving time.", pt: "Não é sobre<br>poupar tempo." },
    feature_desc: {
        en: "It's about feeling like you're never wasting it. I engineer for flow states.",
        pt: "É sobre sentir que nunca o estás a desperdiçar. Eu projeto para estados de fluxo.",
    },
    feature_cta: { en: "Download CV", pt: "Descarregar CV" },

    // Services Section
    services_title: { en: "What I Build", pt: "O Que Eu Construo" },
    services_desc: {
        en: "No templates. I write custom code optimized for speed and scale. Your site will load instantly.",
        pt: "Não uso templates. Escrevo código de raiz otimizado para velocidade e escala. O seu site vai carregar instantaneamente.",
    },
    services_audit_placeholder: { en: "Enter your website URL to audit...", pt: "Introduza o URL do seu site para auditoria..." },
    services_audit_btn: { en: "Audit", pt: "Auditar" },
    service1_title: { en: "Performance Optimization", pt: "Otimização de Performance" },
    service1_desc: {
        en: "Sub-second load times. Core Web Vitals optimization. Edge deployment.",
        pt: "Carregamento em menos de 1 segundo. Otimização Core Web Vitals. Deploy na Edge.",
    },
    service2_title: { en: "UI/UX Engineering", pt: "Engenharia UI/UX" },
    service2_desc: {
        en: "Pixel-perfect interfaces. Micro-interactions. Dark mode excellence.",
        pt: "Interfaces pixel-perfect. Micro-interações. Excelência em modo escuro.",
    },
    service3_title: { en: "Full-Stack Development", pt: "Desenvolvimento Full-Stack" },
    service3_desc: {
        en: "React/Next.js frontends. API architecture. Database design.",
        pt: "Frontends React/Next.js. Arquitetura API. Design de base de dados.",
    },

    // Projects Section
    projects_title: { en: "My Projects", pt: "Os Meus Projetos" },
    projects_scroll_hint: { en: "← Scroll horizontally →", pt: "← Deslize horizontalmente →" },

    // Footer
    footer_tagline: { en: "Engineering the web in Lisbon", pt: "A programar a web em Lisboa" },
    footer_copyright: { en: "Designed & Engineered by Martim Ramos in Lisbon.", pt: "Desenhado e Programado por Martim Ramos em Lisboa." },
    footer_built: {
        en: '<span class="text-electric-400/40">&lt;</span>Handcrafted with code<span class="text-electric-400/40">/&gt;</span> · Tailwind CSS · No bloated builders',
        pt: '<span class="text-electric-400/40">&lt;</span>Feito à mão com código<span class="text-electric-400/40">/&gt;</span> · Tailwind CSS · Sem construtores pesados',
    },

    // Toast Messages
    toast_email_copied: { en: "📧 Email copied!", pt: "📧 Email copiado!" },
    toast_url_error: { en: "⚠️ Please enter a URL first", pt: "⚠️ Por favor introduza um URL primeiro" },
    toast_audit_complete: { en: "✅ Analysis complete!", pt: "✅ Análise concluída!" },

    // Web Page - Marquee
    marquee_subtitle: { en: "Powering your business with modern integrations", pt: "Potenciando o seu negócio com integrações modernas" },

    // Web Page - Comparison
    compare_title: { en: "Why choose me", pt: "Porquê escolher-me" },
    compare_agencies: { en: "Typical Agencies", pt: "Agências Tradicionais" },
    compare_bad1: { en: "WordPress templates", pt: "Templates WordPress" },
    compare_bad2: { en: "3-5 second load times", pt: "3-5 segundos de carregamento" },
    compare_bad3: { en: "Monthly hosting fees forever", pt: "Taxas mensais de hosting para sempre" },
    compare_bad4: { en: "Generic cookie-cutter design", pt: "Design genérico e repetitivo" },
    compare_recommended: { en: "Recommended", pt: "Recomendado" },
    compare_good1: { en: "Next.js / React (Modern Stack)", pt: "Next.js / React (Stack Moderno)" },
    compare_good2: { en: "Sub-second load times", pt: "Carregamento em menos de 1 segundo" },
    compare_good3: { en: "One-time payment, you own it", pt: "Pagamento único, é seu para sempre" },
    compare_good4: { en: "Custom, hand-crafted design", pt: "Design personalizado e artesanal" },

    // Web Page - Process
    process_title: { en: "Simple. Fast. Done", pt: "Simples. Rápido. Feito" },
    process_step1_title: { en: "Discovery", pt: "Descoberta" },
    process_step1_desc: { en: "I take time to understand your business, goals, and target audience.", pt: "Dedico tempo a compreender o seu negócio, objetivos e público-alvo." },
    process_step2_title: { en: "Build & Refine", pt: "Construir & Refinar" },
    process_step2_desc: { en: "I design and develop with your feedback at every step.", pt: "Desenho e desenvolvo com o seu feedback em cada etapa." },
    process_step3_title: { en: "Launch", pt: "Lançamento" },
    process_step3_desc: { en: "Your site goes live, optimized and ready to convert.", pt: "O seu site entra no ar, otimizado e pronto para converter." },

    // Web Page - Pricing
    pricing_title: { en: "Flexible pricing for<br>ambitious projects", pt: "Preços flexíveis para<br>projetos ambiciosos" },
    pricing_desc: {
        en: 'Every business is unique, and so is every budget. I\'m currently accepting select projects to build my portfolio, offering <span class="text-white font-medium">premium engineering at competitive rates</span>.',
        pt: 'Cada negócio é único, assim como cada orçamento. Estou a aceitar projetos selecionados para construir o meu portfólio, oferecendo <span class="text-white font-medium">engenharia premium a preços competitivos</span>.',
    },
    pricing_perk1: { en: "No Monthly Fees", pt: "Sem Mensalidades" },
    pricing_perk2: { en: "Full Ownership", pt: "Propriedade Total" },
    pricing_perk3: { en: "Custom Design", pt: "Design Personalizado" },
    pricing_cta: { en: "Get a Free Quote", pt: "Pedir Orçamento Grátis" },

    // Web Page - FAQ
    faq_title: { en: "Questions", pt: "Dúvidas" },
    faq_q1: { en: "Do I pay monthly fees?", pt: "Pago mensalidades?" },
    faq_a1: {
        en: "No. You pay once and own the site. Hosting is often <strong>free</strong> or very cheap (€0-10/mo) on modern platforms I set up for you.",
        pt: "Não. Paga uma vez e o site é seu. O alojamento é muitas vezes <strong>grátis</strong> ou muito barato (€0-10/mês) em plataformas modernas que eu configuro para si.",
    },
    faq_q2: { en: "How long does it take?", pt: "Quanto tempo demora?" },
    faq_a2: {
        en: "Landing pages: 1-2 weeks. Corporate sites: 3-4 weeks. E-commerce: 4-8 weeks. Timelines depend on your feedback speed.",
        pt: "Landing pages: 1-2 semanas. Sites corporativos: 3-4 semanas. E-commerce: 4-8 semanas. Os prazos dependem da rapidez do seu feedback.",
    },
    faq_q3: { en: "Can I edit text myself?", pt: "Posso editar o conteúdo sozinho?" },
    faq_a3: {
        en: "Yes! I can integrate a simple CMS (like Sanity or Contentful) so you can update content without touching code.",
        pt: "Sim! Posso integrar um CMS simples (como Sanity ou Contentful) para que possa atualizar o conteúdo sem tocar em código.",
    },

    // Web Page - Contact
    contact_title: { en: "Let's work together", pt: "Vamos trabalhar juntos" },
    contact_desc: { en: "Send me your project details and I'll get back to you within 24 hours.", pt: "Envie-me os detalhes do seu projeto e respondo em menos de 24 horas." },
};

// Context type
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    // Use lazy initial state to get language from localStorage/browser on first render
    const [language, setLanguageState] = useState<Language>(() => {
        // This runs only on client during initial render
        if (typeof window === "undefined") return "en";

        const savedLang = localStorage.getItem("language") as Language | null;
        if (savedLang && (savedLang === "en" || savedLang === "pt")) {
            return savedLang;
        }

        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("pt")) {
            return "pt";
        }

        return "en";
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;
    }, []);

    const t = useCallback(
        (key: TranslationKey): string => {
            return translations[key]?.[language] ?? key;
        },
        [language]
    );

    // Update html lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
