"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("main section");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    sections.forEach((section) => {
        section.classList.add("section-hidden");
        observer.observe(section);
    });

});