/* ==========================================
   PRABEEN PANTHI PORTFOLIO
========================================== */


/* MOBILE MENU */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document.querySelectorAll("#navLinks a")
.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});



/* YEAR */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();



/* BACK TO TOP */

const topButton =
    document.getElementById("topButton");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* SCROLL ANIMATION */

const elements =
    document.querySelectorAll(
        ".section, .project, .skill-card, .education-item"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


elements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});



/* ==========================================
   REACTION GAME
========================================== */

const arena =
    document.getElementById("gameArena");

const target =
    document.getElementById("target");

const startButton =
    document.getElementById("startGame");

const scoreDisplay =
    document.getElementById("score");

const timeDisplay =
    document.getElementById("time");

const bestDisplay =
    document.getElementById("best");

const message =
    document.getElementById("gameMessage");

const status =
    document.getElementById("gameStatus");


let score = 0;

let time = 15;

let running = false;

let timer;



/* BEST SCORE */

let best =
    Number(
        localStorage.getItem(
            "prabeen-best-score"
        )
    ) || 0;


bestDisplay.textContent = best;



/* MOVE TARGET */

function moveTarget() {

    const padding = 40;


    const x =
        Math.random() *
        (
            arena.clientWidth -
            padding * 2
        ) +
        padding;


    const y =
        Math.random() *
        (
            arena.clientHeight -
            padding * 2
        ) +
        padding;


    target.style.left =
        `${x}px`;


    target.style.top =
        `${y}px`;

}



/* START */

function startGame() {

    if (running) return;


    score = 0;

    time = 15;

    running = true;


    scoreDisplay.textContent =
        score;


    timeDisplay.textContent =
        time;


    message.style.display =
        "none";


    target.style.display =
        "block";


    startButton.textContent =
        "RUNNING...";


    startButton.disabled =
        true;


    status.textContent =
        "Hit the target!";


    moveTarget();


    timer =
        setInterval(() => {

            time--;

            timeDisplay.textContent =
                time;


            if (time <= 0) {

                finishGame();

            }

        }, 1000);

}



/* TARGET CLICK */

target.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        if (!running) return;


        score++;


        scoreDisplay.textContent =
            score;


        moveTarget();

    }
);



/* END GAME */

function finishGame() {

    running = false;


    clearInterval(timer);


    target.style.display =
        "none";


    startButton.disabled =
        false;


    startButton.textContent =
        "PLAY AGAIN";


    message.style.display =
        "grid";


    if (score > best) {

        best = score;


        localStorage.setItem(
            "prabeen-best-score",
            best
        );


        bestDisplay.textContent =
            best;


        message.innerHTML = `

            <strong>
                NEW RECORD
            </strong>

            <span>
                ${score} hits — impressive.
            </span>

        `;


        status.textContent =
            "New personal best!";

    } else {

        message.innerHTML = `

            <strong>
                TIME'S UP
            </strong>

            <span>
                You scored ${score} hits.
            </span>

        `;


        status.textContent =
            "Try again to beat your record.";

    }

}



/* START BUTTON */

startButton.addEventListener(
    "click",
    startGame
);