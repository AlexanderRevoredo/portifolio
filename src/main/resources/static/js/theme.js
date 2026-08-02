(() => {
    const storageKey = "portfolio-theme";

    const getSavedTheme = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem(storageKey, theme);
        } catch {
            // O tema ainda funciona nesta visita se o armazenamento estiver indisponível.
        }
    };

    const savedTheme = getSavedTheme();
    const initialTheme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.dataset.theme = initialTheme;

    document.addEventListener("DOMContentLoaded", () => {
        const button = document.querySelector(".theme-toggle");
        if (!button) return;

        const updateButton = (theme) => {
            const isDark = theme === "dark";
            const translate = window.PortfolioI18n?.translate;
            button.setAttribute("aria-pressed", String(isDark));
            button.setAttribute("aria-label", translate
                ? translate(isDark ? "theme.activateLight" : "theme.activateDark")
                : (isDark ? "Ativar modo claro" : "Ativar modo escuro"));
            button.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
            button.querySelector(".theme-label").textContent = translate
                ? translate(isDark ? "theme.light" : "theme.dark")
                : (isDark ? "Modo claro" : "Modo escuro");
        };

        updateButton(initialTheme);

        button.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = nextTheme;
            saveTheme(nextTheme);
            updateButton(nextTheme);
        });

        document.addEventListener("portfolio:languagechange", () => {
            updateButton(document.documentElement.dataset.theme);
        });
    });
})();
