/* =====================================================
   AYDEN OS
   Interactive Web Operating System
===================================================== */


/* =====================================================
   PORTFOLIO DATA
===================================================== */

const PORTFOLIO = {

    name: "Prabin",

    username: "prabeen",

    portfolio:
        "https://prabin67.com.np",

    github:
        "https://github.com/prabeen43",

    email:
        "panthiprabin91@gmail.com",

    instagram:
        "https://instagram.com/_prabeen.js_",

    education: [
        "Bagiswori Higher Secondary School — Chyamasing, Bhaktapur",
        "NCCS Secondary School — Paknajol, Kathmandu",
        "Management major in Computer Science",
        "Techspire — Baneshwor, Kathmandu",
        "BSc IT — joined August 2026"
    ],

    skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "C",
        "Git & GitHub",
        "Web Development",
        "UI Design",
        "Responsive Design",
        "Browser Game Development",
        "Roblox Game Development — Beginner",
        "Problem Solving"
    ],

    projects: [
        "Jyotish AI",
        "Balloon Blitz",
        "Ayden OS",
        "Python Mini Projects",
        "Roblox Game Development"
    ]

};


/* =====================================================
   GLOBAL STATE
===================================================== */

let osUnlocked = false;

let zIndex = 50;

let terminalHistory = [];

let terminalHistoryIndex = -1;

let calcExpression = "";

let currentFolder = "Home";


/* =====================================================
   BOOT SYSTEM
===================================================== */

window.addEventListener("load", () => {

    createStars();

    startBoot();

    updateAllClocks();

    setInterval(updateAllClocks, 1000);

    loadTheme();

    setupWindows();

    showFolder("Home");

});


function startBoot() {

    const bootScreen =
        document.getElementById("bootScreen");

    const progress =
        document.getElementById("bootProgress");

    const status =
        document.getElementById("bootStatus");

    const messages = [

        "Initializing kernel...",
        "Loading Ayden services...",
        "Mounting virtual filesystem...",
        "Starting desktop environment...",
        "Loading applications...",
        "Preparing user session...",
        "Ayden OS is ready."

    ];

    let progressValue = 0;

    let messageIndex = 0;

    const interval = setInterval(() => {

        progressValue +=
            Math.floor(
                Math.random() * 10
            ) + 7;

        if (progressValue >= 100) {

            progressValue = 100;

            clearInterval(interval);

            status.textContent =
                "System ready.";

            setTimeout(() => {

                bootScreen.style.opacity = "0";

                setTimeout(() => {

                    bootScreen.style.display =
                        "none";

                }, 600);

            }, 500);

        } else {

            if (
                progressValue > 15 &&
                messageIndex < messages.length - 1
            ) {
                messageIndex++;

                status.textContent =
                    messages[messageIndex];
            }

        }

        progress.style.width =
            progressValue + "%";

    }, 220);

}


/* =====================================================
   LOCK SCREEN
===================================================== */

function unlockOS() {

    if (osUnlocked) return;

    osUnlocked = true;

    const lockScreen =
        document.getElementById("lockScreen");

    lockScreen.classList.add("unlocking");

    setTimeout(() => {

        lockScreen.style.display = "none";

        openApp("terminal");

        setTimeout(() => {

            closeWindow("terminalWindow");

        }, 100);

    }, 700);

}


document.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        !osUnlocked
    ) {
        unlockOS();

        return;
    }

});


/* =====================================================
   LOCK SCREEN CLOCK
===================================================== */

function updateLockClock() {

    const now = new Date();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    const ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours %= 12;

    if (hours === 0) {
        hours = 12;
    }

    const time =
        String(hours)
            .padStart(2, "0")
        + ":" +
        minutes
        + " " +
        ampm;

    const date =
        now.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

    document.getElementById(
        "lockTime"
    ).textContent = time;

    document.getElementById(
        "lockDate"
    ).textContent = date;

}


/* =====================================================
   DESKTOP CLOCK
===================================================== */

