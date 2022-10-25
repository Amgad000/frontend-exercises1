// scrolling to top exercise
let scrollingB = document.querySelector("button.scroll");
window.onscroll = function () {
  if (window.scrollY >= 1000) {
    scrollingB.style.display = `block`;
  } else {
    scrollingB.style.display = `none`;
  }
};

scrollingB.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// End scrolling exercise

// tabs exercise
let tabs = document.querySelectorAll(".tabs li");
let tabsArr = Array.from(tabs);
let divs = document.querySelectorAll(".content div");
let divsArr = Array.from(divs);

tabsArr.forEach(function (ele) {
  // ele.onclick = function () {
  //   for (ele of tabsArr) {
  //     ele.classList.remove("active");
  //   }
  //   for (div of divsArr) {
  //     div.style.display = "none";
  //   }
  // };
  // ele.addEventListener("click", function (e) {
  //   e.currentTarget.classList.add("active");
  //   document.querySelector(e.currentTarget.dataset.cont).style.display =
  //     "block";
  // });
  ele.addEventListener("click", function (e) {
    tabsArr.forEach(function (ele) {
      ele.classList.remove("active");
    });
    divsArr.forEach(function (div) {
      div.style.display = "none";
    });
    e.currentTarget.classList.add("active");
    document.querySelector(e.currentTarget.dataset.cont).style.display =
      "block";
  });
});
// End tabs ecercise

// Getting random member exercise
let exerciseArr = ["Ali", "Hassan", "Hussien", "Omar", "Abd-Allah"];
//Math.random() returns No in range 0 to <1
console.log(Math.trunc(Math.random() * exerciseArr.length));
console.log(Math.floor(Math.random() * exerciseArr.length));
console.log(exerciseArr[Math.trunc(Math.random() * exerciseArr.length)]);
// End Getting random member exercise

// Generate random serial number / Password exercise
let serialBtn = document.querySelector("button.generate");
let serialDiv = document.querySelector("div.serial");

serialBtn.addEventListener("click", function () {
  let serialChars =
    "abcdefghijklmnopqrstuvxwyz0123456789ABCDEFGHIJKLMNOPQRSTUVXWYZ";
  let serialCount = 10;
  let ourSerial = "";

  for (let i = 0; i < serialCount; i++) {
    ourSerial += serialChars[Math.trunc(Math.random() * serialChars.length)];
  }
  serialDiv.textContent = `${ourSerial}`;
});
// End Generate random serial/Password number exercise

// work filter exercise
let switchLis = document.querySelectorAll(".switcher li");
let switcherArr = Array.from(switchLis);
let gallaryImgs = document.querySelectorAll(".gallary img");
let gallaryImgsArr = Array.from(gallaryImgs);

switcherArr.forEach(function (element) {
  element.addEventListener("click", function (e) {
    switcherArr.forEach((ele) => {
      ele.classList.remove("active");
    });
    gallaryImgsArr.forEach(function (img) {
      img.style.display = "none";
    });

    e.currentTarget.classList.add("active");

    document
      .querySelectorAll(e.currentTarget.dataset.filter)
      .forEach(function (ele) {
        ele.style.display = "inline-block";
      });
  });
});
// End work filter exercise

