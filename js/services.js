


"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(
        ".services-hero-content, " +
        ".service-card, " +
        ".services-approach-image, " +
        ".services-approach-content, " +
        ".approach-point, " +
        ".faq-item, " +
        ".services-cta-content"
    );

    revealElements.forEach(element => {
        element.classList.add("service-reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

});
