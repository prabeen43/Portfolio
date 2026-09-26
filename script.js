/* =========================================
   PRABEEN PANTHI PORTFOLIO
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


document
    .querySelectorAll("#navLinks a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

        });

    });



/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const isLight =
        document.body.classList.contains("light");


    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );


    themeToggle.textContent =
        isLight ? "☀" : "☾";

});



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();



/* =========================================
   BACK TO TOP
========================================= */

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



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .project-card, .service-card, .skill-category, .timeline-item"
    );


const revealObserver =
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
            threshold: 0.10
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});



/* =========================================
   PROJECT FILTERS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projectCards.forEach(project => {


            const category =
                project.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                project.classList.remove(
                    "hidden"
                );

            } else {

                project.classList.add(
                    "hidden"
                );

            }

        });

    });

});



/* =========================================
   NEON DODGE GAME
========================================= */

const canvas =
    document.getElementById("neonCanvas");

const ctx =
    canvas.getContext("2d");


const wrapper =
    document.getElementById("gameWrapper");


const overlay =
    document.getElementById("gameOverlay");


const gameOverScreen =
    document.getElementById("gameOver");


const startButton =
    document.getElementById("startNeonGame");


const restartButton =
    document.getElementById("restartNeonGame");


const scoreElement =
    document.getElementById("gameScore");


const levelElement =
    document.getElementById("gameLevel");


const livesElement =
    document.getElementById("gameLives");


const bestElement =
    document.getElementById("gameBest");


const finalScoreElement =
    document.getElementById("finalScore");


const gameStatus =
    document.getElementById("gameStatus");


const soundButton =
    document.getElementById("soundToggle");



/* GAME VARIABLES */

let gameRunning = false;

let animationFrame;

let score = 0;

let level = 1;

let lives = 3;

let bestScore =
    Number(
        localStorage.getItem(
            "neon-dodge-best"
        )
    ) || 0;


let obstacles = [];

let particles = [];

let keys = {};

let lastTime = 0;

let spawnTimer = 0;

let player;

let soundEnabled = true;



bestElement.textContent =
    bestScore;



/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    const rect =
        wrapper.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    canvas.style.width =
        rect.width + "px";


    canvas.style.height =
        rect.height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();



/* =========================================
   PLAYER
========================================= */

function createPlayer() {

    return {

        x:
            wrapper.clientWidth / 2,

        y:
            wrapper.clientHeight - 70,

        width:
            28,

        height:
            36,

        speed:
            5.5,

        invincible:
            0

    };

}



/* =========================================
   OBSTACLE
========================================= */

function createObstacle() {

    const width =
        20 +
        Math.random() * 38;


    const height =
        15 +
        Math.random() * 30;


    return {

        x:
            Math.random() *
            (wrapper.clientWidth - width),

        y:
            -height - 10,

        width:
            width,

        height:
            height,

        speed:
            2.2 +
            Math.random() * 1.8 +
            level * .25,

        rotation:
            Math.random() * Math.PI,

        rotationSpeed:
            (Math.random() - .5) * .04

    };

}



/* =========================================
   PARTICLES
========================================= */

function createParticles(
    x,
    y,
    amount = 10
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x: x,

            y: y,

            vx:
                (Math.random() - .5)
                * 5,

            vy:
                (Math.random() - .5)
                * 5,

            life:
                1,

            size:
                2 +
                Math.random() * 3

        });

    }

}



/* =========================================
   DRAW PLAYER
========================================= */

