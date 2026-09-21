"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const bookingButtons = document.querySelectorAll(
        'a[href="booking.html"], #openBooking'
    );

    if (!bookingButtons.length) {
        return;
    }

    fetch("booking.html")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Booking form could not be loaded.");
            }

            return response.text();
        })
        .then(function (html) {

            const parser = new DOMParser();
            const documentHTML = parser.parseFromString(
                html,
                "text/html"
            );

            const modal =
                documentHTML.querySelector("#bookingModal");

            if (!modal) {
                return;
            }

            const container =
                document.getElementById("bookingContainer");

            if (!container) {
                return;
            }

            container.innerHTML = "";

            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");

            container.appendChild(modal);

            const closeButton =
                document.getElementById("closeBooking");

            const overlay =
                document.getElementById("bookingOverlay");

            const form =
                document.getElementById("bookingPopupForm");

            function openModal(event) {

                event.preventDefault();

                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");

                document.body.style.overflow = "hidden";

            }

            function closeModal() {

                modal.classList.remove("active");
                modal.setAttribute("aria-hidden", "true");

                document.body.style.overflow = "";

            }

            bookingButtons.forEach(function (button) {

                button.addEventListener(
                    "click",
                    openModal
                );

            });

            if (closeButton) {

                closeButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        closeModal();

                    }
                );

            }

            if (overlay) {

                overlay.addEventListener(
                    "click",
                    closeModal
                );

            }

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Escape" &&
                        modal.classList.contains("active")
                    ) {

                        closeModal();

                    }

                }
            );

            if (form) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();

                        const submitButton =
                            form.querySelector(
                                ".booking-submit"
                            );

                        if (!submitButton) {
                            return;
                        }

                        const originalHTML =
                            submitButton.innerHTML;

                        submitButton.disabled = true;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                        setTimeout(function () {

                            submitButton.innerHTML =
                                '<i class="fa-solid fa-check"></i> Request Sent';

                            setTimeout(function () {

                                form.reset();

                                submitButton.disabled = false;

                                submitButton.innerHTML =
                                    originalHTML;

                                closeModal();

                            }, 1200);

                        }, 1000);

                    }
                );

            }

        })
        .catch(function (error) {

            console.error(
                "Booking popup error:",
                error
            );

        });

});