function updateDesktopClock() {

    const now = new Date();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    const ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours %= 12;

    if (hours === 0) {
        hours = 12;
    }

    const time =
        String(hours)
            .padStart(2, "0")
        + ":" +
        minutes
        + " " +
        ampm;

    const date =
        String(now.getDate())
            .padStart(2, "0")
        + "/" +
        String(now.getMonth() + 1)
            .padStart(2, "0")
        + "/" +
        now.getFullYear();

    document.getElementById(
        "clockTime"
    ).textContent = time;

    document.getElementById(
        "clockDate"
    ).textContent = date;

}


function updateAllClocks() {

    updateLockClock();

    updateDesktopClock();

}


/* =====================================================
   STAR GENERATOR
===================================================== */

function createStars() {

    const container =
        document.getElementById("stars");

    if (!container) return;

    for (let i = 0; i < 100; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            (1 + Math.random() * 4) + "s"
        );

        container.appendChild(star);

    }

}


/* =====================================================
   APP SYSTEM
===================================================== */

function openApp(app) {

    const element =
        document.getElementById(
            app + "Window"
        );

    if (!element) return;

    element.classList.add("active");

    bringToFront(element);

    closeStartMenu();

    if (app === "terminal") {

        setTimeout(() => {

            document
                .getElementById(
                    "terminalInput"
                )
                .focus();

        }, 100);

    }

}


function bringToFront(element) {

    zIndex++;

    element.style.zIndex = zIndex;

}


function closeWindow(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.classList.remove("active");

    element.classList.remove("maximized");

}


function minimizeWindow(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.classList.remove("active");

}


function maximizeWindow(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.classList.toggle("maximized");

}


/* =====================================================
   WINDOW DRAGGING
===================================================== */

function setupWindows() {

    document
        .querySelectorAll(".window")
        .forEach(windowElement => {

            const header =
                windowElement.querySelector(
                    ".window-header"
                );

            if (!header) return;

            let dragging = false;

            let offsetX = 0;

            let offsetY = 0;


            header.addEventListener(
                "mousedown",
                event => {

                    if (
                        event.target.closest(
                            ".window-controls"
                        )
                    ) {
                        return;
                    }

                    if (
                        windowElement.classList
                            .contains("maximized")
                    ) {
                        return;
                    }

                    dragging = true;

                    const rect =
                        windowElement
                            .getBoundingClientRect();

                    offsetX =
                        event.clientX -
                        rect.left;

                    offsetY =
                        event.clientY -
                        rect.top;

                    bringToFront(
                        windowElement
                    );

                }
            );


            document.addEventListener(
                "mousemove",
                event => {

                    if (!dragging) return;

                    let x =
                        event.clientX -
                        offsetX;

                    let y =
                        event.clientY -
                        offsetY;

                    const maxX =
                        window.innerWidth -
                        windowElement.offsetWidth;

                    const maxY =
                        window.innerHeight -
                        windowElement.offsetHeight -
                        62;

                    x =
                        Math.max(
                            0,
                            Math.min(
                                x,
                                maxX
                            )
                        );

                    y =
                        Math.max(
                            0,
                            Math.min(
                                y,
                                maxY
                            )
                        );

                    windowElement.style.left =
                        x + "px";

                    windowElement.style.top =
                        y + "px";

                }
            );


            document.addEventListener(
                "mouseup",
                () => {
                    dragging = false;
                }
            );


            windowElement.addEventListener(
                "mousedown",
                () => {
                    bringToFront(windowElement);
                }
            );

        });

}


/* =====================================================
   DESKTOP ICONS
===================================================== */

function selectDesktopIcon(element) {

    document
        .querySelectorAll(".desktop-icon")
        .forEach(icon => {
            icon.classList.remove("selected");
        });

    element.classList.add("selected");

}


/* =====================================================
   START MENU
===================================================== */

function toggleStartMenu() {

    document
        .getElementById("startMenu")
        .classList.toggle("show");

}


function closeStartMenu() {

    document
        .getElementById("startMenu")
        .classList.remove("show");

}


function startApp(app) {

    openApp(app);

    closeStartMenu();

}