function drawPlayer() {

    if (!player) return;


    if (
        player.invincible > 0 &&
        Math.floor(
            player.invincible * 10
        ) % 2 === 0
    ) {

        return;

    }


    ctx.save();


    ctx.translate(
        player.x,
        player.y
    );


    /* GLOW */

    ctx.shadowBlur = 22;

    ctx.shadowColor =
        "#a79dff";


    /* SHIP */

    ctx.beginPath();

    ctx.moveTo(
        0,
        -player.height / 2
    );

    ctx.lineTo(
        player.width / 2,
        player.height / 2
    );

    ctx.lineTo(
        0,
        player.height / 3
    );

    ctx.lineTo(
        -player.width / 2,
        player.height / 2
    );

    ctx.closePath();


    ctx.fillStyle =
        "#a79dff";


    ctx.fill();


    /* CORE */

    ctx.shadowBlur = 8;

    ctx.beginPath();

    ctx.arc(
        0,
        -3,
        4,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.fill();


    /* ENGINE */

    ctx.beginPath();

    ctx.moveTo(
        -5,
        player.height / 3
    );

    ctx.lineTo(
        0,
        player.height / 2 + 10
    );

    ctx.lineTo(
        5,
        player.height / 3
    );

    ctx.fillStyle =
        "#75e6ff";

    ctx.fill();


    ctx.restore();

}



/* =========================================
   DRAW OBSTACLES
========================================= */

function drawObstacle(obstacle) {

    ctx.save();


    ctx.translate(
        obstacle.x +
        obstacle.width / 2,

        obstacle.y +
        obstacle.height / 2
    );


    ctx.rotate(
        obstacle.rotation
    );


    ctx.shadowBlur =
        14;

    ctx.shadowColor =
        "#ff5f8a";


    ctx.fillStyle =
        "#ff557f";


    ctx.fillRect(

        -obstacle.width / 2,

        -obstacle.height / 2,

        obstacle.width,

        obstacle.height

    );


    ctx.shadowBlur =
        0;


    ctx.fillStyle =
        "rgba(255,255,255,.45)";


    ctx.fillRect(

        -obstacle.width / 2 + 4,

        -obstacle.height / 2 + 4,

        obstacle.width - 8,

        2

    );


    ctx.restore();

}



/* =========================================
   DRAW PARTICLES
========================================= */

function drawParticles() {

    particles.forEach(p => {

        ctx.globalAlpha =
            p.life;


        ctx.fillStyle =
            "#a79dff";


        ctx.fillRect(
            p.x,
            p.y,
            p.size,
            p.size
        );

    });


    ctx.globalAlpha = 1;

}



/* =========================================
   BACKGROUND
========================================= */

function drawBackground() {

    const width =
        wrapper.clientWidth;

    const height =
        wrapper.clientHeight;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(167,157,255,.06)";

    ctx.lineWidth = 1;


    const gridSize = 45;


    for (
        let x = 0;
        x < width;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, height);

        ctx.stroke();

    }


    for (
        let y = 0;
        y < height;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(width, y);

        ctx.stroke();

    }


    /* CENTER GLOW */

    const gradient =
        ctx.createRadialGradient(

            width / 2,
            height / 2,
            10,

            width / 2,
            height / 2,
            width * .65

        );


    gradient.addColorStop(
        0,
        "rgba(90,75,180,.12)"
    );


    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );

}



/* =========================================
   COLLISION
========================================= */

function collision(a, b) {

    return (

        a.x - a.width / 2 <
        b.x + b.width &&

        a.x + a.width / 2 >
        b.x &&

        a.y - a.height / 2 <
        b.y + b.height &&

        a.y + a.height / 2 >
        b.y

    );

}



/* =========================================
   PLAYER MOVEMENT
========================================= */

function updatePlayer(delta) {

    if (!player) return;


    let dx = 0;

    let dy = 0;


    if (
        keys["ArrowLeft"] ||
        keys["a"] ||
        keys["A"]
    ) {

        dx--;

    }


    if (
        keys["ArrowRight"] ||
        keys["d"] ||
        keys["D"]
    ) {

        dx++;

    }


    if (
        keys["ArrowUp"] ||
        keys["w"] ||
        keys["W"]
    ) {

        dy--;

    }


    if (
        keys["ArrowDown"] ||
        keys["s"] ||
        keys["S"]
    ) {

        dy++;

    }


    if (dx !== 0 && dy !== 0) {

        dx *= .707;

        dy *= .707;

    }


    player.x +=
        dx *
        player.speed *
        delta;


    player.y +=
        dy *
        player.speed *
        delta;


    const half =
        player.width / 2;


    player.x =
        Math.max(
            half,
            Math.min(
                wrapper.clientWidth - half,
                player.x
            )
        );


    player.y =
        Math.max(
            player.height / 2,
            Math.min(
                wrapper.clientHeight -
                player.height / 2,
                player.y
            )
        );


    if (
        player.invincible > 0
    ) {

        player.invincible -=
            delta;

    }

}



/* =========================================
   UPDATE GAME
========================================= */

function updateGame(delta) {

    if (!gameRunning)
        return;


    updatePlayer(delta);


    /* SPAWN */

    spawnTimer -= delta;


    const spawnRate =
        Math.max(
            .22,
            .75 -
            level * .045
        );


    if (spawnTimer <= 0) {

        obstacles.push(
            createObstacle()
        );

        spawnTimer =
            spawnRate;

    }


    /* OBSTACLES */

    for (
        let i = obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        obstacle.y +=
            obstacle.speed *
            60 *
            delta;


        obstacle.rotation +=
            obstacle.rotationSpeed;


        /* COLLISION */

        if (
            player.invincible <= 0 &&
            collision(
                player,
                obstacle
            )
        ) {

            obstacles.splice(i, 1);


            lives--;


            livesElement.textContent =
                lives;


            player.invincible =
                1.3;


            createParticles(
                player.x,
                player.y,
                20
            );


            playHitSound();


            if (lives <= 0) {

                endGame();

                return;

            }

        }


        /* REMOVE */

        else if (
            obstacle.y >
            wrapper.clientHeight + 80
        ) {

            obstacles.splice(i, 1);


            score += 10;


            scoreElement.textContent =
                score;


            const newLevel =
                Math.floor(score / 100) + 1;


            if (
                newLevel !== level
            ) {

                level =
                    newLevel;

                levelElement.textContent =
                    level;

            }

        }

    }


    /* PARTICLES */

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particles[i];


        p.x +=
            p.vx *
            60 *
            delta;


        p.y +=
            p.vy *
            60 *
            delta;


        p.life -=
            delta * 1.7;


        if (
            p.life <= 0
        ) {

            particles.splice(i, 1);

        }

    }

}