// create random color
//hex code #00FF0F
let colorTestingDiv = document.querySelector("div.random-color");
let colorNums = [0, 1, 2, 3, 4, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let ourColorNums = [];
for (let i = 0; i < 6; i++) {
  ourColorNums.push(colorNums[Math.floor(Math.random() * colorNums.length)]);
}

let finalColor = `#${ourColorNums.join("")}`;

colorTestingDiv.style.backgroundColor = finalColor;
// End create random color

// full screen nav bar
let toggleBtn = document.querySelector(".toggle-nav");
let navBar = document.querySelector("nav");

toggleBtn.onclick = function () {
  navBar.classList.toggle("in-page");
};

window.onkeyup = function (e) {
  if (e.key === "Escape") {
    navBar.classList.remove("in-page");
  }
};
// End full screen nav bar

// filling and counting input value
let fillingInput = document.querySelector(".fill-count input");
let filling = document.querySelector("span.filling");
let counting = document.querySelector("span.counting");
let maxChs = fillingInput.getAttribute("maxlength");
counting.innerHTML = maxChs;

fillingInput.oninput = function () {
  // if (counting.innerHTML != "0") {
  //   counting.innerHTML--;
  // }
  counting.innerHTML = maxChs - fillingInput.value.length;
  filling.style.width = `${(fillingInput.value.length / maxChs) * 100}%`;
  if (counting.innerHTML == 0) {
    counting.classList.add("zero");
  } else {
    counting.classList.remove("zero");
  }
};
// End filling and counting input value

// count down timer

let counterDown = setInterval(function () {
  let todayDate = new Date();
  let ourDate = new Date("Dec 31 , 2022 23:59:59");
  let dateDiff = ourDate - todayDate;

  if (dateDiff < 1000) {
    clearInterval(counterDown);
    document.querySelector(".count-down h3").innerHTML = `Happy new year`;
  } else {
    let days = Math.trunc(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let mins = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((dateDiff % (1000 * 60)) / 1000);

    document.querySelector(".days span:last-child").innerHTML =
      days < 10 ? `0${days}` : days;
    document.querySelector(".hours span:last-child").innerHTML =
      hours < 10 ? `0${hours}` : hours;
    document.querySelector(".minutes span:last-child").innerHTML =
      mins < 10 ? `0${mins}` : mins;
    document.querySelector(".seconds span:last-child").innerHTML =
      sec < 10 ? `0${sec}` : sec;
  }
}, 1000);
// End count down timer

// animate on scrolling to section/element
let progressElement = document.querySelector(".progress");
let progressSpans = document.querySelectorAll(".progress span");
//offsetTop = top of element at top of page

window.addEventListener("scroll", function () {
  if (window.scrollY >= progressElement.offsetTop - 650) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});
// End animate on scrolling to section/element

// count to target on scrolling to section
let incrementDiv = document.querySelector(".increment");
let incrementSpans = document.querySelectorAll(".increment span");
let started = false;
function incrementToTarget(el) {
  let target = el.dataset.end;
  let incrCounter = setInterval(function () {
    el.textContent++;
    if (el.textContent == target) {
      clearInterval(incrCounter);
    }
  }, 3000 / target);
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= incrementDiv.offsetTop - 650) {
    if (!started) {
      incrementSpans.forEach((one) => {
        incrementToTarget(one);
      });
    }
    started = true; // function works only one time on scrolling <<<<
  }
});
// End count to target on scrolling to section

// The images slider
let imgs = Array.from(document.querySelectorAll(".slides img"));

let current = 0; // the index of default img in slider

let prevBtn = document.querySelector(".control .prev");
let nextBtn = document.querySelector(".control .next");

let ul = document.createElement("ul");
for (img of imgs) {
  let li = document.createElement("li");
  li.setAttribute("data-num", imgs.indexOf(img) + 1);
  li.append(document.createTextNode(imgs.indexOf(img) + 1));
  ul.append(li);
}
document.querySelector(".bullets").appendChild(ul);

let lis = Array.from(document.querySelectorAll(".control ul li"));

function slideOn() {
  imgs.forEach((img) => {
    img.style.opacity = "0";
  });
  imgs[current].style.opacity = "1";

  document.querySelector(".slider-container p").innerHTML = `slide #${
    current + 1
  } of ${imgs.length}`;

  lis.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`.control li:nth-child(${current + 1})`)
    .classList.add("active");

  if (current == 0) {
    prevBtn.classList.add("disable");
  } else {
    prevBtn.classList.remove("disable");
  }

  if (current == imgs.length - 1) {
    nextBtn.classList.add("disable");
  } else {
    nextBtn.classList.remove("disable");
  }
}
slideOn();

