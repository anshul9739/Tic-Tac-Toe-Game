let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let turnX = true;
let gameOver = false;
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.classList.contains("disabled")) return;

        box.innerText = turnX ? "X" : "O";
        turnX = !turnX;
        box.classList.add("disabled");

        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the Winner is ${winner}`;
    messageContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                console.log("winner", posVal1);
                gameOver = true;
                showWinner(posVal1);
                return;
            }
        }
    }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("disabled");
    });
    turnX = true;
    gameOver = false;
    messageContainer.classList.add("hide");
});

newGameBtn.addEventListener("click", () => {
    resetBtn.click();
});
