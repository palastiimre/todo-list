//Selector-ok --> elements is DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheckItem);
filterOption.addEventListener("click", filterTodo);

// == Functions == //

// -- create todo list from inputs with html elements -- //

function addTodo(event) {
  //prevent the default event --> form submitting
  event.preventDefault();

  //creat TODO-Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create TODO-Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add created todo to the localstorage
  saveLocalTodos(todoInput.value);

  // create the check button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<li class="fas fa-check"></li>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // create the trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<li class="fas fa-trash-alt"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  // delete the input field after submit the todo
  todoInput.value = "";
}

// -- Delete and Check Item

function deleteOrCheckItem(e) {
  const item = e.target;
  // delete item when click when click on it
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // add animation
    todo.classList.add("fall");
    removeFromLocalstorage(todo);

    //this function waiting the todolist giving the 'fall' class and after delete item
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check item when click on it
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// -- Data filterint by type

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    //e.target is a <option></option> and value is 'all or completed or uncompleted
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// -- Localstorage saving --

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


// -- create todo list from localstorage --

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //creat TODO-Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create TODO-Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    

    // create the check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<li class="fas fa-check"></li>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // create the trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<li class="fas fa-trash-alt"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}


// -- delete todo from localstorage

function removeFromLocalstorage(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos',JSON.stringify(todos));


}