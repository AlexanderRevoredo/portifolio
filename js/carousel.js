document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll(".project-carousel-slide"));
        const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
        const prevButton = carousel.querySelector(".carousel-control--prev");
        const nextButton = carousel.querySelector(".carousel-control--next");

        if (slides.length <= 1) return;

        let activeIndex = Math.max(slides.findIndex((slide) => slide.classList.contains("is-active")), 0);
        let timer;

        const goTo = (index) => {
            activeIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                const isActive = i === activeIndex;
                slide.classList.toggle("is-active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });
            dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeIndex));
        };

        const startTimer = () => {
            if (prefersReducedMotion) return;
            timer = setInterval(() => goTo(activeIndex + 1), 4500);
        };

        const restartTimer = () => {
            clearInterval(timer);
            startTimer();
        };

        prevButton?.addEventListener("click", () => {
            goTo(activeIndex - 1);
            restartTimer();
        });

        nextButton?.addEventListener("click", () => {
            goTo(activeIndex + 1);
            restartTimer();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                goTo(i);
                restartTimer();
            });
        });

        carousel.addEventListener("mouseenter", () => clearInterval(timer));
        carousel.addEventListener("mouseleave", startTimer);
        carousel.addEventListener("focusin", () => clearInterval(timer));
        carousel.addEventListener("focusout", startTimer);

        goTo(activeIndex);
        startTimer();
    });
});
