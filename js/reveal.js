(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    document.addEventListener("DOMContentLoaded", () => {
        const elements = Array.from(document.querySelectorAll("[data-reveal]"));
        if (!elements.length) return;

        document.body.classList.add("js-reveal");

        const reveal = (element) => element.classList.add("is-visible");

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                reveal(entry.target);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        elements.forEach((element) => observer.observe(element));

        // Safety net: if intersection checks never fire (e.g. the page loaded
        // or scrolled while the tab was backgrounded), reveal everything
        // instead of risking content stuck at opacity 0.
        const revealAll = () => elements.forEach(reveal);
        window.setTimeout(revealAll, 2500);
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) window.setTimeout(revealAll, 300);
        });
    });
})();
