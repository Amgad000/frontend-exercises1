// get elements and set variables
let startB = document.querySelector(".quiz .start-btn button");
let submitB = document.querySelector(".quiz .control button");

let bullets = document.querySelector(".quiz .bullets");
let question = document.querySelector(".quiz .question");
let answers = document.querySelector(".quiz .answers");
let qTimer = document.querySelector(".quiz .control span.timer");

let qTime = 8;
let qIndex = 0;
let result = 0;
let counter; // global counter to clear interval by clicking any element

// Getting the json object (our questions)
let request = new XMLHttpRequest();
request.open("GET", "../quiz-qustions.json");
request.send();
request.onload = function () {
  if (request.readyState === 4 && request.status === 200) {
    let qArr = JSON.parse(request.responseText);

    startB.onclick = function () {
      startB.parentElement.remove();

      for (let i = 0; i < qArr.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = i + 1;
        if (i === 0) {
          span.className = "active";
        }
        bullets.append(span);
      }

      showQ(qArr);

      showAnswers(qArr);

      clearInterval(counter);
      countDown();
    };

    submitB.addEventListener("click", function () {
      checkResult(qArr, qIndex);

      qIndex++;
      if (qIndex < qArr.length) {
        showQ(qArr);

        showAnswers(qArr);
      } else {
        return false;
      }

      updateBullets(qIndex);

      clearInterval(counter);
      countDown();
    });
  }
};

function updateBullets(qIndex) {
  let spans = document.querySelectorAll(".quiz .bullets span");
  let spansArr = Array.from(spans);

  spansArr.forEach(function (span, index) {
    if (index === qIndex) {
      span.className = "active";
    }
  });
}

function checkResult(qArr, qIndex) {
  let select = document.querySelector(`.quiz input[type="radio"]:checked`);
  if (select) {
    if (select.dataset.answer == qArr[qIndex]["right"]) {
      result += 1;
    } else {
      result += 0;
    }
  }
  if (qIndex == qArr.length - 1) {
    bullets.remove();
    question.remove();
    answers.remove();
    submitB.remove();

    document.querySelector(
      ".quiz .control span"
    ).innerHTML = `Your Result : ${result} / ${qArr.length}`;

    document.querySelector(".quiz .control span").style.cssText =
      "text-align:center; font-size: 30px; flex:1;";
  }
}

function showQ(arr) {
  question.innerHTML = arr[qIndex]["question"];
}

function showAnswers(arr) {
  answers.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "ans";
    input.id = i;
    input.setAttribute("data-answer", arr[qIndex][`answer_${i}`]);

    let label = document.createElement("label");
    label.setAttribute("for", i);
    label.append(document.createTextNode(arr[qIndex][`answer_${i}`]));

    let div = document.createElement("div");

    div.appendChild(input);
    div.appendChild(label);
    answers.appendChild(div);
  }
}

function countDown() {
  qTimer.innerHTML = qTime;
  counter = setInterval(() => {
    qTimer.innerHTML--;
    if (qTimer.innerHTML == 0) {
      clearInterval(counter);
      submitB.click();
    }
  }, 1000);
}
