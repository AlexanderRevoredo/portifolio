(() => {
    const storageKey = "portfolio-language";
    const defaultLanguage = "pt";

    const translations = {
        pt: {
            "meta.description": "Portfólio de Alexander Revoredo, desenvolvedor em aprendizado.",
            "meta.title": "Alexander Revoredo | Portfólio",
            "nav.main": "Navegação principal",
            "nav.home": "Página inicial de Alexander Revoredo",
            "nav.photoAlt": "Foto de Alexander Revoredo",
            "nav.about": "Sobre",
            "language.changeToEnglish": "Mudar idioma para inglês",
            "language.changeToPortuguese": "Mudar idioma para português",
            "theme.activateLight": "Ativar modo claro",
            "theme.activateDark": "Ativar modo escuro",
            "theme.light": "Modo claro",
            "theme.dark": "Modo escuro",
            "hero.eyebrow": "Olá, eu sou",
            "hero.introduction": "Estou construindo meu caminho no desenvolvimento de software e este é o espaço onde vou compartilhar o que aprendo, crio e descubro ao longo dessa jornada.",
            "hero.opportunity": "Busco oportunidades de estágio em desenvolvimento backend e estou aberto a vagas júnior compatíveis com meu momento atual.",
            "hero.cta": "Conheça meu portfólio",
            "about.eyebrow": "Sobre",
            "about.title": "Formação e foco atual",
            "about.body": "Desde criança, sou fascinado por computadores. Na adolescência, montava e desmontava máquinas para entender melhor como os sistemas funcionavam. Hoje, estou no quinto período de Engenharia de Software, sou formado em Ciências Contábeis e direciono meu foco ao backend com Java, à criação de APIs e a sistemas robustos. Também tenho a cibersegurança como interesse complementar.",
            "projects.eyebrow": "Portfólio",
            "projects.title": "Aprendizado colocado em prática",
            "projects.tabsLabel": "Categorias do portfólio",
            "projects.personalTab": "Projetos pessoais",
            "projects.challengesTab": "Desafios técnicos",
            "projects.personalTitle": "Projetos pessoais aparecerão aqui",
            "projects.personalBody": "Este espaço será preenchido conforme eu criar projetos próprios para praticar tecnologias, explorar ideias e registrar o que aprendi em cada experiência.",
            "projects.challengesTitle": "Desafios técnicos aparecerão aqui",
            "projects.challengesBody": "Esta área poderá apresentar soluções para desafios práticos propostos por empresas em processos seletivos, atuais ou antigos, como demonstração de habilidade — sem indicar aprovação ou contratação.",
            "contact.eyebrow": "Contato",
            "contact.title": "Vamos conversar?",
            "contact.introduction": "Você pode me encontrar por e-mail ou pelas redes abaixo.",
            "contact.emailLabel": "Enviar e-mail para Alexander Revoredo",
            "contact.linkedin": "LinkedIn",
            "contact.linkedinLabel": "LinkedIn de Alexander Revoredo (abre em uma nova aba)",
            "contact.github": "GitHub",
            "contact.githubLabel": "GitHub de Alexander Revoredo (abre em uma nova aba)",
            "footer.copyright": "© 2026 Alexander Revoredo",
            "footer.note": "Feito com dedicação e vontade de aprender."
        },
        en: {
            "meta.description": "Portfolio of Alexander Revoredo, a software development student.",
            "meta.title": "Alexander Revoredo | Portfolio",
            "nav.main": "Main navigation",
            "nav.home": "Alexander Revoredo home page",
            "nav.photoAlt": "Photo of Alexander Revoredo",
            "nav.about": "About",
            "language.changeToEnglish": "Switch language to English",
            "language.changeToPortuguese": "Switch language to Portuguese",
            "theme.activateLight": "Enable light mode",
            "theme.activateDark": "Enable dark mode",
            "theme.light": "Light mode",
            "theme.dark": "Dark mode",
            "hero.eyebrow": "Hello, I am",
            "hero.introduction": "I am building my path in software development, and this is where I will share what I learn, create, and discover along the way.",
            "hero.opportunity": "I am seeking backend development internship opportunities and am open to junior roles that align with my current career stage.",
            "hero.cta": "Explore my portfolio",
            "about.eyebrow": "About",
            "about.title": "Education and current focus",
            "about.body": "I have been fascinated by computers since childhood. As a teenager, I assembled and disassembled machines to better understand how systems worked. Today, I am in the fifth semester of a Software Engineering degree, hold a degree in Accounting, and focus on Java backend development, API creation, and robust systems. Cybersecurity is also a complementary interest.",
            "projects.eyebrow": "Portfolio",
            "projects.title": "Learning put into practice",
            "projects.tabsLabel": "Portfolio categories",
            "projects.personalTab": "Personal projects",
            "projects.challengesTab": "Technical challenges",
            "projects.personalTitle": "Personal projects will appear here",
            "projects.personalBody": "This space will be filled as I create personal projects to practice technologies, explore ideas, and record what I learned from each experience.",
            "projects.challengesTitle": "Technical challenges will appear here",
            "projects.challengesBody": "This area may present solutions to practical challenges proposed by companies in current or past hiring processes as a demonstration of skills — without implying approval or employment.",
            "contact.eyebrow": "Contact",
            "contact.title": "Let's talk?",
            "contact.introduction": "You can reach me by email or through the links below.",
            "contact.emailLabel": "Send an email to Alexander Revoredo",
            "contact.linkedin": "LinkedIn",
            "contact.linkedinLabel": "Alexander Revoredo's LinkedIn (opens in a new tab)",
            "contact.github": "GitHub",
            "contact.githubLabel": "Alexander Revoredo's GitHub (opens in a new tab)",
            "footer.copyright": "© 2026 Alexander Revoredo",
            "footer.note": "Made with dedication and the desire to learn."
        }
    };

    const getSavedLanguage = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    };

    const saveLanguage = (language) => {
        try {
            localStorage.setItem(storageKey, language);
        } catch {
            // A troca ainda funciona nesta visita se o armazenamento estiver indisponível.
        }
    };

    let currentLanguage = getSavedLanguage() === "en" ? "en" : defaultLanguage;

    const translate = (key) => translations[currentLanguage][key] ?? translations[defaultLanguage][key] ?? "";

    const applyLanguage = (language, persist = false) => {
        currentLanguage = language === "en" ? "en" : defaultLanguage;
        document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const translatedText = translate(element.dataset.i18n);
            if (translatedText) element.textContent = translatedText;
        });
        document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const translatedLabel = translate(element.dataset.i18nAriaLabel);
            if (translatedLabel) element.setAttribute("aria-label", translatedLabel);
        });
        document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
            const translatedAlt = translate(element.dataset.i18nAlt);
            if (translatedAlt) element.setAttribute("alt", translatedAlt);
        });
        document.querySelectorAll("[data-i18n-content]").forEach((element) => {
            const translatedContent = translate(element.dataset.i18nContent);
            if (translatedContent) element.setAttribute("content", translatedContent);
        });

        const translatedTitle = translate("meta.title");
        if (translatedTitle) document.title = translatedTitle;

        const button = document.querySelector(".language-toggle");
        if (button) {
            const isEnglish = currentLanguage === "en";
            button.setAttribute("aria-pressed", String(isEnglish));
            const translatedLabel = translate(isEnglish
                ? "language.changeToPortuguese"
                : "language.changeToEnglish");
            if (translatedLabel) button.setAttribute("aria-label", translatedLabel);
            button.querySelectorAll("[data-language-option]").forEach((option) => {
                option.classList.toggle("is-active", option.dataset.languageOption === currentLanguage);
            });
        }

        if (persist) saveLanguage(currentLanguage);
        document.dispatchEvent(new CustomEvent("portfolio:languagechange", {
            detail: { language: currentLanguage }
        }));
    };

    window.PortfolioI18n = {
        applyLanguage,
        translate,
        get language() {
            return currentLanguage;
        }
    };

    document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";

    document.addEventListener("DOMContentLoaded", () => {
        applyLanguage(currentLanguage);

        document.querySelector(".language-toggle")?.addEventListener("click", () => {
            applyLanguage(currentLanguage === "pt" ? "en" : "pt", true);
        });
    });
})();
