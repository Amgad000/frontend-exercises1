// declare levels of the game and seconds per word and gameArrays
let levels = {
  Easy: 5,
  Medium: 4,
  Hard: 3,
};

let ourArr = [
  "list",
  "words",
  "that",
  "occur",
  "most",
  "frequently",
  "written",
  "English",
  "given",
  "below",
  "based",
  "on",
  "an",
  "analysis",
  "the",
  "Oxford",
  "English",
  "Corpus",
  "collection",
  "of",
  "texts",
  "in",
  "the",
  "English",
  "language",
  "comprising",
  "over",
  "billion",
  "words",
  "bananas",
];

let levelsArrs = {
  Easy: ourArr.slice(0, 20),
  Medium: ourArr.slice(0, 25),
  Hard: ourArr,
};

// catching elements of the game

let select = document.querySelector("select");
let level = document.querySelector(".select-out .level");
let seconds = document.querySelector(".select-out .time");

let startBtn = document.querySelector("button.start");
let theWordDiv = document.querySelector(".the-word");
let gameInput = document.querySelector(".typing-game input");
let upcomingWords = document.querySelector(".upcoming-words");

let timer = document.querySelector(".progress .timer");
let score = document.querySelector(".progress .achive");
let target = document.querySelector(".progress .target");

let finishMsg = document.querySelector(".finish"); //will recive div with class good or bad

// selecting game level
if (localStorage.getItem("level")) {
  changeLevel(localStorage.getItem("level"));
} else {
  changeLevel(select.value);
}

select.onchange = function () {
  changeLevel(this.value);
  levelToLS(this.value);
};
function changeLevel(val) {
  level.innerHTML = val;
  seconds.innerHTML = levels[val];

  timer.innerHTML = levels[val];
  target.innerHTML = levelsArrs[val].length;
  select.value = val;
}
function levelToLS(val) {
  localStorage.setItem("level", val);
}

// Using the array and controling time + score

startBtn.onclick = function () {
  genWords();
  gameInput.focus();
  startBtn.style.display = "none";
};

function genWords() {
  theWordDiv.innerHTML = "";
  upcomingWords.innerHTML = "";
  let levelArr = levelsArrs[select.value];
  let randomindex = Math.floor(Math.random() * levelArr.length);
  let randomWord = levelArr[randomindex];
  levelArr.splice(randomindex, 1);

  theWordDiv.appendChild(document.createTextNode(randomWord));
  for (let i = 0; i < levelArr.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(levelArr[i]));
    upcomingWords.appendChild(div);
  }
  startPlaying();
}

function startPlaying() {
  if (score.innerHTML == 0) {
    timer.innerHTML = levels[select.value] + 2;
  } else {
    timer.innerHTML = levels[select.value];
  }
  let time = setInterval(() => {
    timer.innerHTML--;
    if (timer.innerHTML == 0) {
      clearInterval(time);
      if (gameInput.value == theWordDiv.textContent) {
        if (upcomingWords.children.length != 0) {
          score.innerHTML++;
          gameInput.value = "";
          genWords();
        } else {
          theWordDiv.innerHTML = "";
          score.innerHTML++;
          gameInput.value = "";
          upcomingWords.style.display = "none";
          let div = document.createElement("div");
          div.className = "good";
          div.appendChild(document.createTextNode("Well Done"));
          finishMsg.appendChild(div);
        }
      } else {
        let div = document.createElement("div");
        div.className = "bad";
        div.appendChild(document.createTextNode("Try Again")); // window refresh
        finishMsg.appendChild(div);

        upcomingWords.innerHTML = "";
        theWordDiv.innerHTML = "";
      }
    }
  }, 1000);
}

// a way to refresh the game
finishMsg.addEventListener("click", (e) => {
  if (e.target.className == "bad" || e.target.className == "good") {
    document.location.reload();
  }
});
