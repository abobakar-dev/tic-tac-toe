let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let trunO = true;

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

const resetGame = () => {
  trunO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (trunO) {
      box.innerText = "O";
      box.classList.add("O");
      trunO = false;
    } else {
      box.innerText = "X";
      box.classList.add("X");
      trunO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("X", "O");
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (Winner) => {
  msg.innerText = `Congratulations, Winner is ${Winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  let winnerFound=false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;  

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        showWinner(pos1Val);
        winnerFound=true;
        return;
      }
    }
  }

  if(!winnerFound){
    let count=0;
    boxes.forEach(box =>{
      if(box.innerText!==""){
        count++;
      }
    });

    if(count ===9){
      showDraw();
    }
  }
};

let showDraw = ()=>{
  msg.innerText= "its draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