function filterApps() {

    const query =
        document
            .getElementById("startSearch")
            .value
            .toLowerCase();

    document
        .querySelectorAll(
            "#appList button"
        )
        .forEach(button => {

            const text =
                button.innerText.toLowerCase();

            button.style.display =
                text.includes(query)
                    ? "flex"
                    : "none";

        });

}


document.addEventListener("click", event => {

    const menu =
        document.getElementById(
            "startMenu"
        );

    const button =
        document.querySelector(
            ".start-button"
        );

    if (
        menu.classList.contains("show") &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
    ) {

        closeStartMenu();

    }

});


/* =====================================================
   FILE SYSTEM
===================================================== */

const FILE_SYSTEM = {

    Home: [

        {
            name: "Documents",
            icon: "📄",
            type: "folder"
        },

        {
            name: "Projects",
            icon: "💻",
            type: "folder"
        },

        {
            name: "Pictures",
            icon: "🖼️",
            type: "folder"
        },

        {
            name: "Videos",
            icon: "🎬",
            type: "folder"
        },

        {
            name: "Music",
            icon: "🎵",
            type: "folder"
        },

        {
            name: "Downloads",
            icon: "⬇️",
            type: "folder"
        },

        {
            name: "readme.txt",
            icon: "📄",
            type: "file"
        }

    ],

    Documents: [

        {
            name: "Prabin_Profile.txt",
            icon: "📄",
            type: "file"
        },

        {
            name: "Education.txt",
            icon: "🎓",
            type: "file"
        },

        {
            name: "Skills.txt",
            icon: "🧠",
            type: "file"
        },

        {
            name: "Contact.txt",
            icon: "📧",
            type: "file"
        }

    ],

    Projects: [

        {
            name: "Jyotish AI",
            icon: "🔮",
            type: "project",
            url:
                "https://prabin67.com.np/jyotishai"
        },

        {
            name: "Balloon Blitz",
            icon: "🎈",
            type: "project"
        },

        {
            name: "Ayden OS",
            icon: "🖥️",
            type: "project"
        },

        {
            name: "Python Mini Projects",
            icon: "🐍",
            type: "project"
        },

        {
            name: "Roblox Games",
            icon: "🎮",
            type: "project"
        }

    ],

    Pictures: [

        {
            name: "Portfolio",
            icon: "🖼️",
            type: "file"
        },

        {
            name: "Jyotish AI",
            icon: "🔮",
            type: "file"
        }

    ],

    Videos: [

        {
            name: "Balloon Blitz Gameplay",
            icon: "🎬",
            type: "file"
        }

    ],

    Music: [

        {
            name: "Music",
            icon: "🎵",
            type: "file"
        }

    ],

    Downloads: [

        {
            name: "Prabin CV.pdf",
            icon: "📕",
            type: "file"
        }

    ]

};


/* =====================================================
   SHOW FOLDER
===================================================== */

function showFolder(folder) {

    currentFolder = folder;

    const grid =
        document.getElementById(
            "fileGrid"
        );

    const title =
        document.getElementById(
            "folderTitle"
        );

    const address =
        document.getElementById(
            "currentFolder"
        );

    if (!grid) return;

    grid.innerHTML = "";

    title.textContent = folder;

    address.textContent = folder;

    const files =
        FILE_SYSTEM[folder] || [];

    files.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "file-item";

        element.innerHTML = `

            <span class="file-item-icon">
                ${item.icon}
            </span>

            <span class="file-item-name">
                ${item.name}
            </span>

        `;

        element.ondblclick = () => {

            if (item.type === "folder") {

                showFolder(item.name);

                return;

            }

            if (item.type === "project") {

                if (item.url) {

                    openExternal(item.url);

                } else {

                    openProjectInfo(item.name);

                }

                return;

            }

            openFile(item.name);

        };

        grid.appendChild(element);

    });

}


/* =====================================================
   FILE OPENING
===================================================== */