prevBtn.onclick = function () {
  if (current == 0) {
    return false;
  } else {
    current--;
    slideOn();
  }
};
nextBtn.onclick = function () {
  if (current == imgs.length - 1) {
    return false;
  } else {
    current++;
    slideOn();
  }
};

lis.forEach((li) => {
  li.addEventListener("click", () => {
    current = parseInt(li.dataset.num - 1);
    slideOn();
  });
});
// END The images slider

// Fetch github api with user-name
// fetch("https://api.github.com/users/ElzeroWebSchool/repos")
//   .then((res) => res.json())
//   .then((result) => console.log(result));

let fetchInput = document.querySelector(".fetch-api input[type=text]"),
  fetchBtn = document.querySelector(".fetch-api input[type=submit]"),
  reposDiv = document.querySelector(".fetch-api .repos");

fetchBtn.onclick = function () {
  reposDiv.innerHTML = "";
  if (fetchInput.value == "" || fetchInput.value == null) {
    let msg = document.createElement("p");
    msg.append(document.createTextNode("You should enter a user name"));
    let div = document.createElement("div");
    div.appendChild(msg);
    reposDiv.appendChild(div);
  } else {
    fetch(`https://api.github.com/users/${fetchInput.value}/repos`)
      .then((response) => response.json())
      .then((final) => {
        final.forEach((repo) => {
          let div = document.createElement("div");

          let p = document.createElement("p");
          p.append(document.createTextNode(repo.name));
          div.appendChild(p);

          let span = document.createElement("span");
          span.append(
            document.createTextNode(`Stars #${repo.stargazers_count}`)
          );
          div.appendChild(span);

          let anchor = document.createElement("a");
          anchor.append(document.createTextNode("Visit"));
          anchor.href = `${repo.html_url}`;
          anchor.target = "_blank";
          div.appendChild(anchor);

          reposDiv.appendChild(div);
        });
      });
  }
  fetchInput.value = "";
};

// End Fetch github api with user-name

// api using jsonplaceholder website

let menu = document.querySelector(".api-test .menu");
let apiPosts = document.querySelector(".api-test .posts");
let postsArr = [];
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((answer) => answer.json())
  .then((ans) => {
    // getting all posts in posts div
    for (item of ans) {
      if (item.userId === 1) {
        let div = document.createElement("div");
        div.setAttribute("data-user", item.userId);
        div.classList.add("show");
        let h3 = document.createElement("h3");
        h3.append(document.createTextNode(item.title));
        let divTxt = document.createTextNode(item.body);
        div.prepend(h3);
        div.append(divTxt);
        apiPosts.append(div);
      } else {
        let div = document.createElement("div");
        div.setAttribute("data-user", item.userId);
        let h3 = document.createElement("h3");
        h3.append(document.createTextNode(item.title));
        let divTxt = document.createTextNode(item.body);
        div.prepend(h3);
        div.append(divTxt);
        apiPosts.append(div);
      }
    }

    // creating menu
    let apiArr = [];
    for (let i = 0; i < ans.length; i++) {
      apiArr.push(ans[i].userId);
    }
    let userArr = [...new Set(apiArr)];
    console.log(userArr);
    for (user of userArr) {
      if (user === 1) {
        let div = document.createElement("div");
        div.setAttribute("data-userid", user);
        div.classList.add("active");
        let text = document.createTextNode(`User #${user} Posts`);
        div.append(text);
        menu.append(div);
      } else {
        let div = document.createElement("div");
        div.setAttribute("data-userid", user);
        let text = document.createTextNode(`User #${user} Posts`);
        div.append(text);
        menu.append(div);
      }
    }
  });

/*     using menu    */
menu.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-userid")) {
    Array.from(menu.children).forEach((one) => {
      one.classList.remove("active");
    });
    e.target.classList.add("active");

    Array.from(apiPosts.children).forEach((post) => {
      post.classList.remove("show");
    });

    Array.from(
      document.querySelectorAll(`[data-user = "${e.target.dataset.userid}"]`)
    ).forEach((div) => {
      div.classList.add("show");
    });
  }
});
// End api using jsonplaceholder website
