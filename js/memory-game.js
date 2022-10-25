// starting the game
let start = document.querySelector(".memory-game button");
let nameSpan = document.querySelector(".info p:first-child span");

start.onclick = function () {
  document.querySelector(".memory-game .control").style.display = "none";
  let name = window.prompt("Your name ?");
  if (name == "" || name == null) {
    nameSpan.innerHTML = "Unknown";
  } else {
    nameSpan.innerHTML = name;
  }

  swappCards();
};

// getting cards elements
let duration = 1000;
let triesSpan = document.querySelector(".info p:last-child span");
let cardsContainer = document.querySelector(".memory-game .cards");
let cards = document.querySelectorAll(".memory-game .cards .card");

// shuffling or swapping the cards
function swappCards() {
  let swapArr = Array(Array.from(cards).length);
  //array of indecies A.to length
  for (let i = 0; i < swapArr.length; i++) {
    swapArr[i] = i;
  }
  // shuffling
  shuffleArr(swapArr);
}
function shuffleArr(arr) {
  let last = arr.length;
  let stash;
  let random;
  while (last > 0) {
    last--;
    stash = arr[last];
    random = Math.floor(Math.random() * arr.length);
    arr[last] = arr[random];
    arr[random] = stash;
  }
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    cards[i].style.order = arr[i];
  }
}

// Playing with cards 2 by 2
cardsContainer.addEventListener("click", (e) => {
  e.target.parentElement.classList.add("flip");

  let flippedCards = document.querySelectorAll(".flip");
  if (flippedCards.length === 2) {
    cardsContainer.classList.add("unclickable");
    setTimeout(() => {
      cardsContainer.classList.remove("unclickable");
    }, duration);

    if (flippedCards[0].dataset.animal == flippedCards[1].dataset.animal) {
      setTimeout(() => {
        flippedCards[0].classList.remove("flip");
        flippedCards[1].classList.remove("flip");

        flippedCards[0].classList.add("match");
        flippedCards[1].classList.add("match");
        document.querySelector("#success").play();

        let matchCards = document.querySelectorAll(".match");
        if (matchCards.length == cards.length) {
          //Game End (what to do with local storage)
          console.log("completed game");
          cardsContainer.classList.add("unclickable");
        }
      }, duration);
    } else {
      setTimeout(() => {
        triesSpan.innerHTML++;
        flippedCards[0].classList.remove("flip");
        flippedCards[1].classList.remove("flip");
      }, duration);
    }
  }
});

/* Exercises
    [1] number of tries to game over (what about some instructions)
    [2] leader board of highest five using local storage 
 */
