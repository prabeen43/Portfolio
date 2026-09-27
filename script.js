// ===============================
// PRABIN PORTFOLIO - SCRIPT
// ===============================

// ---------- MOBILE MENU ----------
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("navLinks");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        menuButton.textContent = navigation.classList.contains("open")
            ? "×"
            : "☰";
    });

    document.querySelectorAll("#navLinks a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.textContent = "☰";
        });
    });
}


// ---------- DARK / LIGHT MODE ----------
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("prabinTheme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        localStorage.setItem(
            "prabinTheme",
            document.body.classList.contains("light")
                ? "light"
                : "dark"
        );

        updateThemeIcon();
    });
}


// ---------- CURRENT YEAR ----------
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ---------- BACK TO TOP ----------
const topButton = document.getElementById("topButton");

if (topButton) {
    window.addEventListener(
        "scroll",
        () => {
            topButton.classList.toggle(
                "show",
                window.scrollY > 500
            );
        },
        { passive: true }
    );

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ---------- SCROLL REVEAL ----------
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.1
    }
);

document
    .querySelectorAll(
        ".section, .project, .education-item, .hero-content, .hero-visual"
    )
    .forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });


// ---------- BALLOON BLITZ VIDEO ----------
const video = document.querySelector(".video-project video");

if (video) {

    // Completely remove browser controls
    video.controls = false;
    video.removeAttribute("controls");

    // Silent autoplay
    video.muted = true;
    video.defaultMuted = true;

    // Loop forever
    video.loop = true;

    // Mobile compatibility
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Try to start playback
    const playVideo = () => {
        video.muted = true;

        const promise = video.play();

        if (promise !== undefined) {
            promise.catch(() => {
                // Browser blocked autoplay.
                // Nothing else is required.
            });
        }
    };

    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    // If the video somehow pauses, start it again
    video.addEventListener("pause", () => {
        setTimeout(() => {
            if (!video.ended) {
                playVideo();
            }
        }, 100);
    });

    // Restart when it reaches the end
    video.addEventListener("ended", () => {
        video.currentTime = 0;
        playVideo();
    });

    // Initial attempt
    playVideo();
}


// ---------- ESCAPE KEY ----------
window.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navigation) {
            navigation.classList.remove("open");
        }

        if (menuButton) {
            menuButton.textContent = "☰";
        }
    }
});


// ---------- AYDEN OS PROJECT ----------
// The portfolio simply links to /aydenos.
// Ayden OS itself runs independently.

document.querySelectorAll('a[href*="/aydenos"]').forEach((link) => {

    link.addEventListener("click", () => {
        // Allow the browser to navigate normally.
        // This exists only to keep the project link
        // compatible with the portfolio.
    });

});


// ---------- ACTIVE NAVIGATION ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navLinks a");

if (sections.length && navLinks.length) {

    const activeObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `#navLinks a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        activeObserver.observe(section);
    });
}


// ---------- CONSOLE EASTER EGG ----------
console.log(
    "%cPrabin Portfolio",
    "font-size: 22px; font-weight: bold;"
);

console.log(
    "Built by Prabin | JavaScript • Python • Web Development • Roblox"
);