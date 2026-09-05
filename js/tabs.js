document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-tabs]").forEach((tabsContainer) => {
        const tabs = Array.from(tabsContainer.querySelectorAll('[role="tab"]'));

        const activateTab = (selectedTab, moveFocus = true) => {
            tabs.forEach((tab) => {
                const isSelected = tab === selectedTab;
                const panel = document.getElementById(tab.getAttribute("aria-controls"));

                tab.setAttribute("aria-selected", String(isSelected));
                tab.tabIndex = isSelected ? 0 : -1;
                panel.hidden = !isSelected;
            });

            if (moveFocus) selectedTab.focus();
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => activateTab(tab, false));

            tab.addEventListener("keydown", (event) => {
                let nextIndex;

                if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
                if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = tabs.length - 1;

                if (nextIndex === undefined) return;

                event.preventDefault();
                activateTab(tabs[nextIndex]);
            });
        });
    });
});
