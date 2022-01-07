//SElect an Element From HTML
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variabels
let LIST = [],
  id = 0;

//get item data
let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//clear
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
//Show Date

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add To DO function

function addToDo(Todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
   <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${Todo}</p>
      <i class="fa fa-trash-o de" job="delete" id="0"></i>
   </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add an item mto the list
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const Todo = input.value;

    if (Todo) {
      addToDo(Todo);

      LIST.push({
        name: Todo,
        id: id,
        done: false,
        trash: false
      });
      id++;

      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    input.value = "";
  }
});

//complete
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the items

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
