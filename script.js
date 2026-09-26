/* =========================================
   PRABIN PANTHI PORTFOLIO
   Main JavaScript
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 500);

});


/* =========================================
   YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   THEME
========================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("prabin-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    updateThemeIcon();
}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (document.body.classList.contains("light-theme")) {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.title = "Switch to dark mode";

    } else {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.title = "Switch to light mode";

    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        localStorage.setItem(
            "prabin-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const mobileLinks =
        navLinks.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-link");

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "";

    sections.forEach((section) => {

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {
            currentSection = section.id;
        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

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


/* =========================================
   BALLOON BLITZ VIDEO
========================================= */

const gameVideo =
    document.querySelector(".project-video video");


if (gameVideo) {

    gameVideo.addEventListener(
        "mouseenter",
        () => {

            /*
                The video is already muted,
                so browsers allow autoplay.
            */

        }
    );

}


/* =========================================
   CODE CARD TILT
========================================= */

const codeWindow =
    document.querySelector(".code-window");


if (
    codeWindow &&
    window.matchMedia("(pointer: fine)").matches
) {

    codeWindow.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                codeWindow.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            const rotateX =
                ((centerY - y) / centerY) * 3;

            codeWindow.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
    );


    codeWindow.addEventListener(
        "mouseleave",
        () => {

            codeWindow.style.transform =
                "rotateY(-3deg) rotateX(2deg)";

        }
    );

}


/* =========================================
   SKILL CARD MOUSE EFFECT
========================================= */

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                !window.matchMedia("(pointer: fine)").matches
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2) / rect.height) * -2;

            const rotateY =
                ((x - rect.width / 2) / rect.width) * 2;

            card.style.transform =
                `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================
   VIDEO AUTOPLAY FALLBACK
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const video =
            document.querySelector(
                ".project-video video"
            );

        if (!video) {
            return;
        }

        video.muted = true;

        const playVideo = () => {

            const promise =
                video.play();

            if (promise !== undefined) {

                promise.catch(() => {
                    /*
                        Some browsers may block
                        autoplay. Since controls are
                        enabled, the visitor can start
                        the video manually.
                    */
                });

            }

        };

        playVideo();

    }
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%cPrabin Panthi — Developer Portfolio",
    "color:#00c8ff;font-size:16px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "color:#718096;font-size:12px;"
);