/* =========================================
   DRAW GAME
========================================= */

function drawGame() {

    drawBackground();


    obstacles.forEach(
        drawObstacle
    );


    drawParticles();


    drawPlayer();

}



/* =========================================
   GAME LOOP
========================================= */

function gameLoop(timestamp) {

    if (!lastTime)
        lastTime =
            timestamp;


    const delta =
        Math.min(
            (timestamp - lastTime) /
            1000,
            .05
        );


    lastTime =
        timestamp;


    updateGame(delta);

    drawGame();


    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}



/* =========================================
   START GAME
========================================= */

function startNeonGame() {

    resizeCanvas();


    score = 0;

    level = 1;

    lives = 3;


    obstacles = [];

    particles = [];


    player =
        createPlayer();


    scoreElement.textContent =
        score;

    levelElement.textContent =
        level;

    livesElement.textContent =
        lives;


    gameRunning = true;


    overlay.style.display =
        "none";


    gameOverScreen.style.display =
        "none";


    gameStatus.textContent =
        "SURVIVE";


    spawnTimer =
        .4;


    lastTime =
        0;


    cancelAnimationFrame(
        animationFrame
    );


    animationFrame =
        requestAnimationFrame(
            gameLoop
        );


    playStartSound();

}



/* =========================================
   END GAME
========================================= */

function endGame() {

    gameRunning = false;


    cancelAnimationFrame(
        animationFrame
    );


    finalScoreElement.textContent =
        score;


    gameOverScreen.style.display =
        "grid";


    gameStatus.textContent =
        "RUN ENDED";


    if (
        score >
        bestScore
    ) {

        bestScore =
            score;


        localStorage.setItem(
            "neon-dodge-best",
            bestScore
        );


        bestElement.textContent =
            bestScore;

    }


    playGameOverSound();

}



/* =========================================
   KEYBOARD
========================================= */

window.addEventListener(
    "keydown",
    event => {

        keys[event.key] =
            true;


        if (
            [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight"
            ].includes(event.key)
        ) {

            event.preventDefault();

        }

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[event.key] =
            false;

    }
);



/* =========================================
   TOUCH / MOUSE CONTROL
========================================= */

let pointerActive = false;


function movePlayerToPointer(
    event
) {

    if (
        !gameRunning ||
        !player
    ) return;


    const rect =
        canvas.getBoundingClientRect();


    let clientX;

    let clientY;


    if (
        event.touches &&
        event.touches.length
    ) {

        clientX =
            event.touches[0].clientX;

        clientY =
            event.touches[0].clientY;

    } else {

        clientX =
            event.clientX;

        clientY =
            event.clientY;

    }


    player.x =
        clientX -
        rect.left;


    player.y =
        clientY -
        rect.top;


    player.x =
        Math.max(
            player.width / 2,
            Math.min(
                rect.width -
                player.width / 2,
                player.x
            )
        );


    player.y =
        Math.max(
            player.height / 2,
            Math.min(
                rect.height -
                player.height / 2,
                player.y
            )
        );

}


canvas.addEventListener(
    "pointerdown",
    event => {

        pointerActive = true;

        movePlayerToPointer(
            event
        );

    }
);


canvas.addEventListener(
    "pointermove",
    event => {

        if (
            pointerActive
        ) {

            movePlayerToPointer(
                event
            );

        }

    }
);


window.addEventListener(
    "pointerup",
    () => {

        pointerActive = false;

    }
);



/* =========================================
   SOUND
========================================= */

let audioContext;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    return audioContext;

}


function beep(
    frequency,
    duration,
    type = "sine"
) {

    if (!soundEnabled)
        return;


    try {

        const audio =
            getAudioContext();


        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.type =
            type;


        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            .035,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .001,
            audio.currentTime +
            duration
        );


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        oscillator.start();

        oscillator.stop(
            audio.currentTime +
            duration
        );

    } catch (error) {

        /* Audio isn't required
           for the game to work. */

    }

}


function playStartSound() {

    beep(
        440,
        .08
    );


    setTimeout(() => {

        beep(
            660,
            .12
        );

    }, 90);

}


function playHitSound() {

    beep(
        130,
        .16,
        "sawtooth"
    );

}


function playGameOverSound() {

    beep(
        180,
        .15,
        "triangle"
    );


    setTimeout(() => {

        beep(
            100,
            .25,
            "triangle"
        );

    }, 160);

}



/* =========================================
   SOUND BUTTON
========================================= */

soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        soundButton.textContent =
            soundEnabled
                ? "SOUND: ON"
                : "SOUND: OFF";

    }
);



/* =========================================
   GAME BUTTONS
========================================= */

startButton.addEventListener(
    "click",
    startNeonGame
);


restartButton.addEventListener(
    "click",
    startNeonGame
);



/* =========================================
   INITIAL GAME DRAW
========================================= */

resizeCanvas();

drawBackground();