function openFile(name) {

    const viewer =
        document.getElementById(
            "fileViewer"
        );

    const title =
        document.getElementById(
            "viewerTitle"
        );

    const content =
        document.getElementById(
            "viewerContent"
        );

    title.textContent = name;

    let html = "";

    if (
        name === "readme.txt"
    ) {

        html = `
            <pre>
AYDEN OS
========

Welcome to Ayden OS.

This is a browser-based operating
system simulation created by Prabin.

Portfolio:
${PORTFOLIO.portfolio}

GitHub:
${PORTFOLIO.github}

Email:
${PORTFOLIO.email}

Type "help" in Ayden Terminal
to explore the system.
            </pre>
        `;

    }

    else if (
        name === "Prabin_Profile.txt"
    ) {

        html = `
            <h2>${PORTFOLIO.name}</h2>

            <p>
                Developer and IT student interested
                in web development, Python,
                JavaScript and game development.
            </p>

            <br>

            <strong>Portfolio</strong>
            <p>${PORTFOLIO.portfolio}</p>

            <strong>GitHub</strong>
            <p>${PORTFOLIO.github}</p>
        `;

    }

    else if (
        name === "Education.txt"
    ) {

        html =
            "<h2>Education</h2>" +
            PORTFOLIO.education
                .map(item => `<p>• ${item}</p>`)
                .join("");

    }

    else if (
        name === "Skills.txt"
    ) {

        html =
            "<h2>Skills</h2>" +
            PORTFOLIO.skills
                .map(item => `<p>• ${item}</p>`)
                .join("");

    }

    else if (
        name === "Contact.txt"
    ) {

        html = `
            <h2>Contact</h2>

            <p>
                Email:
                ${PORTFOLIO.email}
            </p>

            <p>
                Instagram:
                _prabeen.js_
            </p>

            <p>
                GitHub:
                ${PORTFOLIO.github}
            </p>

            <p>
                Portfolio:
                ${PORTFOLIO.portfolio}
            </p>
        `;

    }

    else if (
        name === "Prabin CV.pdf"
    ) {

        html = `
            <h2>Prabin CV</h2>

            <p>
                CV preview is available through
                the main portfolio website.
            </p>

            <br>

            <button
                onclick="openExternal('${PORTFOLIO.portfolio}')"
                class="viewer-action"
            >
                Open Portfolio
            </button>
        `;

    }

    else {

        html = `
            <h2>${name}</h2>

            <p>
                This item is part of the
                Ayden OS virtual filesystem.
            </p>

            <br>

            <p>
                Double-click projects to open
                their project information.
            </p>
        `;

    }

    content.innerHTML = html;

    viewer.classList.add("show");

}


function closeFileViewer() {

    document
        .getElementById("fileViewer")
        .classList.remove("show");

}


/* =====================================================
   PROJECT INFORMATION
===================================================== */

function openProjectInfo(name) {

    const viewer =
        document.getElementById(
            "fileViewer"
        );

    const title =
        document.getElementById(
            "viewerTitle"
        );

    const content =
        document.getElementById(
            "viewerContent"
        );

    title.textContent = name;

    if (
        name === "Ayden OS"
    ) {

        content.innerHTML = `

            <h2>Ayden OS</h2>

            <p>
                A browser-based operating system
                simulation built with HTML,
                CSS and JavaScript.
            </p>

            <br>

            <p>
                Features include a boot screen,
                lock screen, desktop,
                terminal, file explorer,
                calculator, browser, settings
                and interactive applications.
            </p>

            <br>

            <button
                class="viewer-action"
                onclick="openExternal('${PORTFOLIO.portfolio}')"
            >
                Open Prabin Portfolio ↗
            </button>

        `;

    }

    else {

        content.innerHTML = `

            <h2>${name}</h2>

            <p>
                This is one of Prabin's
                development projects.
            </p>

            <br>

            <button
                class="viewer-action"
                onclick="openExternal('${PORTFOLIO.portfolio}')"
            >
                View Portfolio ↗
            </button>

        `;

    }

    viewer.classList.add("show");

}


/* =====================================================
   BROWSER
===================================================== */

function loadWebsite() {

    let url =
        document
            .getElementById(
                "browserInput"
            )
            .value
            .trim();

    if (!url) return;

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {

        if (
            url.includes(".") &&
            !url.includes(" ")
        ) {

            url =
                "https://" + url;

        } else {

            url =
                "https://www.google.com/search?q=" +
                encodeURIComponent(url);

        }

    }

    window.open(
        url,
        "_blank"
    );

}


