/* =========================================
   PRABEEN PANTHI PORTFOLIO
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const typingText = document.getElementById("typingText");
    const currentYear = document.getElementById("currentYear");
    const backToTop = document.getElementById("backToTop");

    /* =====================================
       CURRENT YEAR
    ===================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =====================================
       THEME
    ===================================== */

    const savedTheme = localStorage.getItem("prabeen-theme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (body.classList.contains("light-theme")) {
            icon.className = "fa-solid fa-moon";
            themeToggle.setAttribute("aria-label", "Switch to dark theme");
        } else {
            icon.className = "fa-solid fa-sun";
            themeToggle.setAttribute("aria-label", "Switch to light theme");
        }
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-theme");

            const theme = body.classList.contains("light-theme")
                ? "light"
                : "dark";

            localStorage.setItem("prabeen-theme", theme);

            updateThemeIcon();
        });
    }

    /* =====================================
       MOBILE MENU
    ===================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("open")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }
            });

        });
    }

    /* =====================================
       TYPING EFFECT
    ===================================== */

    const roles = [
        "Web Developer",
        "JavaScript Learner",
        "Python Beginner",
        "Game Developer",
        "BSc IT Student"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {

        if (!typingText) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeRole, 1500);
                return;
            }

            setTimeout(typeRole, 75);

        } else {

            typingText.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

                setTimeout(typeRole, 350);
                return;
            }

            setTimeout(typeRole, 40);
        }
    }

    typeRole();

    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-link");

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");

                        navItems.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* =====================================
       BACK TO TOP
    ===================================== */

    window.addEventListener("scroll", () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* =====================================
       BALLOON BLITZ VIDEO
    ===================================== */

    const videos =
        document.querySelectorAll(".project-video video");

    videos.forEach(video => {

        /*
         * Keep the gameplay video:
         * - muted
         * - autoplay
         * - looping
         * - no browser controls
         */

        video.muted = true;
        video.controls = false;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;

        const playVideo = () => {

            const promise = video.play();

            if (promise !== undefined) {
                promise.catch(() => {
                    // Browser may delay autoplay until page interaction.
                });
            }
        };

        playVideo();

        document.addEventListener("visibilitychange", () => {

            if (!document.hidden) {
                playVideo();
            }

        });

    });

    /* =====================================
       SMOOTH INTERNAL LINKS
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});