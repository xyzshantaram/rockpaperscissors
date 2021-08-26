const CHOICES = {
    Rock: 0,
    Paper: 1,
    Scissors: 2
}

const CHOICE_NAMES = ["Rock", "Paper", "Scissors"]

// probably a cleaner / more readable way to do this.
// In TypeScript there's enums, but I'm lazy...
// Accessing: OUTCOMES[computerChoice][userChoice]
const OUTCOMES = {
    0: { // rock
        0: "It's a tie.", // rock
        1: "You win.", // paper
        2: "You lose." // scissors
    },
    1: { // paper
        0: "You lose.", // rock
        1: "It's a tie.", // paper
        2: "You win." // scissors
    },
    2: { // scissors
        0: "You win.", // rock
        1: "You lose.", // paper
        2: "It's a tie." // scissors
    }
}

Object.freeze(CHOICES);

function createElement(args) {
    let { parent, type, className, id, innerHTML, misc, children, style } = args;
    if (!type) type = 'div';
    let elem = document.createElement(type);
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (misc) Object.assign(elem, misc);
    if (children) {
        for (let child of children) {
            elem.appendChild(child);
        }
    }
    if (style) Object.assign(elem.style, style);
    if (parent) parent.appendChild(elem);
    return elem;
}

// from https://www.w3schools.com/JS/js_random.asp
function randIntFromRange(min, max) {
    if (!max) {
        max = min;
        min = 0;
    } // this way we can do randIntFromRange(foo) to get a number between 0 and foo
    return Math.floor(Math.random() * (max - min)) + min;
}

class RockPaperScissors {
    paused = false;
    started = false;
    score = 0;
    root = null;
    scoreField = null;
    buttonContainer = null;

    constructor() {
        this.root = document.querySelector("#app");
        this.scoreField = document.querySelector("#score-contents");
        this.buttonContainer = document.querySelector("#button-container");
    }

    makeChoice() {
        const keys = Object.keys(CHOICES);
        return CHOICES[keys[randIntFromRange(keys.length)]];
    }

    begin() {
        this.genUI();
        this.started = true;
    }

    update(userChoice) {
        if (!this.started) return;
        const choice = this.makeChoice();
        const outcome = OUTCOMES[choice][userChoice];

        if (outcome == "You win.") {
            this.score++;
        }

        this.scoreField.innerHTML = this.score;

        let old = null;
        if (old = this.root.querySelector("#outcome")) {
            this.root.removeChild(old);
        }

        if (this.oldChoice) {
            this.root.removeChild(this.oldChoice);
        }

        this.oldChoice = createElement({
            type: "h4",
            style: {
                "textAlign": 'center'
            },
            innerHTML: `I picked: ${CHOICE_NAMES[choice]}`,
            parent: this.root
        })

        createElement({
            id: "outcome",
            type: "h2",
            innerHTML: outcome,
            parent: this.root
        })
    }

    genUI() {
        // probably a cleaner way to do this that I can't think of :3
        this.rockBtn = createElement({
            parent: this.buttonContainer,
            type: 'button',
            misc: {
                onclick: (e) => {
                    this.rockButtonClicked();
                }
            },
            innerHTML: 'Rock'
        })

        this.paperBtn = createElement({
            parent: this.buttonContainer,
            type: 'button',
            misc: {
                onclick: (e) => {
                    this.paperButtonClicked();
                }
            },
            innerHTML: 'Paper'
        })

        this.scissorsBtn = createElement({
            parent: this.buttonContainer,
            type: 'button',
            misc: {
                onclick: (e) => {
                    this.scissorsButtonClicked();
                }
            },
            innerHTML: 'Scissors'
        })
    }

    rockButtonClicked() {
        this.update(CHOICES.Rock);
    }

    paperButtonClicked() {
        this.update(CHOICES.Paper);
    }

    scissorsButtonClicked() {
        this.update(CHOICES.Scissors);
    }
}

window.addEventListener("DOMContentLoaded", function() {
    window.game = new RockPaperScissors(); // parent to window object for debugging
    game.begin();
})