function browserKey(event) {

    if (
        event.key === "Enter"
    ) {
        loadWebsite();
    }

}


function searchWeb() {

    const query =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .trim();

    if (!query) return;

    openExternal(
        "https://www.google.com/search?q=" +
        encodeURIComponent(query)
    );

}


function browserHome() {

    document
        .getElementById(
            "browserInput"
        )
        .value =
        "https://www.google.com";

}


function browserBack() {

    window.history.back();

}


function browserForward() {

    window.history.forward();

}


function openExternal(url) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   TERMINAL
===================================================== */

function focusTerminal() {

    const input =
        document.getElementById(
            "terminalInput"
        );

    if (input) {
        input.focus();
    }

}


function terminalKey(event) {

    const input =
        document.getElementById(
            "terminalInput"
        );

    if (
        event.key === "Enter"
    ) {

        const command =
            input.value.trim();

        if (command) {

            terminalHistory.push(command);

            terminalHistoryIndex =
                terminalHistory.length;

            executeCommand(command);

        }

        input.value = "";

    }


    if (
        event.key === "ArrowUp"
    ) {

        if (
            terminalHistory.length === 0
        ) {
            return;
        }

        terminalHistoryIndex =
            Math.max(
                0,
                terminalHistoryIndex - 1
            );

        input.value =
            terminalHistory[
                terminalHistoryIndex
            ];

        event.preventDefault();

    }


    if (
        event.key === "ArrowDown"
    ) {

        terminalHistoryIndex =
            Math.min(
                terminalHistory.length,
                terminalHistoryIndex + 1
            );

        if (
            terminalHistoryIndex >=
            terminalHistory.length
        ) {

            input.value = "";

        } else {

            input.value =
                terminalHistory[
                    terminalHistoryIndex
                ];

        }

        event.preventDefault();

    }

}


function terminalPrint(
    text,
    type = ""
) {

    const output =
        document.querySelector(
            ".terminal-output"
        );

    const line =
        document.createElement("div");

    line.className =
        "terminal-line " + type;

    line.textContent = text;

    output.appendChild(line);

    const terminalBody =
        document.getElementById(
            "terminalBody"
        );

    terminalBody.scrollTop =
        terminalBody.scrollHeight;

}


function terminalPrintLines(
    lines,
    type = ""
) {

    lines.forEach(line => {

        terminalPrint(
            line,
            type
        );

    });

}


function printCommand(command) {

    terminalPrint(
        `prabin@ayden:~$ ${command}`
    );

}


