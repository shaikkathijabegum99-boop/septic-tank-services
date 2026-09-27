"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ABOUT PAGE CLASS
       ========================================================= */

    const main = document.querySelector("main");

    if (main) {
        main.classList.add("about-page");
    }


    /* =========================================================
       ABOUT PAGE REVEAL ANIMATION
       ========================================================= */

    const revealElements = document.querySelectorAll(
        ".about-page .reveal, " +
        ".about-hero-content, " +
        ".about-story-image, " +
        ".about-story-content, " +
        ".timeline-item, " +
        ".about-philosophy-card, " +
        ".about-value-item, " +
        ".about-service-card, " +
        ".team-card, " +
        ".testimonial-card, " +
        ".about-cta-content"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =========================================================
       RTL SYNC
       JS SETS DIR ON BODY
       ========================================================= */

    function syncRTL() {

        const isRTL = document.body.getAttribute("dir") === "rtl";

        document.documentElement.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

    }


    /* Run once */

    syncRTL();


    /* =========================================================
       WATCH FOR RTL CHANGES
       ========================================================= */

    const rtlObserver = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "dir"
            ) {

                syncRTL();

            }

        });

    });


    rtlObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* =========================================================
       TIMELINE RTL FORCE
       ========================================================= */

    function updateTimelineDirection() {

        const isRTL =
            document.body.getAttribute("dir") === "rtl";

        const timeline =
            document.querySelector(".about-page .timeline");

        if (!timeline) return;


        if (isRTL) {

            timeline.setAttribute("dir", "rtl");

        } else {

            timeline.setAttribute("dir", "ltr");

        }

    }


    updateTimelineDirection();


    /* Update timeline whenever body dir changes */

    const timelineDirectionObserver =
        new MutationObserver(function () {

            updateTimelineDirection();

        });


    timelineDirectionObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* =========================================================
       RTL TIMELINE POSITION
       EXTRA JS FALLBACK
       ========================================================= */

    function forceTimelineRTL() {

        const isRTL =
            document.body.getAttribute("dir") === "rtl";

        const timeline =
            document.querySelector(".about-page .timeline");

        if (!timeline) return;


        const line =
            timeline.querySelector(":scope::before");

        /*
         * ::before cannot be modified directly with JavaScript.
         * CSS handles the line position.
         *
         * This function exists to make sure the timeline
         * itself always has the correct direction.
         */

        timeline.style.direction =
            isRTL ? "rtl" : "ltr";
    }


    forceTimelineRTL();


    /* =========================================================
       RESIZE
       ========================================================= */

    window.addEventListener("resize", function () {

        forceTimelineRTL();

    });


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

    document.querySelectorAll(".timeline-item").forEach(
        function (item) {

            item.setAttribute("dir",
                document.body.getAttribute("dir") === "rtl"
                    ? "rtl"
                    : "ltr"
            );

        }
    );


    /* =========================================================
       UPDATE TIMELINE ITEMS WHEN RTL CHANGES
       ========================================================= */

    const itemDirectionObserver =
        new MutationObserver(function () {

            const isRTL =
                document.body.getAttribute("dir") === "rtl";

            document.querySelectorAll(".timeline-item").forEach(
                function (item) {

                    item.setAttribute(
                        "dir",
                        isRTL ? "rtl" : "ltr"
                    );

                }
            );

        });


    itemDirectionObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});