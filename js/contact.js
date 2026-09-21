"use strict";

document.addEventListener("DOMContentLoaded", () => {

    
    const revealItems = document.querySelectorAll(
        ".contact-hero-content, " +
        ".contact-info-card, " +
        ".contact-booking-content, " +
        ".contact-form-wrapper, " +
        ".quick-service, " +
        ".service-note, " +
        ".contact-section-head, " +
        ".contact-process-card, " +
        ".contact-cta-content"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealItems.forEach(item => {
            item.classList.add("contact-reveal");
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("is-visible");
        });

    }


    
    const processCards = document.querySelectorAll(
        ".contact-process-card"
    );

    processCards.forEach((card, index) => {
        card.style.setProperty(
            "--contact-delay",
            `${index * 120}ms`
        );
    });


    
    const infoCards = document.querySelectorAll(
        ".contact-info-card"
    );

    infoCards.forEach((card, index) => {
        card.style.setProperty(
            "--contact-delay",
            `${index * 100}ms`
        );
    });


    
    document.querySelectorAll('a[href="#booking"]').forEach(link => {

        link.addEventListener("click", event => {

            const target = document.querySelector("#booking");

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    
    const serviceForm = document.querySelector("#serviceForm");

    if (serviceForm) {

        serviceForm.addEventListener("submit", event => {

            event.preventDefault();

            const submitButton =
                serviceForm.querySelector(".form-submit");

            if (!submitButton) return;

            const originalText = submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML = `
                Sending Request
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;

            setTimeout(() => {

                submitButton.innerHTML = `
                    Request Submitted
                    <i class="fa-solid fa-check"></i>
                `;

                submitButton.classList.add("form-success");

                setTimeout(() => {

                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    submitButton.classList.remove("form-success");

                }, 2500);

            }, 1000);

        });

    }


    
    const dateInput = document.querySelector("#date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;

    }


    
    const serviceSelect = document.querySelector("#service");

    if (serviceSelect) {

        serviceSelect.addEventListener("change", () => {

            serviceSelect.classList.toggle(
                "has-value",
                serviceSelect.value !== ""
            );

        });

    }


    
    const urgentCheckbox =
        document.querySelector('input[name="urgent"]');

    if (urgentCheckbox) {

        urgentCheckbox.addEventListener("change", () => {

            const form = urgentCheckbox.closest(".contact-form");

            if (!form) return;

            form.classList.toggle(
                "urgent-selected",
                urgentCheckbox.checked
            );

        });

    }

});