function executeCommand(rawCommand) {

    const command =
        rawCommand
            .trim()
            .toLowerCase();

    printCommand(rawCommand);

    const parts =
        command.split(/\s+/);

    const base =
        parts[0];

    switch (base) {


        case "help":

            terminalPrintLines([

                "Available commands:",
                "",
                "  help        Show commands",
                "  about       About Prabin",
                "  whoami      Current user",
                "  skills      Show skills",
                "  education   Show education",
                "  projects    Show projects",
                "  contact     Show contact",
                "  socials     Show social links",
                "  portfolio   Open portfolio",
                "  github      Open GitHub",
                "  open        Open an application",
                "  files       Open File Explorer",
                "  clear       Clear terminal",
                "  date        Show current date",
                "  neofetch    System information",
                "  exit        Close terminal"

            ], "info");

            break;


        case "about":

            terminalPrintLines([

                "PRABIN",
                "------",
                "IT student and beginner developer.",
                "",
                "Interested in:",
                "Web development",
                "Python",
                "JavaScript",
                "Game development",
                "Roblox development",
                "",
                "Portfolio:",
                PORTFOLIO.portfolio

            ]);

            break;


        case "whoami":

            terminalPrint(
                "prabin — Ayden OS administrator",
                "success"
            );

            break;


        case "skills":

            terminalPrint(
                "SKILLS",
                "info"
            );

            PORTFOLIO.skills.forEach(
                skill => {
                    terminalPrint(
                        "  • " + skill
                    );
                }
            );

            break;


        case "education":

            terminalPrint(
                "EDUCATION",
                "info"
            );

            PORTFOLIO.education.forEach(
                item => {
                    terminalPrint(
                        "  • " + item
                    );
                }
            );

            break;


        case "projects":

            terminalPrint(
                "PROJECTS",
                "info"
            );

            PORTFOLIO.projects.forEach(
                project => {
                    terminalPrint(
                        "  • " + project
                    );
                }
            );

            break;


        case "contact":

            terminalPrintLines([

                "CONTACT",
                "",
                "Email: " +
                    PORTFOLIO.email,

                "Portfolio: " +
                    PORTFOLIO.portfolio,

                "GitHub: " +
                    PORTFOLIO.github,

                "Instagram: _prabeen.js_"

            ]);

            break;


        case "socials":

            terminalPrintLines([

                "SOCIALS",
                "",
                "GitHub:",
                PORTFOLIO.github,
                "",
                "Instagram:",
                PORTFOLIO.instagram,
                "",
                "Portfolio:",
                PORTFOLIO.portfolio

            ]);

            break;


        case "portfolio":

            terminalPrint(
                "Opening Prabin portfolio...",
                "success"
            );

            setTimeout(() => {

                openExternal(
                    PORTFOLIO.portfolio
                );

            }, 300);

            break;


        case "github":

            terminalPrint(
                "Opening GitHub...",
                "success"
            );

            setTimeout(() => {

                openExternal(
                    PORTFOLIO.github
                );

            }, 300);

            break;


        case "open":

            if (!parts[1]) {

                terminalPrint(
                    "Usage: open <app>",
                    "error"
                );

                terminalPrint(
                    "Apps: files, browser, calculator, settings",
                    "muted"
                );

                break;

            }

            const app =
                parts[1];

            const aliases = {

                files:
                    "files",

                explorer:
                    "files",

                browser:
                    "browser",

                calculator:
                    "calculator",

                calc:
                    "calculator",

                settings:
                    "settings",

                terminal:
                    "terminal",

                computer:
                    "computer"

            };

            if (
                aliases[app]
            ) {

                terminalPrint(
                    "Opening " +
                    app +
                    "...",
                    "success"
                );

                setTimeout(() => {

                    openApp(
                        aliases[app]
                    );

                }, 200);

            } else {

                terminalPrint(
                    "Application not found: " +
                    app,
                    "error"
                );

            }

            break;


        case "files":

            openApp("files");

            terminalPrint(
                "Opening File Explorer...",
                "success"
            );

            break;


        case "date":

            terminalPrint(
                new Date().toString()
            );

            break;


        case "clear":

            document.querySelector(
                ".terminal-output"
            ).innerHTML = "";

            break;


        case "neofetch":

            terminalPrintLines([

                "             ███████████",
                "          ████ AYDEN ████",
                "        ████     OS     ████",
                "",
                " OS:       Ayden OS Web Edition",
                " User:     Prabin",
                " Host:     ayden",
                " Shell:    ayden-shell",
                " Version:  1.0",
                " Kernel:   Ayden Web Kernel",
                " Theme:    Dark",
                " Browser:  Web",
                "",
                " Portfolio: prabin67.com.np"

            ], "info");

            break;


        case "exit":

            closeWindow(
                "terminalWindow"
            );

            break;


        case "ls":

            terminalPrintLines([

                "Documents/",
                "Projects/",
                "Pictures/",
                "Videos/",
                "Music/",
                "Downloads/",
                "readme.txt"

            ]);

            break;


        case "pwd":

            terminalPrint(
                "/home/prabin"
            );

            break;


        default:

            terminalPrint(
                "Command not found: " +
                rawCommand,
                "error"
            );

            terminalPrint(
                "Type 'help' for available commands.",
                "muted"
            );

    }

}


/* =====================================================
   CALCULATOR
===================================================== */

function addCalc(value) {

    const display =
        document.getElementById(
            "calcDisplay"
        );

    if (
        display.value === "Error"
    ) {
        display.value = "";
    }

    if (
        display.value === "0" &&
        value !== "."
    ) {
        display.value = "";
    }

    display.value += value;

}


