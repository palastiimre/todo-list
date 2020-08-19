//Selector-ok --> elements is DOM
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event listeners
todoButton.addEventListener('click',addTodo);



// == Functions == //

// -- create todo list from inputs with html elements -- //

function addTodo(event){
    //prevent the default event --> form submitting
    event.preventDefault();
    //creat TODO-Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create TODO-Li
    const newTodo = document.createElement('li');
    newTodo.innerText='sample';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // create the check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML='<li class="fas fa-check"></li>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);


    // create the trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<li class="fas fa-trash-alt"></li>';
    trashButton.classList.add('complete-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);    
    
}

