let boxes = document.querySelectorAll(".box"); 
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winLine = document.querySelector(".line");

let turnX = true; // PlayerO, playerX
let clickCount = 0;

const winPatterns = [
    [0,1,2, 0,-9, 0 ],    
    [0,3,6,-9, 0,90 ],
    [0,4,8, 0, 0,45 ],
    [1,4,7, 0, 0,90 ],
    [2,5,8, 9, 0,90 ],
    [2,4,6, 0, 0,-45],
    [3,4,5, 0, 0, 0 ],
    [6,7,8, 0, 9, 0 ],
];

const resetGame = () =>{
    turnX = true;
    clickCount = 0; // Reset click count
    enableBoxes();
    winLine.classList.add("hide");
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    
    box.addEventListener("click", () =>{   
        if(turnX){ //PlayerO
            box.style.color = "#FF9933";
            box.innerText = "X";
            turnX = false;
        }
        else{  //playerX
            box.style.color = "#ffd60a";
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        clickCount++; // Increment click count
        checkWinner();
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" &&  pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                winLine.classList.remove("hide");
                winLine.style.transform = `translateX(${pattern[3]}rem) translateY(${pattern[4]}rem) rotate(${pattern[5]}deg)`;
                
                setTimeout(function() {
                    showWinner(pos1Val);
                }, 2000); // 2000 milliseconds = 2 seconds
                
                return; // Exit function early if winner is found
            }
        }
    }
    if (clickCount === 9) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
