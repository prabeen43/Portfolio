document.addEventListener("DOMContentLoaded", function () {

    // Current year in footer
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // Balloon Blitz video
    const balloonVideo = document.querySelector(
        ".project-video video"
    );

    if (balloonVideo) {

        // Keep the preview muted and looping
        balloonVideo.muted = true;
        balloonVideo.loop = true;
        balloonVideo.playsInline = true;

        // Try autoplay
        const playVideo = () => {
            balloonVideo.play().catch(() => {
                // Browser may block autoplay until interaction.
            });
        };

        playVideo();


        // Pause video when it is not visible
        const videoObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        playVideo();
                    } else {
                        balloonVideo.pause();
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        videoObserver.observe(balloonVideo);
    }


    // Smooth navigation
    const navLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navLinks.forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {

                event.preventDefault();

                document.querySelector(targetId).scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});