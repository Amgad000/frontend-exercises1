// To Do list application

let input = document.querySelector(".input");
let button = document.querySelector(".button");
let outputDiv = document.querySelector(".output-div");

let tasksArr = [];
if (localStorage.getItem("tasks")) {
  tasksArr = JSON.parse(localStorage.getItem("tasks"));
  getTasksFromLocalStorage();
}

button.onclick = function () {
  if (input.value !== "") {
    addNewTaskToArray(input.value);
    input.value = "";
  }
};

function addNewTaskToArray(text) {
  let task = {
    id: Date.now(),
    content: text,
    done: false,
  };

  tasksArr.push(task);
  addTaskToDiv(tasksArr);
  addTasksToLocalStorage(tasksArr);
}

function addTaskToDiv(tasksArr) {
  outputDiv.innerHTML = "";

  tasksArr.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute("data-id", task.id);
    div.className = "task";
    if (task.done) {
      div.className = "task done";
    }
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(document.createTextNode(task.content));
    div.appendChild(span);
    outputDiv.appendChild(div);
  });
}

function addTasksToLocalStorage(tasksArr) {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function getTasksFromLocalStorage() {
  let localArr = JSON.parse(localStorage.getItem("tasks"));
  addTaskToDiv(localArr);
}

outputDiv.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    removeTaskFormLS(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    updateLocalDone(e.target.getAttribute("data-id"));
  }
});

function removeTaskFormLS(divId) {
  tasksArr = tasksArr.filter((task) => task.id != divId);
  addTasksToLocalStorage(tasksArr);
}

function updateLocalDone(divId) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == divId) {
      tasksArr[i].done == false
        ? (tasksArr[i].done = true)
        : (tasksArr[i].done = false);
    }
  }
  addTasksToLocalStorage(tasksArr);
}

/* 
      I have done this app ,but it was very hard 
          so, I am going to do another To Do app
              Here we go 
*/

/*$$$$$$
          The second To Do app trial 
    $$$$$*/
let addField = document.querySelector(".add-field");
let addBtn = document.querySelector(".add-btn");
let workOutput = document.querySelector(".work-output");

let workArr = [];
if (localStorage.getItem("works")) {
  workArr = JSON.parse(localStorage.getItem("works"));
  addToPage(workArr);
}

addBtn.onclick = function () {
  if (addField.value !== "") {
    addToWorkArr(addField.value);
    addField.value = "";
  }
};

function addToWorkArr(text) {
  let work = {
    id: Date.now(),
    content: text,
    status: "inactive",
  };
  workArr.push(work);
  console.log(workArr);
  addToPage(workArr);
  addToLs(workArr);
}

function addToPage(workArr) {
  workOutput.innerHTML = "";

  workArr.forEach((work) => {
    let li = document.createElement("li");
    li.className = "work";
    if (work.status === "active") {
      li.className = "work active";
    }
    li.setAttribute("data-Id", work.id);
    li.append(document.createTextNode(work.content));
    let delSpan = document.createElement("span");
    delSpan.className = "del";
    delSpan.append(document.createTextNode("Delete"));
    li.appendChild(delSpan);
    workOutput.appendChild(li);
  });
}

function addToLs(workArr) {
  localStorage.setItem("works", JSON.stringify(workArr));
}

// Deleting and updating in Page and Local storage
workOutput.addEventListener("click", function (e) {
  // Deleting
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    removeFromLs(e.target.parentElement.getAttribute("data-Id"));
  }
  // Updating the status
  if (e.target.classList.contains("work")) {
    e.target.classList.toggle("active");
    saveUpdateToLs(e.target.getAttribute("data-Id"));
    console.log(e.target.getAttribute("data-Id"));
  }
});

function removeFromLs(Id) {
  workArr = workArr.filter((work) => {
    return work.id != Id;
  });
  addToLs(workArr);
}

function saveUpdateToLs(Id) {
  for (let i = 0; i < workArr.length; i++) {
    if (workArr[i].id == Id) {
      workArr[i].status == "inactive"
        ? (workArr[i].status = "active")
        : (workArr[i].status = "inactive");
    }
  }
  addToLs(workArr);
}
