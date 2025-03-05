let started = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {
  if (started === false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randInd = Math.floor(Math.random() * 4);
  let randCol = btns[randInd];
  let randBtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  gameFlash(randBtn);
}
function checkAnswer(ind) {
  if (userSeq[ind] === gameSeq[ind]) {
    if (userSeq.length === gameSeq.length) {                                      
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! <span style ="red">Your Score Was ${level}</span><br>Press any key to start the game again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
      h3.style.color = "blue";
      let sp = document.querySelector("span");
      sp.style.color = "red";
    }, 250);
    reset();
  }
}

function btnPress() {
  console.log(this);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);
  checkAnswer(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