function clearCalc() {

    document.getElementById(
        "calcDisplay"
    ).value = "0";

}


function deleteCalc() {

    const display =
        document.getElementById(
            "calcDisplay"
        );

    display.value =
        display.value.slice(
            0,
            -1
        );

    if (
        display.value === ""
    ) {
        display.value = "0";
    }

}


function calculate() {

    const display =
        document.getElementById(
            "calcDisplay"
        );

    const expression =
        display.value;

    try {

        if (
            !/^[0-9+\-*/%.()\s]+$/
                .test(expression)
        ) {
            throw new Error();
        }

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();

        if (
            !Number.isFinite(result)
        ) {
            throw new Error();
        }

        display.value = result;

    } catch {

        display.value = "Error";

    }

}


/* =====================================================
   CALCULATOR KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const calc =
            document.getElementById(
                "calculatorWindow"
            );

        if (
            !calc ||
            !calc.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            /^[0-9+\-*/%.()]$/
                .test(event.key)
        ) {

            addCalc(event.key);

        }

        if (
            event.key === "Enter"
        ) {

            calculate();

        }

        if (
            event.key === "Backspace"
        ) {

            deleteCalc();

        }

        if (
            event.key === "Escape"
        ) {

            clearCalc();

        }

    }
);


/* =====================================================
   SETTINGS / THEME
===================================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "light"
    );

    const light =
        document.body.classList.contains(
            "light"
        );

    localStorage.setItem(
        "ayden-theme",
        light
            ? "light"
            : "dark"
    );

    const button =
        document.getElementById(
            "themeToggle"
        );

    if (button) {

        button.textContent =
            light
                ? "OFF"
                : "ON";

    }

}


function loadTheme() {

    const theme =
        localStorage.getItem(
            "ayden-theme"
        );

    if (
        theme === "light"
    ) {

        document.body.classList.add(
            "light"
        );

        const button =
            document.getElementById(
                "themeToggle"
            );

        if (button) {
            button.textContent =
                "OFF";
        }

    }

}


/* =====================================================
   FOLDERS / SIDEBAR
===================================================== */

document.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".sidebar-item"
            );

        if (!item) return;

        document
            .querySelectorAll(
                ".sidebar-item"
            )
            .forEach(element => {

                element.classList.remove(
                    "active"
                );

            });

        item.classList.add(
            "active"
        );

    }
);


/* =====================================================
   FILE VIEWER ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeFileViewer();

            closeStartMenu();

        }

    }
);


/* =====================================================
   RESTART
===================================================== */

function restartOS() {

    closeStartMenu();

    document
        .querySelectorAll(".window")
        .forEach(windowElement => {

            windowElement.classList.remove(
                "active"
            );

            windowElement.classList.remove(
                "maximized"
            );

        });

    osUnlocked = false;

    const lockScreen =
        document.getElementById(
            "lockScreen"
        );

    const bootScreen =
        document.getElementById(
            "bootScreen"
        );

    const progress =
        document.getElementById(
            "bootProgress"
        );

    const status =
        document.getElementById(
            "bootStatus"
        );

    progress.style.width = "0%";

    status.textContent =
        "Restarting system...";

    bootScreen.style.display =
        "flex";

    bootScreen.style.opacity =
        "1";

    lockScreen.style.display =
        "block";

    lockScreen.classList.remove(
        "unlocking"
    );

    let value = 0;

    const interval =
        setInterval(() => {

            value += 12;

            progress.style.width =
                value + "%";

            if (
                value >= 100
            ) {

                clearInterval(interval);

                setTimeout(() => {

                    bootScreen.style.opacity =
                        "0";

                    setTimeout(() => {

                        bootScreen.style.display =
                            "none";

                    }, 600);

                }, 400);

            }

        }, 100);

}


/* =====================================================
   CLOSE FILE VIEWER WHEN CLICKING BACKDROP
===================================================== */

document
    .getElementById("fileViewer")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "fileViewer"
            ) {

                closeFileViewer();

            }

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

console.log(
    "Ayden OS initialized."
);

console.log(
    "Welcome, " +
    PORTFOLIO.name +
    "."
);